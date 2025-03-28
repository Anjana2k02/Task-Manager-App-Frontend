
import React, { useEffect, useState } from 'react';
import UserTable from './list';
import { ThemeProvider } from '@emotion/react';
import customTheme from '../../theme/theme';




export default function User() {
  return (
    
    <div>
      
      <h1>User List</h1>
      <p>View All users have registered</p>
      <UserTable />
      
    </div>
  );
}