
import React, { useEffect, useState } from 'react';
import TaskdiTable from './list';
import { ThemeProvider } from '@emotion/react';
import customTheme from '../../theme/theme';




export default function Taskdi () {

return (
    
    <div>
      
      <h1>Taskdi List</h1>
      <p>View All tasks have registered</p>
      <TaskdiTable />
      
    </div>
  );
}