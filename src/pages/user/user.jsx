
import React, { useEffect, useState } from 'react';
import UserTable from './list';
import { ThemeProvider } from '@emotion/react';
import customTheme from '../../theme/theme';




export default function User() {
  return (
    
    <div>
      
      <h1>User</h1>
      <p>Welcome to the User page</p>
      <UserTable />
      
    </div>
  );
}