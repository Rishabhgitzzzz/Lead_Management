# Smart Leads Dashboard

A full-stack Lead Management Dashboard built using the MERN stack with TypeScript.

## Features

- JWT Authentication
- Role-Based Access Control (Admin / Sales)
- Create, Update, Delete Leads
- Search & Filtering
- Backend Pagination
- CSV Export
- Protected Routes
- Responsive UI
- Docker Support

---

## Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- Vite

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT

---

## Project Structure

```txt
Lead_Management/
├── frontend/
├── backend/
└── docker-compose.yml
```

---

## Environment Variables

### Backend

```env
PORT=8080
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

### Frontend

```env
VITE_API_URL=backend_url/api/v1
```

---

## Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## API Routes

### Auth

| Method | Route                 |
| ------ | --------------------- |
| POST   | `/api/v1/auth/signup` |
| POST   | `/api/v1/auth/signin` |

### Leads

| Method | Route                      |
| ------ | -------------------------- |
| GET    | `/api/v1/leads`            |
| POST   | `/api/v1/leads`            |
| PUT    | `/api/v1/leads/:id`        |
| DELETE | `/api/v1/leads/:id`        |
| GET    | `/api/v1/leads/export/csv` |

---

## Deployment

- Frontend: [https://lead-management-delta-silk.vercel.app/](https://lead-management-delta-silk.vercel.app/)
- Backend: [https://lead-management-q3af.onrender.com](https://lead-management-q3af.onrender.com)
- API Docs: [https://documenter.getpostman.com/view/36193502/2sBXqRjwmS](https://documenter.getpostman.com/view/36193502/2sBXqRjwmS)

---

## Author

Rishabh

- GitHub: [https://github.com/Rishabhgitzzzz](https://github.com/Rishabhgitzzzz)
- LinkedIn: [https://www.linkedin.com/in/rishabh-sahu-989a07214/](https://www.linkedin.com/in/rishabh-sahu-989a07214/)
