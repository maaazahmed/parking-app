import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    isLoader: false,
    areaName: "",
    parkinID: "",
    slots: [],
    mySlots: [],
    activeArr: [],
    parkingList: [],
    sselectedData: {},
    isRegisterError: "",
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.IS_SIGN_LODER:
            return ({
                ...state,
                isLoader: action.payload
            })
        case ActionTypes.IS_REGISTER_ERROR:
            return ({
                ...state,
                isRegisterError: action.payload
            })
        case ActionTypes.PARKING_LIST:
            return ({
                ...state,
                parkingList: [...state.parkingList, action.payload]
            })

        case ActionTypes.PARKING_ID:
            return ({
                ...state,
                parkinID: action.payload
            })
        case ActionTypes.SLOTS_:
            return ({
                ...state,
                slots: action.payload
            })

        case ActionTypes.SELECTED_DATA:
            return ({
                ...state,
                sselectedData: action.payload
            })
        case ActionTypes.MY_SLOTS:
            return ({
                ...state,
                mySlots: [...state.mySlots, action.payload]
            })
        case ActionTypes.AREA_NAME:
            return ({
                ...state,
                areaName: action.payload
            })

        default:
            return state;
    }

}