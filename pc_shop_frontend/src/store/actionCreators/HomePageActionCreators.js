import * as HomePageActions from "../actions/HomePageActions"


export const createAction_setctgList = value => {
    return {
        type: HomePageActions.setctgList,
        value: value
    }
}
export const createAction_setloadingStatus = value => {
    return {
        type: HomePageActions.setloadingStatus,
        value: value
    }
}