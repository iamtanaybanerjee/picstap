# Picstap

Picstap is a photo curation system that allows users to discover, organize, and revisit their favorite images using the Unsplash API. With a focus on simplicity and functionality, Picstap enables seamless photo tagging, history tracking, and future-ready extensibility.

## Installation

Follow these steps to set up Picstap locally.

**Prerequisites:**

- Node.js v14.x.x or higher
- PostgreSQL
- Unsplash access key

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/picstap.git
   cd picstap
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a .env file:
   ```bash
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_PORT=5432
   DB_NAME=postgres
   PORT=3000
   MICROSERVICE_BASE_URL=https://api.unsplash.com
   UNSPLASH_ACCESS_KEY=your_unsplash_access_key
   ```
4. Run database migrations with Sequelize:
   ```bash
   npx sequelize-cli db:migrate
   ```
5. Start the application and interact with the API.
   ```bash
   npm start
   ```
   The app will run on http://localhost:3000 (or the port specified in your .env file). You can access the deployed version at https://picstap.vercel.app/.

## Features

- **Data Modeling** – Designed a relational database with Sequelize models and associations.
- **User Creation** – Register new users into the system.
- **Photo Search (Unsplash API)** – Fetch high-quality photos via keyword search.
- **Add Tags to Photos** – Organize photos with custom tags.
- **Search Photos by Tags** – Find saved/tagged photos quickly.
- **Search History** – View a record of past photo searches.
- **Test Coverage with Jest** – Unit tests written for key logic and validations.

## API Documentation

Base URL: `https://picstap.vercel.app/`

Below is a summary of the available API endpoints.

| Method | Endpoint                                             | Description                                 | Body (if applicable)                                                                                                                                                                                                                                                |
| ------ | ---------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/api/users`                                         | Create a user                               | `{"username": "Tony Bans", "email": "tony@gmail.com"}`                                                                                                                                                                                                              |
| GET    | `/search/photos?query=green`                         | Search photos with a keyword                | None                                                                                                                                                                                                                                                                |
| POST   | `/api/photos`                                        | Save a photo to my photo collection         | `{"imageUrl": "https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?ixid=M3w3MzUyOTJ8MHwxfHNlYXJjaHw1fHxuYXR1cmV8ZW58MHx8fHwxNzQ0NjE4OTA3fDA&ixlib=rb-4.0.3", "description": "plant", "altDescription": "plant", "tags": ["nature", "green"], "userId": 4}` |
| POST   | `/api/photos/:id/tags`                               | Add tags to a photo                         | `{"tags": ["leaves"]}`                                                                                                                                                                                                                                              |
| GET    | `/api/photos/tag/search?tag=green&userId=2&sort=ASC` | Search photos by tag and sort by date saved | None                                                                                                                                                                                                                                                                |
| GET    | `/api/search-history?userId=2`                       | Get search history for a userid             | None                                                                                                                                                                                                                                                                |

## Deployment

The application is deployed and accessible at [https://picstap.vercel.app/](https://picstap.vercel.app/).
