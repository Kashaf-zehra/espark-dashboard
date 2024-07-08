'use client';
import { createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';

const inter = Inter({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal'],
  subsets: ['latin'],
});

// Light Theme
const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#029E9C',
    },
    secondary: {
      main: '#E6F5F4',
    },
    background: {
      default: '#ffffff',
    },
    text: {
      primary: '#000',
      primaryinvert: '#fff',
      secondary: '#333',
      secondaryinvert: '#bfbfbf',
    },
  },
  typography: {
    fontFamily: [inter.style.fontFamily, 'sans-serif'].join(','),
    h1: {
      fontSize: '40px',
      fontWeight: 700,
    },
    h2: {
      fontSize: '36px',
      fontWeight: 600,
    },
    h3: {
      fontSize: '30px',
      fontWeight: 600,
    },
    h4: {
      fontSize: '24px',
      fontWeight: 700,
    },
    h5: {
      fontSize: '20px',
      fontWeight: 600,
    },
    h6: {
      fontSize: '16px',
      fontWeight: 700,
    },
    body1: {
      fontSize: '14px',
      fontWeight: 400,
    },
    body2: {
      fontSize: '16px',
      fontWeight: 500,
      color: '#595959',
    },
    button: {
      textTransform: 'capitalize',
    },
    link: {
      textDecoration: 'none',
      color: '#029E9C',
      '&:hover': {
        color: '#E6F5F4',
      },
      '&:active': {
        color: '#029E9C',
      },
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 5,
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'primary' },
          style: {
            textTransform: 'capitalize',
            backgroundColor: '#029E9C !important',
            borderRadius: '5px',
            color: '#fff',
            position: 'relative',
            '&:hover': {
              backgroundColor: '#E6F5F4',
              color: '#fff',
            },
          },
        },
        {
          props: { variant: 'secondary' },
          style: {
            textTransform: 'capitalize',
            borderColor: '#029E9C',
            color: '#029E9C',
            '&:hover': {
              backgroundColor: '#029E9C',
              color: '#fff',
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            textTransform: 'capitalize',
            borderColor: '#029E9C',
            color: '#029E9C',
            '&:hover': {
              backgroundColor: '#029E9C',
              color: '#fff',
            },
          },
        },
      ],
    },
    MuiLink: {
      defaultProps: {
        variant: 'link',
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#029E9C',
          '&:hover': {
            backgroundColor: '#E6F5F4',
            color: '#029E9C',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '1920px',
          margin: '0 auto',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1920,
    },
  },
});

// Dark Theme
const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#029E9C',
    },
    secondary: {
      main: '#E6F5F4',
    },
    background: {
      default: '#ffffff',
    },
    text: {
      primary: '#000',
      primaryinvert: '#fff',
      secondary: '#333',
      secondaryinvert: '#bfbfbf',
    },
  },
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
    h1: {
      fontSize: '40px',
      fontWeight: 700,
    },
    h2: {
      fontSize: '36px',
      fontWeight: 600,
    },
    h3: {
      fontSize: '30px',
      fontWeight: 600,
    },
    h4: {
      fontSize: '24px',
      fontWeight: 700,
    },
    h5: {
      fontSize: '20px',
      fontWeight: 600,
    },
    h6: {
      fontSize: '16px',
      fontWeight: 700,
    },
    body1: {
      fontSize: '14px',
    },
    button: {
      textTransform: 'capitalize',
    },
    link: {
      textDecoration: 'none',
      color: '#029E9C',
      '&:hover': {
        color: '#E6F5F4',
      },
      '&:active': {
        color: '#029E9C',
      },
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 5,
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'primary' },
          style: {
            textTransform: 'capitalize',
            backgroundColor: '#029E9C !important',
            borderRadius: '5px',
            color: '#fff',
            position: 'relative',
            '&:hover': {
              backgroundColor: '#E6F5F4',
              color: '#fff',
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            textTransform: 'capitalize',
            borderColor: '#029E9C',
            color: '#029E9C',
            '&:hover': {
              backgroundColor: '#029E9C',
              color: '#fff',
            },
          },
        },
      ],
    },
    MuiLink: {
      defaultProps: {
        variant: 'link',
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#029E9C',
          '&:hover': {
            backgroundColor: '#E6F5F4',
            color: '#029E9C',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '1920px',
          margin: '0 auto',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1920,
    },
  },
});

export { darkTheme, lightTheme };
