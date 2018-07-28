import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import history from "../../History"
import "./index.css"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import firebase from "firebase"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const styles = {
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -18,
        marginRight: 10,
    },
};

const database = firebase.database().ref("/")

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
            numberOfSlots: "",
            parkingAreaVal: ""
        }
    }
    componentWillMount() {
        let checkAouth = localStorage.getItem("token")
        if (checkAouth == null) {
            history.push("/logIn");
        }
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOn_Change(ev) {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }


    creatParking() {
        let userID = firebase.auth().currentUser;
        database.child(`user/${userID.uid}`).on("value", (snapshot) => {
            let obj = snapshot.val()
            obj.id = snapshot.key

            let ParkingObj = {
                username: obj.username,
                currentUserID: obj.id,
                parkingAreaVal: this.state.parkingAreaVal,
                numberOfSlots: this.state.numberOfSlots
            }
            console.log(ParkingObj)
            database.child("Parkings").push(ParkingObj)
        })
        this.setState({ open: false });
    }


    render() {
        let arr = []
        let slots = []
        for (var i = 0; i < 20; i++) {
            slots.push(
                <Card className="slots" >
                    <CardContent>
                        slot {i + 1}
                    </CardContent>
                </Card>

            )
        }
        for (var i = 0; i < 50; i++) {
            arr.push(
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar
                                alt="Adelle Charles"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxUrqjMcRAeCvrllU5EjZ6dU3T3FKcGaJyM7Y2a3qJP2YX4wAf"
                            >
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText>
                            <div className="Parking_area_List" >Parking area</div>
                            <div className="parkingSlotList" >10 slots</div>
                        </ListItemText>

                        <ListItemSecondaryAction>
                            <IconButton aria-label="Delete">
                                <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                                    <path d="M0 0h24v24H0z" fill="none" />
                                </svg>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            )
        }
        return (
            <div className="App">
                <div >
                    <AppBar style={{ position: "fixed", boxShadow: "none" }} position="static">
                        <Toolbar variant="dense">
                            <Typography variant="title"
                                color="inherit">
                                Dashboard
                           </Typography>
                        </Toolbar>
                    </AppBar>
                </div>

                <div>
                    <Dialog
                        className="DialogBox"
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{" Create Parking Area"}</DialogTitle>
                        <DialogContent>
                            <FormControl style={{ width: "100%", }}  >
                                <InputLabel htmlFor="adornment-Area">Parking Area</InputLabel>
                                <Input
                                    id="adornment-Area"
                                    type={'text'}
                                    value={this.state.parkingAreaVal}
                                    onChange={this.handleOn_Change.bind(this)}
                                    name="parkingAreaVal" />
                            </FormControl>
                            <FormControl style={{ width: "100%", marginTop: "5%" }}  >
                                <InputLabel htmlFor="adornment-Slots">Number of Slots</InputLabel>
                                <Input
                                    id="adornment-Slots"
                                    type="number"
                                    value={this.state.numberOfSlots}
                                    onChange={this.handleOn_Change.bind(this)}
                                    name="numberOfSlots" />
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.creatParking.bind(this)} color="primary" autoFocus>
                                Save
                           </Button>
                        </DialogActions>
                    </Dialog>
                </div>

                <div className="content" >
                    <div className="content_div_1" >
                        <div class="scrollbar" id="style-3">
                            <div class="force-overflow">
                                <div>
                                    {arr}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="content_div_2">
                        <div class="scrollbar_2" id="style-4">
                            <div class="force-overflow">
                                <div className="slote_CardContent" >
                                    {slots}
                                </div>
                            </div>
                        </div>
                        <div className="AddButton">
                            <Button
                                onClick={this.handleClickOpen}
                                variant="fab"
                                color="primary"
                                aria-label="Add" >
                                <AddIcon />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
