import initialstate from "../initialstate";
import {combineReducers} from "@reduxjs/toolkit";
import * as CartPageActions from "../actions/CartPageActions"


function cartitemsReducer(state=initialstate.cached_data.CartPage.cartitems,action){
    switch(action.type){
        case CartPageActions.setcartitems:
            return action.value
        default: return state
    }
}

function fullpriceReducer(state=initialstate.cached_data.CartPage.fullprice,action){
    switch(action.type){
        case CartPageActions.setfullprice:
            return action.value
        default: return state
    }
}

function LoadingStatusReducer(state=initialstate.ui.CartPage.loadingStatus,action){
    switch(action.type){
        case CartPageActions.setloadingStatus:
            return action.value
        default: return state
    }
}

export const uiCartPageReducers = combineReducers({
    loadingStatus:LoadingStatusReducer,
})
export const cached_dataCartPageReducers = combineReducers({
    cartitems:cartitemsReducer,
    fullprice: fullpriceReducer,
})