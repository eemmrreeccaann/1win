# Project Notes

## Overview
This is a Create React App frontend migrated from a Vercel-style import to run on Replit.

## Runtime
- Package manager: npm
- Main workflow command: `npm start`
- Development server binds to `0.0.0.0:5000` for Replit preview compatibility.

## Environment
- The frontend does not require secrets to start.
- `telegram_service.py` expects `TELEGRAM_BOT_TOKEN` if that Python service is run separately.

## Recent Changes
- Configured the React development server for Replit host and port requirements.
- Fixed a JSX syntax error in the deposit modal header.
- Removed imported third-party analytics/bootstrap scripts from `public/index.html` to keep the frontend self-contained.
