import React from 'react';
import { Stack, Button, IconButton, AppBar, Toolbar, Typography, MenuItem, Menu } from '@mui/material';
import { Link } from 'react-router-dom';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Navbar.css';
import DropdownMenuIcon from '../Home/DropdownIcon';
const NavBar = () => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('token');
    const handleClick = () => {
        localStorage.clear();
        navigate('/')
        window.location.reload();
    };
    const goToHome = (e) => {
        e.preventDefault();
        navigate('/');
    };
    return (
        <div margin>
            <AppBar position="fixed" sx={{ padding: 0, left: 0, right: 0 }} style={{ background: 'white' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <DropdownMenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        onClick={goToHome}
                        className='app-name'
                    >
                        <svg width="112" height="22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="asana-logo-title"><title id="asana-logo-title">Asana Home</title><path d="M108.202 16.703c.067.765.679 1.739 1.74 1.739h.62a.44.44 0 0 0 .438-.438V4.359h-.003a.437.437 0 0 0-.435-.414h-1.922a.437.437 0 0 0-.435.414h-.003v1.109c-1.178-1.452-3.035-2.055-4.897-2.055a7.667 7.667 0 0 0-7.665 7.67 7.668 7.668 0 0 0 7.665 7.672c1.862 0 3.892-.723 4.897-2.054v.002Zm-4.89-.633c-2.692 0-4.874-2.232-4.874-4.986 0-2.754 2.182-4.986 4.874-4.986 2.693 0 4.875 2.232 4.875 4.986 0 2.754-2.182 4.986-4.875 4.986ZM93.21 17.172v-7.06c0-3.981-2.51-6.666-6.51-6.666-1.91 0-3.476 1.105-4.029 2.055-.12-.743-.513-1.523-1.735-1.523h-.622a.439.439 0 0 0-.438.438v13.646h.003c.012.23.203.414.435.414h1.923c.029 0 .058-.004.086-.009.013-.002.024-.008.037-.011l.043-.013c.017-.008.032-.017.048-.026l.024-.013a.44.44 0 0 0 .053-.043l.01-.007a.434.434 0 0 0 .134-.292h.002v-8.06a3.87 3.87 0 0 1 3.868-3.871 3.87 3.87 0 0 1 3.868 3.87l.001 6.738v-.002l.002.018v1.307h.002c.013.23.203.414.435.414h1.923a.45.45 0 0 0 .086-.009c.011-.002.022-.007.033-.01.016-.004.032-.008.047-.014.016-.007.03-.016.045-.024l.027-.015a.49.49 0 0 0 .05-.04l.013-.01a.452.452 0 0 0 .049-.057l.003-.004a.434.434 0 0 0 .082-.23h.003v-.891ZM73.188 16.703c.067.765.68 1.739 1.74 1.739h.62c.24 0 .437-.197.437-.438V4.359h-.002a.438.438 0 0 0-.435-.414h-1.923a.438.438 0 0 0-.435.414h-.002v1.109c-1.178-1.452-3.035-2.055-4.898-2.055a7.667 7.667 0 0 0-7.664 7.67c0 4.237 3.431 7.672 7.664 7.672 1.863 0 3.892-.723 4.898-2.054v.002Zm-4.89-.633c-2.692 0-4.875-2.232-4.875-4.986 0-2.754 2.183-4.986 4.875-4.986s4.874 2.232 4.874 4.986c0 2.754-2.182 4.986-4.874 4.986ZM49.257 14.748c1.283.89 2.684 1.322 4.03 1.322 1.283 0 2.609-.665 2.609-1.823 0-1.546-2.89-1.787-4.705-2.405-1.815-.617-3.379-1.893-3.379-3.96 0-3.163 2.816-4.47 5.444-4.47 1.665 0 3.383.55 4.497 1.338.384.29.15.625.15.625l-1.063 1.52c-.12.17-.328.318-.628.133s-1.352-.93-2.956-.93c-1.603 0-2.57.74-2.57 1.66 0 1.1 1.256 1.447 2.727 1.823 2.562.691 5.357 1.522 5.357 4.666 0 2.786-2.604 4.508-5.483 4.508-2.181 0-4.038-.622-5.596-1.766-.324-.325-.098-.627-.098-.627l1.058-1.512c.216-.282.487-.184.606-.102ZM41.866 16.703c.068.765.68 1.739 1.74 1.739h.62a.44.44 0 0 0 .438-.438V4.359h-.003a.437.437 0 0 0-.435-.414h-1.922a.438.438 0 0 0-.435.414h-.003v1.109c-1.178-1.452-3.035-2.055-4.897-2.055a7.668 7.668 0 0 0-7.665 7.67c0 4.237 3.432 7.672 7.665 7.672 1.862 0 3.892-.723 4.897-2.054v.002Zm-4.89-.633c-2.692 0-4.874-2.232-4.874-4.986 0-2.754 2.182-4.986 4.875-4.986 2.692 0 4.874 2.232 4.874 4.986 0 2.754-2.182 4.986-4.874 4.986Z" fill="#0D0E10"></path><path d="M18.559 11.605a5.158 5.158 0 1 0 0 10.317 5.158 5.158 0 0 0 0-10.317Zm-13.401.001a5.158 5.158 0 1 0 0 10.315 5.158 5.158 0 0 0 0-10.315Zm11.858-6.448a5.158 5.158 0 1 1-10.316 0 5.158 5.158 0 0 1 10.316 0Z" fill="#F06A6A"></path></svg>

                    </Typography>
                    <div className='buttons'>
                        <Stack spacing={2} direction="row">
                            {isAuthenticated ? (
                                <PopupState variant="popover" popupId="demo-popup-menu">
                                    {(popupState) => (
                                        <React.Fragment>
                                            <AccountCircleIcon fontSize='large' {...bindTrigger(popupState)} className='logged-in' color='primary' />
                                            <Menu {...bindMenu(popupState)}>
                                                <MenuItem onClick={() => { handleClick(); popupState.close(); }}>Logout</MenuItem>
                                            </Menu>
                                        </React.Fragment>
                                    )}
                                </PopupState>
                            ) : (
                                <Stack spacing={2} direction="row">
                                    <Link to="/login">
                                        <Button variant="outlined">Login</Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button variant="contained">Sign Up</Button>
                                    </Link>
                                </Stack>
                            )}
                        </Stack>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};
export default NavBar;