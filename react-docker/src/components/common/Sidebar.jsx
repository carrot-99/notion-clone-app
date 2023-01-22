import { Drawer, IconButton, List, ListItemButton, Typography } from '@mui/material'
import { Box } from '@mui/system';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined"
import React from 'react'
import assets from '../../assets/index';
import { Link, useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux"

export default function Sidebar() {

    const navigate = useNavigate();
    const user = useSelector((state) => state.user.value);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <Drawer 
            container={window.document.body} 
            variant="permanent" 
            open={true} 
            sx={{width: 250, height: "100vh"}}
        >
            <List sx={{width: 250, height: "100vh", backgroundColor: assets.colors.secondary, }}>
                <ListItemButton>
                    <Box sx={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <Typography variant='body2' fontWeight="700">
                            {user.username}
                        </Typography>
                        <IconButton onClick={logout}>
                            <LogoutOutlinedIcon />
                        </IconButton>
                    </Box>
                </ListItemButton>
                <Box sx={{paddingTop: "10px"}}></Box>
                <ListItemButton>
                    <Box sx={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <Typography variant='body2' fontWeight="700">
                            お気に入り
                        </Typography>
                    </Box>
                </ListItemButton>
                <Box sx={{paddingTop: "10px"}}></Box>
                <ListItemButton>
                    <Box sx={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <Typography variant='body2' fontWeight="700">
                            プライベート
                        </Typography>
                        <IconButton>
                            <AddBoxOutlinedIcon />
                        </IconButton>
                    </Box>
                </ListItemButton>
                
                <ListItemButton 
                    sx={{pl:"20px"}} component={Link} to="/memo/iiiiii">
                    <Typography>
                        🗒無題
                    </Typography>
                </ListItemButton>
                <ListItemButton 
                    sx={{pl:"20px"}} component={Link} to="/memo/iiiiii">
                    <Typography>
                        🗒無題
                    </Typography>
                </ListItemButton>
                <ListItemButton 
                    sx={{pl:"20px"}} component={Link} to="/memo/iiiiii">
                    <Typography>
                        🗒無題
                    </Typography>
                </ListItemButton>
            </List>
        </Drawer>
    );    
};
