import React from 'react';

import { ThemeProvider } from '@emotion/react';
import customTheme from '../../theme/theme';
import AdminViewDetails from './admin-view-details';


export default function AdminView() {
  return (
    <div>
      <h1>admin view </h1>
        <AdminViewDetails/>
      
    </div>
  );
}
