# Employee Management System

A simple task management app built with React + Vite. I made this to learn how context API and localStorage work together in a real-world-ish scenario.

## What it does

There are two types of users — admin and employees. The admin can create tasks and assign them to specific employees by name. Employees log in and see their own task list, where they can mark tasks as accepted, completed, or failed.

Data is stored in localStorage so nothing persists after a hard refresh, which is fine for a practice project like this.

## Login credentials

**Admin**
- Email: `admin@me.com`
- Password: `123`

**Employees** (some dummy accounts seeded on load)
| Name | Email | Password |
|------|-------|----------|
| Arjun | e@e.com | 123 |
| Sneha | employee2@example.com | 123 |
| Ravi | employee3@example.com | 123 |
| Priya | employee4@example.com | 123 |
| Karan | employee5@example.com | 123 |

## Tech stack

- React 18
- Vite
- Tailwind CSS
- Context API for auth state
- localStorage for data persistence

## Running locally

```bash
npm install
npm run dev
```

That's it. Opens on `http://localhost:5173` by default.

## Project structure

```
src/
├── components/
│   ├── Auth/         # Login page
│   ├── Dashboard/    # Admin and Employee dashboards
│   ├── TaskList/     # Individual task cards (new, accept, complete, fail)
│   └── other/        # Header, CreateTask form, AllTask list, task counters
├── context/          # AuthProvider using Context API
└── utils/            # localStorage helpers + seed data
```

## Known limitations

- No backend — everything resets on page reload
- Passwords stored in plain text (it's just a frontend learning project)
- Assigning tasks requires typing the employee's exact first name

Built this while learning React. Nothing fancy, but it covers the basics of role-based views and state management through context.
