// backend/controllers/postController.js
const axios = require('axios');
const connection = require('../models/db');
const { TwitterApi } = require('twitter-api-v2');
const FB = require('fb');
const LinkedIn = require('node-linkedin')('YOUR_LINKEDIN_CLIENT_ID', 'YOUR_LINKEDIN_CLIENT_SECRET', 'YOUR_CALLBACK_URL');
const { IgApiClient } = require('instagram-private-api');

// Initialize clients with your API keys
const twitterClient = new TwitterApi('YOUR_TWITTER_API_KEY');
const facebookClient = new FB.Facebook({ accessToken: 'YOUR_FACEBOOK_ACCESS_TOKEN' });

const ig = new IgApiClient();
ig.state.generateDevice('YOUR_INSTAGRAM_USERNAME');

exports.createPost = async (req, res) => {
    const { content, platforms } = req.body; // platforms is an array of platform names

    // Insert post into the database
    const query = 'INSERT INTO posts (content) VALUES (?)';
    connection.query(query, [content], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        const postId = results.insertId;

        // Function to post to each platform
        const postToPlatform = async (platform) => {
            try {
                if (platform === 'twitter') {
                    await twitterClient.v2.tweet(content);
                } else if (platform === 'facebook') {
                    await facebookClient.api('me/feed', 'post', { message: content });
                } else if (platform === 'linkedin') {
                    LinkedIn.auth.authorize(res, ['r_emailaddress', 'r_liteprofile', 'w_member_social'], (error, code) => {
                        if (error) {
                            console.error('Error authorizing LinkedIn:', error);
                            return;
                        }

                        LinkedIn.auth.getAccessToken(res, code, (error, results) => {
                            if (error) {
                                console.error('Error getting LinkedIn access token:', error);
                                return;
                            }

                            const linkedinClient = LinkedIn.init(results.access_token);
                            linkedinClient.people.share({
                                comment: content,
                                visibility: {
                                    code: 'anyone'
                                }
                            }, (error, response) => {
                                if (error) {
                                    console.error('Error posting to LinkedIn:', error);
                                }
                            });
                        });
                    });
                } else if (platform === 'instagram') {
                    await ig.account.login('YOUR_INSTAGRAM_USERNAME', 'YOUR_INSTAGRAM_PASSWORD');
                    await ig.publish.photo({
                        file: Buffer.from(content), // Assuming content is a base64 encoded image
                        caption: 'Post caption'
                    });
                } else if (platform === 'pinterest') {
                    await axios.post('https://api.pinterest.com/v1/pins/', {
                        board: 'YOUR_PINTEREST_BOARD_ID',
                        note: content,
                        link: 'https://example.com', // Optional link
                        image_url: 'https://example.com/image.jpg' // Assuming you have an image URL
                    }, {
                        headers: {
                            Authorization: `Bearer YOUR_PINTEREST_ACCESS_TOKEN`
                        }
                    });
                }
                // Add other platforms here
            } catch (error) {
                console.error(`Error posting to ${platform}:`, error);
            }
        };

        // Post to all selected platforms if any
        if (platforms && platforms.length > 0) {
            platforms.forEach(platform => postToPlatform(platform));
        }

        res.status(201).send({ id: postId, content, platforms });
    });
};
