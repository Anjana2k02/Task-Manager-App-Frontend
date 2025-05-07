import React from 'react';
import AdminTable from './list';
import { ThemeProvider } from '@emotion/react';
import customTheme from '../../theme/theme';

export default function Admin() {
  return (
    <div>
      <h1>Project List</h1>
      <p>View all registered projects</p>
      <AdminTable />
    </div>
  );
}
