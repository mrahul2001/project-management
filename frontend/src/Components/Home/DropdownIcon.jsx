import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from 'react-router-dom';

const DropdownMenuIcon = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const questionHandler = () => {
    navigate('/my-orders');
  }
  return (
    <div>
      <IconButton
        aria-controls="dropdown-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}> <SupportAgentRoundedIcon /> Customer Support </MenuItem>
        <MenuItem onClick={handleClose}> <DownloadRoundedIcon /> Download App </MenuItem>
        <MenuItem onClick={() => { handleClose(); questionHandler(); }}> <CategoryIcon /> My Orders </MenuItem>
      </Menu>
    </div>
  );
};
export default DropdownMenuIcon;