import * as AppActions from "../actions/AppActions"
import {setuserIsManager, setUsername} from "../actions/AppActions";


export const createAction_setUsername = value => {
    return {
        type: AppActions.setUsername,
        value: value
    }
}

export const createAction_setUserStatus = value => {
    return {
        type: AppActions.setUserStatus,
        value: value
    }
}
export const createAction_addToAppBarLinks = value => {
    return {
        type: AppActions.addToAppBarLinks,
        value: value
    }
}

export const createAction_deleteFromAppBarLinks = value => {
    return {
        type: AppActions.deleteFromAppBarLinks,
        value: value
    }
}
export const createAction_setAppBarLinks = value => {
    return {
        type: AppActions.setAppBarLinks,
        value: value
    }
}

export const createAction_setuserIsManager = value => {
    return {
        type: AppActions.setuserIsManager,
        value: value
    }
}
