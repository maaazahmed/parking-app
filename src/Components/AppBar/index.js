import React, { Component } from 'react';
import './index.css';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import history from "../../History"
// ViweBooking

class Header extends Component {
    constructor() {
        super()
        this.state = {
            anchorEl: null
        }
    }

    handleMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };



    render() {
        const { anchorEl } = this.state;
        return (
            <div>
                <div >
                    <AppBar
                        // className="AppBarClass"
                        style={{
                            position: "fixed",
                            boxShadow: "none",
                        }}
                        position="static">
                        <Toolbar style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                            variant="dense">
                            <Typography variant="title"
                                color="inherit">
                                Dashboard
                           </Typography>
                            <div>
                                <IconButton
                                    onClick={this.handleMenuOpen}
                                    aria-haspopup={true}
                                    aria-owns={anchorEl ? 'simple-menu' : null}
                                    color="inherit" aria-label="Menu">
                                    <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                                    </svg>
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={this.handleMenuClose}>
                                    <MenuItem onClick={() => {
                                        history.push("/Dashboard")
                                        this.handleMenuClose()
                                    }}>Book Parking</MenuItem>
                                    <MenuItem
                                        onClick={()=>{
                                            history.push("/ViweBooking")
                                            this.handleMenuClose()
                                        }
                                        }>
                                        View booking</MenuItem>
                                    <MenuItem
                                        onClick={this.handleMenuClose}>Feedback</MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            history.push("login");
                                            localStorage.removeItem("token")
                                        }}>Logout</MenuItem>
                                </Menu>
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>
            </div>
        );
    }
}

export default Header;
