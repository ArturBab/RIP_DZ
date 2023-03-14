const initialState = {
    cached_data: {
        HomePage: {
            ctgList: []
        },
        CategoryPage: {
            productList:[],
            productprices:[0,0],
            groupList:[]
        },
        ProductPage: {
            product: {},
        },
        App:{
            username: "__Placeholder__",   // редьюсер нужен
            userIsManager: false,
            userAuthorized: (localStorage.getItem('userId') ? localStorage.getItem('userId') !== '': false),
        },
        CartPage:{
            cartitems:[],
            fullprice:1,
        },
        OrderPage: {
            ordersList:[],
            statusList:[],
        },
    },
    ui: {
        HomePage: {
            loadingStatus: true,
        },
        CategoryPage: {
            loadingStatus: true,
            textFieldValue: '',
            sliderValue: [0, 0],
            groupValue:[]
        },
        ProductPage: {
            loadingStatus: true
        },
        App: {
            AppBarLinks: [
                {
                    title: 'Начальная страница',
                    link: '../'
                },
                {
                    title: 'Процессоры',
                    link: '../category/1/'
                },
                {
                    title: 'Видеокарты',
                    link: '../category/2/'
                },
                {
                    title: 'Материнские платы',
                    link: '../category/3/'
                },
            ],
        },
        CartPage:{
            loadingStatus: true
        },
        OrderPage:{
            loadingStatus: true
        }
    }
}

export default initialState