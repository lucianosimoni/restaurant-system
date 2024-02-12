import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
// import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

import { useStaffStore } from '../store/staffStore';
import { Link, Outlet } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

const pages = [
  { title: 'Início', path: '/' },
  { title: 'Configurações', path: '/settings' },
  { title: 'Configurações Iniciais', path: '/initial-settings' },
  { title: 'Sair', path: '/logout' },
];

export default function Root() {
  const staff = useStaffStore((state) => state);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Box className="flex-grow">
        <AppBar position="static">
          <Toolbar>
            {/* Menu */}
            <Box className="flex">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleClose}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <Link key={page.title} to={page.path} className="no-underline text-black">
                    <MenuItem onClick={handleClose}>
                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>

            <Typography variant="h6" component="div" className="flex flex-grow">
              <Link to={'/'} className="text-white no-underline">
                Estação de Trabalho
              </Link>
            </Typography>

            {!staff.isAuthenticated && (
              <Link to={'/login'} className="text-white">
                <Button variant="text" color="inherit" className=" text-white">
                  Entrar
                </Button>
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <Outlet />
    </>
  );
}
