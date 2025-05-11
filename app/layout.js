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
        <GoogleOAuthProvider clientId="718596107349-i3dkcjjp49fffk7735pqkpge4dkpfht4.apps.googleusercontent.com">
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
