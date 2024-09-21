import { createContext, ReactNode, useState } from 'react';
import { createTheme, Theme, ThemeProvider } from '@mui/material';

const BLACK = '#121212'
const WHITE = '#ffffff'

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: BLACK
        },
        text: {
            primary: WHITE
        }
    },

})

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        background: {
            "default": WHITE
        },
        text: {
            primary: BLACK
        }
    }
})

interface ICurrentThemeContext {
    theme: Theme;
    toggleTheme: () => void;
  }
  
  // Create the context
  export const CurrentThemeContext = createContext<ICurrentThemeContext>({
    theme: darkTheme, 
    toggleTheme: () => {},
  });
  
  interface CurrentThemeProviderProps {
    children: ReactNode;
  }
  
  // Create the provider to manage theme state and toggle functionality
  export const CurrentThemeProvider = ({ children }: CurrentThemeProviderProps) => {
    const [currentTheme, setCurrentTheme] = useState<Theme>(darkTheme);
  
    const toggleTheme = () => {
      setCurrentTheme((prevTheme) =>
        prevTheme.palette.mode === 'dark' ? lightTheme : darkTheme
      );
    };
  
    return (
      <CurrentThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
        <ThemeProvider theme={currentTheme}>
          {children}
        </ThemeProvider>
      </CurrentThemeContext.Provider>
    )
}