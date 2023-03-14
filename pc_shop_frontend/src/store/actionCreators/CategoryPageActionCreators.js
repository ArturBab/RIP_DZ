import * as CategoryPageActions from "../actions/CategoryPageActions"


export const createAction_setloadingStatus = value => {
    return {
        type: CategoryPageActions.setloadingStatus,
        value: value
    }
}
export const createAction_settextFieldValue = value => {
    return {
        type: CategoryPageActions.settextFieldValue,
        value: value
    }
}

export const createAction_setsliderValue = value => {
    return {
        type: CategoryPageActions.setsliderValue,
        value: value
    }
}
export const createAction_setgroupValue = value => {
    return {
        type: CategoryPageActions.setgroupValue,
        value: value
    }
}

export const createAction_setsproductList = value => {
    return {
        type: CategoryPageActions.setproductList,
        value: value
    }
}

export const createAction_setproductprices = value => {
    return {
        type: CategoryPageActions.setproductprices,
        value: value
    }
}
export const createAction_setgroupList = value => {
    return {
        type: CategoryPageActions.setgroupList,
        value: value
    }
}