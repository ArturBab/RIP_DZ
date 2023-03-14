import * as ProductPageActions from "../actions/ProductPageActions"


export const createAction_setloadingStatus = value => {
    return {
        type: ProductPageActions.setloadingStatus,
        value: value
    }
}
export const createAction_setproduct = value => {
    return {
        type: ProductPageActions.setproduct,
        value: value
    }
}