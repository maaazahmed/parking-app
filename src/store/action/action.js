import ActionTypes from "../constant/constant"


export const isLoaderAction = (data)=>{
    return dispatch => {       
        dispatch ({
            type:ActionTypes.IS_SIGN_LODER,
            payload:data
        })
    }
}
export const isRegisterAction = (data)=>{
    return dispatch => {       
        dispatch ({
            type:ActionTypes.IS_REGISTER_ERROR,
            payload:data
        })
    }
}

export const ParkingAction = (data)=>{
    // console.log(data, "___________currentUser")    
    return dispatch => {       
        dispatch ({
            type:ActionTypes.PARKING_LIST,
            payload:data
        })
    }
}


export const Parking_ID = (data)=>{
    return dispatch => {       
        dispatch ({
            type:ActionTypes.PARKING_ID,
            payload:data 
        })
    }
}

export const slotsAction = (data)=>{
    return dispatch => {       
        dispatch ({
            type:ActionTypes.SLOTS_,
            payload:data 
        })
    }
}


export const selectedData = (data)=>{
    return dispatch => {       
        dispatch ({
            type:ActionTypes.SELECTED_DATA,
            payload:data
        })
    }
}



export const mySlotsAction = (data)=>{
    return dispatch => {       
        dispatch ({
            type:ActionTypes.MY_SLOTS,
            payload:data
        })
    }
}
export const AreaNameAction = (data)=>{
    return dispatch => {       
        dispatch ({
            type:ActionTypes.AREA_NAME,
            payload:data
        })
    }
}

// export const commentNull = (data)=>{
//     return dispatch => {       
//         dispatch ({
//             type:ActionTypes.NULL_COMMENTS,
//             payload:data
//         })
//     }
// }

// export const userListAction = (data)=>{
//     return dispatch => {       
//         dispatch ({
//             type:ActionTypes.USER_LIST,
//             payload:data
//         })
//     }
// }

// export const messagesAction = (data)=>{
//     return dispatch => {       
//         dispatch ({
//             type:ActionTypes.MESSEGES,
//             payload:data
//         })
//     }
// }

// export const NullUserAction = (data)=>{
//     return dispatch => {       
//         dispatch ({
//             type:ActionTypes.USER_NULL,
//             payload:data
//         })
//     }
// }




// export const sendMessageAction = (data)=>{
//     return dispatch => {       
//         dispatch ({
//             type:ActionTypes.MESSEGES_DATA,
//             payload:data
//         })
//     }
// }

// // export const reseverSessagesAction = (data)=>{
// //     return dispatch => {       
// //         dispatch ({
// //             type:ActionTypes.SEND_MESSEGE_RESEVER,
// //             payload:data
// //         })
// //     }
// // }