# React Authentication Demo with Redux Toolkit

This project demonstrates how to implement authentication in a React application using Redux Toolkit for state management.

## Features

- User authentication (login/logout)
- Protected routes
- Redux Toolkit for state management
- Gestalt UI components
- React Router for navigation

## Project Structure

```
auth-demo/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Dashboard.js
│   │   ├── Login.js
│   │   └── ProtectedRoute.js
│   ├── store/
│   │   ├── index.js
│   │   └── slices/
│   │       └── authSlice.js
│   ├── App.js
│   └── index.js
└── package.json
```

## Redux Authentication Flow

1. The `authSlice.js` file contains all the authentication-related state and logic:
   - Initial state with user, token, authentication status, loading state, and error
   - Async thunks for login and logout actions
   - Reducers for handling authentication state changes
   - Selectors for accessing auth state from components

2. The authentication flow:
   - User enters credentials in the Login component
   - On form submission, the login thunk is dispatched
   - During API call, loading state is set to true
   - On successful login, user data and token are stored in Redux state and localStorage
   - On failed login, error state is updated
   - Protected routes check authentication status and redirect if needed

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

3. Use the test credentials:
   - Email: test@example.com
   - Password: password

## Implementation Details

- **Redux Toolkit**: Used for efficient Redux development with simplified store setup and reducers
- **createAsyncThunk**: Handles async operations with automatic loading, success, and error states
- **localStorage**: Persists authentication token between sessions
- **Protected Routes**: Custom component that redirects unauthenticated users

