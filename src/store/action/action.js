import firebase from "firebase"
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

// export const currentUser = (data)=>{
//     // console.log(data, "___________currentUser")    
//     return dispatch => {       
//         dispatch ({
//             type:ActionTypes.CURRENT_USER,
//             payload:data
//         })
//     }
// }


// export const postData = (data, navigate)=>{
//     return dispatch => {       
//         dispatch ({
//             type:ActionTypes.POST_DATA,
//             payload:data 
//         })
//     }
// }

// export const postPath = (data)=>{
//     // alert(data)
//     return dispatch => {       
//         dispatch ({
//             type:ActionTypes.POST_PATH,
//             payload:data 
//         })
//     }
// }


// export const profilrData = (data)=>{
//     return dispatch => {       
//         dispatch ({
//             type:ActionTypes.PROFILE_DATA,
//             payload:data
//         })
//     }
// }



// export const commentAction = (data)=>{
//     return dispatch => {       
//         dispatch ({
//             type:ActionTypes.COMMENT_DATA,
//             payload:data
//         })
//     }
// }

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