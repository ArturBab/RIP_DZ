import initialstate from "../initialstate";
import {combineReducers} from "@reduxjs/toolkit";
import * as ProductPageActions from "../actions/ProductPageActions"



function productReducer(state=initialstate.cached_data.ProductPage.product,action){
    switch(action.type){
        case ProductPageActions.setproduct:
            return action.value
        default: return state
    }
}

function loadingStatusReducer(state=initialstate.ui.ProductPage.loadingStatus,action){
    switch(action.type){
        case ProductPageActions.setloadingStatus:
            return action.value
        default: return state
    }
}




export const uiProductPageReducers = combineReducers({
    loadingStatus: loadingStatusReducer,
})
export const cached_dataProductPageReducers = combineReducers({
    product:productReducer,
})