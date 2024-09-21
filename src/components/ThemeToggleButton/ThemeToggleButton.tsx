import { Button } from "@mui/material";
import { useContext } from "react";
import { CurrentThemeContext } from "../../context/CurrentThemeContext";

const ThemeToggleButton = () => {
    const { toggleTheme, theme } = useContext(CurrentThemeContext);
  
    return (
      <Button onClick={toggleTheme} variant="contained">
        Switch to {theme.palette.mode === 'dark' ? 'light' : 'dark'} mode
      </Button>
    );
  };

export default ThemeToggleButton