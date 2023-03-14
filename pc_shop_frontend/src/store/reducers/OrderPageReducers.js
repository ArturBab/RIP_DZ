import initialstate from "../initialstate";
import {combineReducers} from "@reduxjs/toolkit";
import * as OrderPageActions from "../actions/OrderPageActions"



function ordersListReducer(state=initialstate.cached_data.OrderPage.ordersList,action){
    switch(action.type){
        case OrderPageActions.setordersList:
            return action.value
        default: return state
    }
}

function loadingStatusReducer(state=initialstate.ui.OrderPage.loadingStatus,action){
    switch(action.type){
        case OrderPageActions.setloadingStatus:
            return action.value
        default: return state
    }
}

function statusListReducer(state=initialstate.cached_data.OrderPage.statusList,action){
    switch(action.type){
        case OrderPageActions.setstatusList:
            return action.value
        default: return state
    }
}





export const uiOrderPageReducers = combineReducers({
    loadingStatus: loadingStatusReducer,
})
export const cached_dataOrderPageReducers = combineReducers({
    ordersList: ordersListReducer,
    statusList: statusListReducer,
})