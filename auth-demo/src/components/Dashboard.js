import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Heading, Text } from 'gestalt';
import { logout, selectUser } from '../store/slices/authSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box padding={4}>
      <Box marginBottom={4} display="flex" justifyContent="between" alignItems="center">
        <Heading size="md">Dashboard</Heading>
        <Button
          text="Logout"
          onClick={handleLogout}
          size="sm"
        />
      </Box>
      
      <Box padding={4} borderStyle="shadow" rounding={3}>
        <Heading size="sm">Welcome, {user?.name || 'User'}!</Heading>
        <Box marginTop={2}>
          <Text>You are now logged in to the application.</Text>
        </Box>
        <Box marginTop={4}>
          <Text weight="bold">User Information:</Text>
          <Box marginTop={2}>
            <Text>ID: {user?.id}</Text>
          </Box>
          <Box marginTop={1}>
            <Text>Email: {user?.email}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

