import api_socket from "./network";


export const getProds = async (ctg = 1) => {
    return await fetch(`http://${api_socket}/ctg/${ctg}/prods/`)
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        });
}

export const getCtgs = async () => {
    return await fetch(`http://${api_socket}/ctg/`)
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        });
}

export const getCart = async (user) => {
    return await fetch(`http://${api_socket}/cart/?user=${user}`)
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        });
}

export const getStatuses = async () => {
    return await fetch(`http://${api_socket}/status/`)
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        });
}

export const getOrders = async (user) => {
    return await fetch(`http://${api_socket}/order/?user=${user}`)
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        });
}

export const getOrdersm = async () => {
    return await fetch(`http://${api_socket}/orderm/`)
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        });
}

export const getProdprice = async (ctg = 1) => {
    return await fetch(`http://${api_socket}/prodprice/${ctg}`)
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        });
}

export const getGroups = async () => {
    return await fetch(`http://${api_socket}/group/`)
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        });
}

export const getProdsFilter = async (ctg = 1,filters) => {

    return await fetch(`http://${api_socket}/ctg/${ctg}/prods/${filters}`)
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        });
}

export const getOrdersFilter = async (user,filters) => {
    return await fetch(`http://${api_socket}/order/?user=${user}${filters}`)
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        });
}

export const getOrdersmFilter = async (filters) => {
    return await fetch(`http://${api_socket}/orderm/?${filters}`)
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        });
}

export const getProdOne = async (ctg = 1,id=-1) => {
    return await fetch(`http://${api_socket}/ctg/${ctg}/prods/${id}/`)
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        });
}

export const getCartItem = async(user=-1, item) => {
    return await fetch (`http://${api_socket}/cart/?user=${user}&product=${item}`).then(
        async (response)=>{
            return await (await response.json());
        }).catch(()=>{
            return{
                resultCount:0,
                results:[]
            }
        }
    );
}

export const getProdm = async () => {
    return await fetch(`http://${api_socket}/prodm/`)
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        });
}