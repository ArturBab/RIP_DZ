import initialstate from "../initialstate";
import {combineReducers} from "@reduxjs/toolkit";
import * as HomePageActions from "../actions/HomePageActions"



function ctgListReducer(state=initialstate.cached_data.HomePage.ctgList,action){
    switch(action.type){
        case HomePageActions.setctgList:
            return action.value
        default: return state
    }
}

function loadingStatusReducer(state=initialstate.ui.HomePage.loadingStatus,action){
    switch(action.type){
        case HomePageActions.setloadingStatus:
            return action.value
        default: return state
    }
}




export const uiHomePageReducers = combineReducers({
    loadingStatus: loadingStatusReducer,
})
export const cached_dataHomePageReducers = combineReducers({
    ctgList:ctgListReducer,
})