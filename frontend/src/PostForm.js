// frontend/src/PostForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const PostForm = () => {
    const [content, setContent] = useState('');
    const [platforms, setPlatforms] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (platforms.length === 0) {
            setError('Please select at least one platform.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:9000/api/posts', { content, platforms });
            console.log('Post created:', response.data);
            setContent('');
            setPlatforms([]);
            setError('');
        } catch (error) {
            console.error('Error creating post:', error);
            setError('Error creating post. Please try again.');
        }
    };

    const handlePlatformChange = (e) => {
        const value = e.target.value;
        setPlatforms(
            platforms.includes(value)
                ? platforms.filter((platform) => platform !== value)
                : [...platforms, value]
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Content:</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Platforms:</label>
                <div className="checkbox-group">
                    <div>
                        <input
                            type="checkbox"
                            value="twitter"
                            checked={platforms.includes('twitter')}
                            onChange={handlePlatformChange}
                        /> Twitter
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value="facebook"
                            checked={platforms.includes('facebook')}
                            onChange={handlePlatformChange}
                        /> Facebook
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value="linkedin"
                            checked={platforms.includes('linkedin')}
                            onChange={handlePlatformChange}
                        /> LinkedIn
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value="instagram"
                            checked={platforms.includes('instagram')}
                            onChange={handlePlatformChange}
                        /> Instagram
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value="pinterest"
                            checked={platforms.includes('pinterest')}
                            onChange={handlePlatformChange}
                        /> Pinterest
                    </div>
                    {/* Add more platforms as needed */}
                </div>
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit">Create Post</button>
        </form>
    );
};

export default PostForm;
