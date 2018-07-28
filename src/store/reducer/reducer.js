import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
   isLoader:false,
   isRegisterError:""
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.IS_SIGN_LODER:
        return({
            ...state,
            isLoader :action.payload
        })
        case ActionTypes.IS_REGISTER_ERROR:
        return({
            ...state,
            isRegisterError :action.payload
        })
        // case ActionTypes.CURRENT_USER:
        // return({
        //     ...state,
        //     currentUser:action.payload
        // })
        // case ActionTypes.POST_DATA:
        // return({
        //     ...state,
        //     postData:action.payload
        // })
        // case ActionTypes.POST_PATH:
        // return({
        //     ...state,
        //     postPath:action.payload
        // })
        // case ActionTypes.PROFILE_DATA:
        // return({
        //     ...state,
        //     prifileData:action.payload
        // })
        // case ActionTypes.COMMENT_DATA:
        // return({
        //     ...state,
        //     commentList :[...state.commentList,action.payload]
        // })
        // case ActionTypes.NULL_COMMENTS:
        // return({
        //     ...state,
        //     commentList :[]
        // })
        // case ActionTypes.USER_LIST:
        // return({
        //     ...state,
        //     userList :[...state.userList,action.payload]
        // })
        // case ActionTypes.MESSEGES:
        // return({
        //     ...state,
        //     messeges :[...state.messeges,action.payload]
        // })
        // case ActionTypes.USER_NULL:
        // return({
        //     ...state,
        //     userList :[]
        // })
        // case ActionTypes.MESSEGES_DATA:
        // return({
        //     ...state,
        //     messegesDAta :action.payload
        // })
        // // case ActionTypes.SEND_MESSEGE_RESEVER:
        // // return({
        // //     ...state,
        // //     reseverMessegesDAta :action.payload
        // // })
        default:
            return state;
    }

}