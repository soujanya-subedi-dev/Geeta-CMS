# Geeta CMS

This monorepo contains a Django REST Framework backend (`cms_backend`) and a React (Vite + MUI + Tailwind classes) frontend (`cms_frontend`). It now supports JWT authentication, admin-managed CRUD for all CMS entities, blog comments with moderation, event registrations, and a consolidated homepage feed.

## Prerequisites

* Python 3.11+
* Node.js 18+
* PostgreSQL 13+
* `pip`, `npm`

## Backend setup

```bash
cd cms_backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env  # update secrets + database settings
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 0.0.0.0:8000
```

The API lives under `http://localhost:8000/api/`. JWT endpoints:

* `POST /api/auth/signup/`
* `POST /api/auth/login/`
* `POST /api/token/refresh/`

Run backend tests with:

```bash
cd cms_backend
python manage.py test
```

## Frontend setup

```bash
cd cms_frontend
npm install
npm run dev -- --host
```

The dev server defaults to `http://localhost:5173`. Configure the API base URL by creating `cms_frontend/.env` (Vite format) if needed:

```
VITE_API_BASE_URL=http://localhost:8000/api/
```

## Feature overview

* **Auth** – JWT-based login/signup with persisted profile data. Navbar & sidebar update dynamically.
* **Admin Panel** – Dedicated dashboard for blogs, events (with registrations), testimonials, notices, and comment moderation.
* **Comments** – Authenticated users can comment on blogs; admins approve/reject submissions.
* **Events** – Users register for events; admins view registration rosters.
* **Homepage** – Unified feed showing the latest blogs, events, testimonials, and notices.

## Testing

* Backend: `python manage.py test`
* Frontend lint/tests (if configured): run via `npm test` or other scripts defined in `cms_frontend/package.json`.

## Branch workflow

```bash
git checkout -b feature/auth-crud-comments-events
# make changes, commit
```

Push and open pull requests as needed.
