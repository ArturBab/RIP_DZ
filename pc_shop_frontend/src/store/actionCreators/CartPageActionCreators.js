import * as CartPageActions from "../actions/CartPageActions"


export const createAction_setcartitems = value => {
    return {
        type: CartPageActions.setcartitems,
        value: value
    }
}
export const createAction_setfullprice = value => {
    return {
        type: CartPageActions.setfullprice,
        value: value
    }
}

export const createAction_setloadingStatus = value => {
    return {
        type: CartPageActions.setloadingStatus,
        value: value
    }
}