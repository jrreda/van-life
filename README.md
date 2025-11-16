# Van Life

A React-based van rental website built with React Router and Firebase.

## Live Demo
https://incomparable-otter-eaa2b5.netlify.app/

## Tech Stack
- React 18.2.0
- React Router DOM 6.4.3
- Firebase 12.6.0 (Firestore)
- Vite (Build tool)
- React Icons

## Features
- Browse available vans for rent
- Filter vans by type (simple, rugged, luxury)
- View detailed information for each van
- Host dashboard for managing van listings
- User authentication and login
- Protected routes for host-only pages

## Project Structure
- `/pages` - All page components
  - `/vans` - Van listing and detail pages
  - `/Host` - Host dashboard and van management pages
- `/components` - Reusable components (Layout, HostLayout, AuthRequired)
- `api.js` - Firebase API functions for data fetching
- `server.js` - MirageJS mock server (currently disabled, using Firebase)

## Firebase Setup
The app uses Firebase Firestore for data storage:
- **Project**: vanlife-87b3f
- **Collections**:
  - `vans` - Van listings with fields: name, price, description, imageUrl, type, hostId
  - `user` - User authentication data

## Development

### Prerequisites
- Node.js installed
- Firebase project set up

### Installation
```bash
npm install
```

### Running the App
```bash
npm run dev
```
The app will run on `http://localhost:5173` (or next available port)

**Important**: Use Chrome or enable CORS in Firefox for proper Firebase connectivity during development.

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Migration from MirageJS to Firebase
The app was recently migrated from MirageJS (mock server) to Firebase for real data persistence. The MirageJS server code is kept in `server.js` but is commented out in `index.jsx`.

## Current Status
- ✅ Firebase integration complete
- ✅ Van listing functionality
- ✅ Van detail pages
- ✅ Host dashboard
- ⚠️ Authentication needs migration from MirageJS to Firebase Auth
- ⚠️ Security rules expire December 16, 2025

## Contributing
This project is part of the Scrimba Frontend Developer Career Path course.

## License
Educational project - see course materials for details.
