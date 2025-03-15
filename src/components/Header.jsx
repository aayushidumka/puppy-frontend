import { AppBar, Toolbar, Typography} from "@mui/material";
import "../App.css"; // Correct relative path
import React from 'react'

const Header = () => {

  return (
    <AppBar position="static" sx={{ backgroundColor: "darkgray" }}>
      <Toolbar>

        <Typography variant="h5"  sx={{ flexGrow: 1 }}>
          Welcome to the Center for Puppy Management
        </Typography>

      </Toolbar>
    </AppBar>
  )
}

export default Header
