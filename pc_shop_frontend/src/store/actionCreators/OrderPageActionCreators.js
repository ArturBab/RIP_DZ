import * as OrderPageActions from "../actions/OrderPageActions"


export const createAction_setordersList = value => {
    return {
        type: OrderPageActions.setordersList,
        value: value
    }
}
export const createAction_setloadingStatus = value => {
    return {
        type: OrderPageActions.setloadingStatus,
        value: value
    }
}
export const createAction_setstatusList = value => {
    return {
        type: OrderPageActions.setstatusList,
        value: value
    }
}