import React, { Component } from 'react';
import './index.css';
import { connect } from "react-redux"
import { mySlotsAction, AreaNameAction } from "../../store/action/action"
import firebase from "firebase"
import Header from "../AppBar/index"
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const database = firebase.database().ref("/")
class ViweBooking extends Component {
  constructor(){
    super()
    this.state = {
      currentTime:new Date().getTime()
    }
  }
  componentDidMount() {
    database.child("Parkings").on("child_added", (snapshot) => {
      let obj = snapshot.val();
      obj.id = snapshot.key;
      this.props.mySlotsAction(obj)
    })
  }




  render() {
    let currentUserID = firebase.auth().O;
    // this.props.selected_Data.mySlots.map((val) => {
    //   val.bookingArr.map((bookinViewVall) => {
    //     let slotes = val.bookingArr
    //     slotes[bookinViewVall.index].active = false;
    //     console.log(bookinViewVall.parkinID === val.id )
    //     if (bookinViewVall.endTime < this.state.currentTime
    //        && bookinViewVall.parkinID === val.id) {
    //       database.child(`Parkings/${bookinViewVall.parkinID}/bookingArr`).set(slotes)
    //     }
    //   })
    // })

    return (
      <div className="App">
        <div>
          <Header />
        </div>
        <div >
          <br />
          <br />
          <br />
          {this.props.selected_Data.mySlots.map((val, ind) => {
            return (
              <div key={ind} >
                {val.bookingArr.map((newVal, newIndex) => {
                  console.log(newVal.active, "======")
                  return (
                    <div key={newIndex}>
                      {(currentUserID === newVal.currentUserID) ?
                        <div>
                          <Card className="slots_button_list">
                            <CardContent
                              className="CardContent_class">
                              <div style={{ display: "flex", alignItems: "center" }} >{newVal.areaName}</div>
                              <div style={{ display: "flex", alignItems: "center" }} >Slote No {newVal.sloteNumber}</div>
                              <div>
                                <IconButton style={{ display: "flex", alignItems: "center" }} >
                                  <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                    <path d="M0 0h24v24H0z" fill="none" />
                                  </svg>
                                </IconButton>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        : null}
                    </div>
                  )
                })
                }
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProp = (state) => {
  return ({
    selected_Data: state.root,
  });
};
const mapDispatchToProp = (dispatch) => {
  return {
    mySlotsAction: (data) => {
      dispatch(mySlotsAction(data))
    },
    AreaNameAction: (data) => {
      dispatch(AreaNameAction(data))
    },
  };
};


export default connect(mapStateToProp, mapDispatchToProp)(ViweBooking)

