# FluAI Backend

FluAI is an AI-powered language learning backend API designed to help users improve their English by providing natural alternative sentence suggestions, word meanings, and personalized vocabulary tracking.

## 🚀 Features

- 🔐 Role-based authentication with JWT
- 🧠 AI-generated alternative sentence suggestions using OpenAI API
- 🧾 User-specific prompt history
- 📚 Personal vocabulary book with word meaning lookup and saving
- 🧠 Redis-based logout via token blacklist
- 🛡️ Security middleware integration (Helmet, rate limiting, XSS protection, input sanitization)
- 🐳 Redis support via Docker

## 📦 Tech Stack

- **Node.js**, **Express.js**
- **TypeScript**
- **MongoDB** (Atlas, connected via connection string)
- **Redis** (Dockerized)
- **JWT** for authentication
- **OpenAI API** for natural language processing
- **Docker** for service orchestration

## ⚙️ Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create a `.env` file based on `.env.example` and fill your credentials:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
DB_PASSWORD=<your-db-password>
OPENAI_API_KEY=<your-openai-api-key>
NODE_ENV=development
PORT=5000
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=30d
REDIS_URL=redis://localhost:6379
```

> **Note:** Never commit real secrets to public repositories.

### 3. Start Redis with Docker

```bash
docker run --name fluai-redis -p 6379:6379 -d redis
```

## ▶️ Run the application

```bash
npm run dev
```

## 📮 API Endpoints (v1)

| Endpoint                             | Description                          |
| ------------------------------------ | ------------------------------------ |
| `POST /api/v1/auth/login`            | User login                           |
| `POST /api/v1/auth/logout`           | User logout (JWT blacklist)          |
| `POST /api/v1/auth/register`         | Register new user                    |
| `GET /api/v1/dictionary/:word`       | Get meaning of a word                |
| `POST /api/v1/prompts`               | Generate alternative sentences (AI)  |
| `GET /api/v1/prompts/history`        | Fetch user prompt history            |
| `GET /api/v1/users`                  | Get all users (admin only)           |
| `PATCH /api/v1/users/me`             | Update current user profile          |
| `DELETE /api/v1/users/me`            | Soft delete current user             |
| `POST /api/v1/users/change-password` | Change password                      |
| `GET /api/v1/users/:id`              | Get user by ID                       |
| `DELETE /api/v1/users/:id`           | Force delete user (admin only)       |
| `POST /api/v1/words/save`            | Add word to personal vocabulary book |

## 🛡️ Security Middleware

- `helmet`: Secures HTTP headers
- `express-rate-limit`: Prevents excessive requests
- `cors`: Controls access to allowed origins
- `xss-clean`: Prevents cross-site scripting attacks
- `express-mongo-sanitize`: Prevents NoSQL injection attacks
- `hpp`: Blocks HTTP parameter pollution
- `JWT + Redis`: Secure token handling with blacklist support
