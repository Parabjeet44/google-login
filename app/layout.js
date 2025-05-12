// app/layout.js
'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../theme';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
