# Project Notes

## Overview
This is a Create React App frontend migrated from a Vercel-style import to run on Replit.

## Runtime
- Package manager: npm
- Main workflow command: `npm run build && HOST=0.0.0.0 PORT=5000 node server.js`
- The Node server binds to `0.0.0.0:5000`, serves the React build, and exposes `/api/notify` for Telegram notifications.

## Environment
- `TELEGRAM_BOT_TOKEN` must be stored as a Replit Secret.
- `TELEGRAM_CHAT_ID` is configured as a shared environment variable for the notification recipient.
- `telegram_service.py` is legacy reference text and is not used by the running app.

## Recent Changes
- Configured the React development server for Replit host and port requirements.
- Fixed a JSX syntax error in the deposit modal header.
- Removed imported third-party analytics/bootstrap scripts from `public/index.html` to keep the frontend self-contained.
- Added a Node notification server so login, registration, deposit requests, withdrawal requests, and logout events send Telegram notifications without exposing the bot token to browser code.
