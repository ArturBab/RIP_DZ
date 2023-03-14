import initialstate from "../initialstate";
import {combineReducers} from "@reduxjs/toolkit";
import * as CategoryPageActions from "../actions/CategoryPageActions"



function loadingStatusReducer(state=initialstate.ui.CategoryPage.loadingStatus,action){
    switch(action.type){
        case CategoryPageActions.setloadingStatus:
            return action.value
        default: return state
    }
}

function textFieldValueReducer(state=initialstate.ui.CategoryPage.textFieldValue,action){
    switch(action.type){
        case CategoryPageActions.settextFieldValue:
            return action.value
        default: return state
    }
}

function sliderValueReducer(state=initialstate.ui.CategoryPage.sliderValue,action){
    switch(action.type){
        case CategoryPageActions.setsliderValue:
            return action.value
        default: return state
    }
}

function groupValueReducer(state=initialstate.ui.CategoryPage.groupValue,action){
    switch(action.type){
        case CategoryPageActions.setgroupValue:
            return action.value
        default: return state
    }
}


function productListReducer(state=initialstate.cached_data.CategoryPage.productList,action){
    switch(action.type){
        case CategoryPageActions.setproductList:
            return action.value
        default: return state
    }
}

function productpricesReducer(state=initialstate.cached_data.CategoryPage.productprices,action){
    switch(action.type){
        case CategoryPageActions.setproductprices:
            return action.value
        default: return state
    }
}

function groupListReducer(state=initialstate.cached_data.CategoryPage.groupList,action){
    switch(action.type){
        case CategoryPageActions.setgroupList:
            return action.value
        default: return state
    }
}



export const uiCategoryPageReducers = combineReducers({
    loadingStatus: loadingStatusReducer,
    textFieldValue: textFieldValueReducer,
    sliderValue: sliderValueReducer,
    groupValue:groupValueReducer
})
export const cached_dataCategoryPageReducers = combineReducers({
    productList:productListReducer,
    productprices:productpricesReducer,
    groupList:groupListReducer
})