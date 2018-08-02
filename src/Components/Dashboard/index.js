import React, { Component } from 'react';
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
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { connect } from "react-redux"
import TextField from '@material-ui/core/TextField';
import Header from "../AppBar/index"
import {
    ParkingAction,
    Parking_ID,
    slotsAction,
    selectedData,
    AreaNameAction
} from "../../store/action/action"









const database = firebase.database().ref("/")
class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
            open2: false,
            anchorEl: null,
            numberOfSlots: "",
            parkingAreaVal: "",
            num: 0,
            startTime: "",
            endTime: "",
            localSlot: {},
            currentTime:new Date().getTime()
        }
    }
    componentWillMount() {
        let checkAouth = localStorage.getItem("token")
        if (checkAouth == null) {
            history.push("/logIn");
        }


    }
    componentDidMount() {
        database.child("Parkings").on("child_added", (snapshot) => {
            let obj = snapshot.val();
            obj.id = snapshot.key;
            this.props.ParkingAction(obj)

        })
        // let parkinID = this.props.parkinID.parkinID;
        // let slots = this.props.allSlots.slots;
        // let newData = this.props.selected_Data.sselectedData.data;
        // let index = this.props.selected_Data.sselectedData.index;
        // let currentTime = new Date().getTime();
        // console.log(parkinID)

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


    handleClickOpen2 = () => {
        this.setState({ open2: true });
    };
    handleClose2 = () => {
        this.setState({ open2: false });
    };


    bookingHandler(data) {
        this.setState({ num: data.numberOfSlots })
        this.props.Parking_ID(data.id)
        this.props.slotsAction(data.bookingArr)
        this.props.AreaNameAction(data.parkingAreaVal)
        console.log(data.bookingArr)
        data.bookingArr.map((val)=>{
            // console.log(val.index)
            if(val.endTime > this.state.currentTime){
                let slotes = data.bookingArr;
                slotes[val.index].active = false;
                console.log(val.parkinID);
                database.child(`Parkings/${val.parkinID}/bookingArr/`).set(slotes)

            }
        })



        // this.props.selected_Data.mySlots.map((val) => {
        //     val.bookingArr.map((bookinViewVall) => {
        //       let slotes = val.bookingArr
        //       slotes[bookinViewVall.index].active = false;
        //       console.log(bookinViewVall.parkinID === val.id )
        //       if (bookinViewVall.endTime < this.state.currentTime
        //          && bookinViewVall.parkinID === val.id) {
        //         database.child(`Parkings/${bookinViewVall.parkinID}/bookingArr`).set(slotes)
        //       }
        //     })
        //   })
    }

    bookingCuntineu() {
        let startTime = new Date(this.state.startTime).getTime()
        let endTime = new Date(this.state.endTime).getTime()
        // console.log(this.props.parkinID.parkinID)
        if (endTime <= startTime) {
            alert("")
        }
        else {
            let currentUserID = firebase.auth().currentUser.uid;
            let data = this.props.selected_Data.sselectedData.data;
            let index = this.props.selected_Data.sselectedData.index;
            let currentTime = new Date().getTime()
            this.setState({ localSlot: data })
            let parkinID = this.props.parkinID.parkinID;
            let slots = this.props.allSlots.slots;
            slots[index].active = true;
            // slots[index].startTime = startTime;
            slots[index].endTime = endTime;
            slots[index].currentUserID = currentUserID;
            slots[index].sloteNumber = index + 1;
            slots[index].areaName = this.props.areaName.areaName,
                slots[index].parkinID = this.props.parkinID.parkinID
            slots[index].startTime = currentTime
            database.child(`Parkings/${parkinID}/bookingArr`).set(slots)
            this.setState({ open2: false });
        }
    }



    selectSlot(index, data) {
        // this.setState({localSlot:data})
        // let parkinID = this.props.parkinID.parkinID;
        // let slots = this.props.allSlots.slots;
        // slots[index].active = true;
        // database.child(`Parkings/${parkinID}/bookingArr`).set(slots);
        this.setState({ open2: true });
        this.props.selectedData({ index, data })
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
                numberOfSlots: this.state.numberOfSlots,
                bookingArr: [],
            }
            for (var i = 0; i < Number(this.state.numberOfSlots); i++) {
                let bookingObj = { active: false, index: i };
                ParkingObj.bookingArr.push(bookingObj);
            }
            database.child("Parkings").push(ParkingObj)
        })
        this.setState({ open: false });
    }


    render() {
        let parkingList = this.props.ParkingList.parkingList;
       
        return (
            <div className="App">
                <Header />
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
                <div>
                    <Dialog
                        className="DialogBox"
                        open={this.state.open2}
                        onClose={this.handleClose2}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{" Create Parking Area"}</DialogTitle>
                        <DialogContent>
                            <div>
                                <TextField
                                    style={{ width: "100%" }}
                                    id="datetime-local"
                                    label="Start time"
                                    type="datetime-local"
                                    placeholder="Start time"
                                    name="startTime"
                                    value={this.state.startTime}
                                    onChange={this.handleOn_Change.bind(this)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                />
                            </div>
                            <div style={{ marginTop: "6%" }} >
                                <TextField
                                    style={{ width: "100%" }}
                                    id="datetime-local"
                                    label="End time"
                                    type="datetime-local"
                                    placeholder="Start time"
                                    name="endTime"
                                    value={this.state.endTime}
                                    onChange={this.handleOn_Change.bind(this)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                />
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={this.handleClose2}
                                color="primary">
                                Cancel
                            </Button>
                            <Button
                                onClick={this.bookingCuntineu.bind(this)}
                                color="primary" autoFocus>
                                Book
                           </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div className="content" >
                    <div className="content_div_1" >
                        <div className="scrollbar" id="style-3">
                            <div className="force-overflow">
                                <div>
                                    {
                                        parkingList.map((val, ind) => {
                                            return (
                                                <List key={ind} >
                                                    <ListItem>
                                                        <ListItemAvatar>
                                                            <Avatar
                                                                alt="Adelle Charles"
                                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxUrqjMcRAeCvrllU5EjZ6dU3T3FKcGaJyM7Y2a3qJP2YX4wAf"
                                                            >
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText>
                                                            <div className="Parking_area_List" >{val.parkingAreaVal}</div>
                                                            <div className="parkingSlotList" >{val.numberOfSlots} slots</div>
                                                        </ListItemText>

                                                        <ListItemSecondaryAction>
                                                            <IconButton
                                                                onClick={this.bookingHandler.bind(this, val)} aria-label="Delete">
                                                                <svg fill="#fff" xmlns="http://www.w3.org/2000/svg"
                                                                    width="40" height="40" viewBox="0 0 24 24">
                                                                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                                                                    <path d="M0 0h24v24H0z" fill="none" />
                                                                </svg>
                                                            </IconButton>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                </List>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="content_div_2">
                        {(this.state.num > 0) ?
                            <div className="scrollbar_2" id="style-4">
                                <div className="force-overflow">
                                    <div className="slote_CardContent" >
                                        {this.props.allSlots.slots.map((value, index) => {
                                            return (
                                                <Card
                                                    key={index}
                                                    onClick={(value.active) ? null
                                                        : this.selectSlot.bind(this, index, value)}
                                                    className="slots_button"
                                                    style={(value.active) ?
                                                        {
                                                            backgroundColor: "#3f51b5",
                                                            cursor: "not-allowed"
                                                        } : null}>
                                                    <CardContent>
                                                        {(value.active) ?
                                                            <div>
                                                                Selected
                                                        </div>
                                                            : <div> slot {index + 1}</div>}

                                                    </CardContent>
                                                </Card>
                                            )
                                        })}

                                    </div>
                                </div>
                            </div> :
                            <div className="Nothing_to_show_div" >
                                <div className="Nothing_to_show_text" >
                                    Nothing to show
                                </div>
                            </div>}

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



const mapStateToProp = (state) => {
    return ({
        ParkingList: state.root,
        parkinID: state.root,
        allSlots: state.root,
        selected_Data: state.root,
        areaName: state.root
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        ParkingAction: (data) => {
            dispatch(ParkingAction(data))
        },
        Parking_ID: (data) => {
            dispatch(Parking_ID(data))
        },
        slotsAction: (data) => {
            dispatch(slotsAction(data))
        },
        selectedData: (data) => {
            dispatch(selectedData(data))
        },
        AreaNameAction: (data) => {
            dispatch(AreaNameAction(data))
        },
    };
};


export default connect(mapStateToProp, mapDispatchToProp)(Dashboard)

