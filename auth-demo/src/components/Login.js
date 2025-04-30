import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Toast } from 'gestalt';
import { login, clearError, selectAuth } from '../store/slices/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(selectAuth);

  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Show toast when there's an error
    if (error) {
      setShowToast(true);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const handleDismissToast = () => {
    setShowToast(false);
    dispatch(clearError());
  };

  return (
    <Box padding={4} display="flex" justifyContent="center">
      <Box width={400} padding={4} borderStyle="shadow" rounding={3}>
        <form onSubmit={handleSubmit}>
          <Box marginBottom={4}>
            <TextField
              id="email"
              onChange={({ value }) => setEmail(value)}
              placeholder="Email"
              label="Email"
              type="email"
              value={email}
              required
            />
          </Box>
          <Box marginBottom={4}>
            <TextField
              id="password"
              onChange={({ value }) => setPassword(value)}
              placeholder="Password"
              label="Password"
              type="password"
              value={password}
              required
            />
          </Box>
          <Box>
            <Button
              text="Login"
              color="red"
              type="submit"
              disabled={loading}
              fullWidth
            />
          </Box>
          
          {/* For testing: Show credentials */}
          <Box marginTop={4} padding={2} color="lightGray" rounding={2}>
            <Box as="p" fontSize="sm">
              Test credentials:
            </Box>
            <Box as="p" fontSize="sm">
              Email: test@example.com
            </Box>
            <Box as="p" fontSize="sm">
              Password: password
            </Box>
          </Box>
        </form>
      </Box>
      
      {showToast && (
        <Toast
          text={error || 'An error occurred'}
          variant="error"
          onDismiss={handleDismissToast}
        />
      )}
    </Box>
  );
};

export default Login;

