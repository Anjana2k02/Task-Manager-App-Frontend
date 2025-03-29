import React from 'react';
import WorkerTable from './list'; // Assuming list.js contains the WorkerTable component
import { ThemeProvider } from '@emotion/react';
import customTheme from '../../theme/theme';


export default function Worker() {
  return (
    <ThemeProvider theme={customTheme}>
      <div>
        <h1>Worker List</h1>
        <p>View all registered workers</p>
        <WorkerTable />
      </div>
    </ThemeProvider>
  );
}
