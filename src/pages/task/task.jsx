
import React, { useEffect, useState } from 'react';
import TaskTable from './list';
import { ThemeProvider } from '@emotion/react';
import customTheme from '../../theme/theme';




export default function Task() {
  return (
    
    <div>
      
      <h1>Task List</h1>
      <p>View All tasks have registered</p>
      <TaskTable />
      
    </div>
  );
}