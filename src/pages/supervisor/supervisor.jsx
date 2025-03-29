import React from 'react';
import SupervisorTable from './list';
import { ThemeProvider } from '@emotion/react';
import customTheme from '../../theme/theme';

export default function Supervisor() {
  return (
    <div>
      <h1>Supervisor List</h1>
      <p>View all registered supervisors</p>
      <SupervisorTable />
    </div>
  );
}
