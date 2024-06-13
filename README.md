# SOCIAL MEDIA POSTER

Social Media Poster is a web application that allows users to create posts and automatically publish them to multiple social networks including Twitter, Facebook, LinkedIn, Instagram, and Pinterest.

## Features

- Create posts with content and select platforms to publish.
- Automatically publish posts to selected social networks.
- Save posts in a MySQL database.
- User-friendly interface with error handling and validation.

## Prerequisites

- Node.js
- MySQL
- Docker (for running MySQL in a container)

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/prod3v3loper/social-media-poster.git
cd social-media-poster
```

2. **Set up the backend:**

- Navigate to the `backend` directory:

```bash
cd backend
```

- Install dependencies:

```bash
npm install
```

- Create a `.env` file in the `backend` directory and configure it with your database and API credentials:

```plaintext
DB_HOST=127.0.0.1
DB_PORT=9906
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=social_media_db

PORT=9000

TWITTER_API_KEY=your_twitter_api_key
FACEBOOK_ACCESS_TOKEN=your_facebook_access_token
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_CALLBACK_URL=your_linkedin_callback_url
INSTAGRAM_USERNAME=your_instagram_username
INSTAGRAM_PASSWORD=your_instagram_password
PINTEREST_ACCESS_TOKEN=your_pinterest_access_token
```

- Ensure MySQL is running and accessible on the configured port. If using Docker, you can run:

```bash
docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=your_db_password -e MYSQL_DATABASE=social_media_db -e MYSQL_USER=your_db_user -e MYSQL_PASSWORD=your_db_password -p 9906:3306 -d mysql:8.0.31
```

- Start the backend server:

```bash
node app.js
```

3. **Set up the frontend:**

- Navigate to the `frontend` directory:

```bash
cd ../frontend
```

- Install dependencies:

```bash
npm install
```

- Start the frontend development server:

```bash
npm start
```

## Usage

1. **Open your browser** and navigate to `http://localhost:3000`.
2. **Create a post** by entering the content and selecting the social networks you want to publish to.
3. **Submit the post** and it will be saved to the database and published to the selected social networks.

## Project Structure

```
social-media-poster/
├── backend/
│   ├── controllers/
│   │   └── postController.js
│   ├── models/
│   │   └── db.js
│   ├── routes/
│   │   └── postRoutes.js
│   ├── .env
│   └── app.js
└── frontend/
│   ├── public/
│   ├── src/
│   └── ├── App.css
│       ├── App.js
│       ├── PostForm.js
│       └── index.js
├── package.json
```

# ISSUE

Please use the issue tab to request a:

* Bug
* Feature

Choose template and report a bug or feature you want [issues](https://github.com/prod3v3loper/social-media-poster/issues).

# CONTRIBUTE

Please read the [contributing](https://github.com/prod3v3loper/social-media-poster/blob/main/.github/CONTRIBUTING.md) to contribute.

# VULNERABILITY

Please use the Security section for privately reporting a [vulnerability](https://github.com/prod3v3loper/social-media-poster/.github/SECURITY.md).

# AUTHOR

[prod3v3loper](https://www.prod3v3loper.com)

# License

[MIT](https://github.com/prod3v3loper/social-media-poster/blob/main/LICENSE)