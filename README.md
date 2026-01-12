# Me-API Playground (Track A)
A minimal backend-focused playground that stores my profile information in a database and exposes it via clean APIs, along with a very simple frontend to query and view the data.
This project is built as part of Track A – Backend Assessment.

## Live URLs
* **Backend (Render):**
  ```
  https://me-api-playground-backend-ne3y.onrender.com/
  ```
* **Frontend (Netlify):**
  ```
  https://me-api-playground-frontend.netlify.app/
  ```
* **GitHub Repository:**
  ```
  https://github.com/Rohan29-De/Me-api-playground
  ```
## Architecture
The project follows a simple and clean separation of concerns:
```
Repository Root
├── backend/
│   ├── src/
│   │   ├── app.js            # Express server & API routes
│   │   └── db/
│   │       ├── database.js   # SQLite connection
│   │       ├── schema.sql    # Database schema
│   │       └── seed.js       # Real resume-based seed data
│   ├── database.sqlite      # SQLite database file
│   └── package.json
│
├── frontend/
│   ├── index.html            # Minimal UI
│   ├── script.js             # API calls
│   └── style.css
│
└── README.md
```
**Design choices:**
* SQLite was chosen for simplicity and reliability in a single-user, read-heavy system.
* Express provides a lightweight and transparent API layer.
* Frontend is intentionally minimal to demonstrate API correctness rather than UI complexity.

## Backend API Overview
**Health Check**
```
GET /health
```
Returns 200 OK when the service is live.

**Profile**
```
GET /profile
```
Returns name, email, education, work experience, and social links.

**Query Endpoints**
```
GET /projects?skill=Java
```
Returns projects associated with the given skill.
```
GET /skills/top
```
Returns skills ordered by usage count across projects.
```
GET /search?q=Java
```
Searches across projects and skills.

## Database Schema
The database schema is defined in:
```
backend/src/db/schema.sql
```
**Core Tables**
* profile – name, email, education
* skills – list of skills
* projects – title, description, link
* project_skills – many-to-many mapping
* work – work experience
* links – GitHub, LinkedIn, portfolio
The database is seeded with **real resume data** using:
```
backend/src/db/seed.js
```

## Setup Instructions
**Local Setup**
Prerequisites
 * Node.js (LTS)
 * Git
Steps
```
git clone <repo-url>
cd Me-api-playground/backend
npm install
node src/db/seed.js
node src/app.js
```
Backend will run at:
```
http://localhost:3000
```
To open the frontend locally:
* Open ```frontend/index.html``` directly in the browser.

## Production Setup
**Backend**
* Deployed on Render
* Start Command:
  ```
  npm start
  ```
**Frontend**
* Deployed on Netlify
* Static HTML served without a build step
* Uses deployed backend URL
    
## Sample curl Commands
* **Health**
```
curl https://me-api-playground-backend-ne3y.onrender.com/health
```
* **Projects by Skill**
```
curl "https://me-api-playground-backend-ne3y.onrender.com/projects?skill=Java"
```
* **Top Skills**
```
curl https://me-api-playground-backend-ne3y.onrender.com/skills/top
```
* **Search**
```
curl "https://me-api-playground-backend-ne3y.onrender.com/search?q=Java"
```

## Known Limitations
* Single-user system (profile represents one candidate only)
* No authentication or write APIs exposed (read-only by design)
* SQLite chosen for simplicity, not horizontal scalability
* Minimal frontend focused on correctness rather than UI/UX
* No pagination or rate limiting implemented
  
These trade-offs were intentional to keep the scope small and production-reliable for a take-home assessment.

## Resume
```
https://drive.google.com/file/d/1NfJ9wC8t3uVrMZyUoo-7rG-Uu0EEKhno/view?usp=sharing
```
## Final Notes
* All APIs return correct filtered results
* /health returns HTTP 200
* Seeded data is visible via the frontend UI
* URLs load without errors

This project focuses on backend correctness, clean data modeling, and disciplined scope control.

> Note: The `curl` examples are provided for convenience.  
> The APIs can also be tested using Postman, Insomnia, or directly via a web browser.  
> No OS-specific tools are required to run or test this project.












