import * as ProductPageActionCreators from "../actionCreators/ProductPageActionCreators"
import {getProdOne} from "../../modules"

export const fetchprod = (ctg,id) => async dispatch =>{
    if((ctg)&&(id)) {
        dispatch(ProductPageActionCreators.createAction_setloadingStatus(true))
        const prod = await getProdOne(ctg, id)
        dispatch(ProductPageActionCreators.createAction_setproduct(prod))
        dispatch(ProductPageActionCreators.createAction_setloadingStatus(false))

    }
}