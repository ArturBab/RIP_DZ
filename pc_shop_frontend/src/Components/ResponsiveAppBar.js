import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import api_socket from "../network";
import * as appAct from "../store/actionCreators/AppActionCreators";
import {useNavigate} from "react-router";
import {createAction_setuserIsManager, createAction_setUsername} from "../store/actionCreators/AppActionCreators";
import {useEffect, useState} from "react";


function ResponsiveAppBar() {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const [userOptions, set_userOptions] = useState([
        {
            title: 'Моя корзина',
            link: '../cart',
        },
        {
            title: 'Мои заказы',
            link: '../purchases',
        },
        {
            title: 'Выйти',
            link: '../',
        }])
    const default_pages = useSelector(state => state.ui.App.AppBarLinks)
    const userStatus = useSelector(state => state.cached_data.App.userAuthorized)
    const userIsManager = useSelector(state => state.cached_data.App.userIsManager)
    const UserName = useSelector(state => state.cached_data.App.username)

    const dispatch = useDispatch()
    const history = useNavigate()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLoginLogoutBtnClick = event => {
        event.preventDefault()
        if (userStatus) {
            localStorage.setItem('accessToken', '')
            localStorage.setItem('refreshToken', '')
            localStorage.setItem('userId', '')
            dispatch(appAct.createAction_setUserStatus(false))
            history('../auth')
        }
        else history('../auth')
    }
    const getname = async()=>{
        fetch (`http://${api_socket}/getname/`,{
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        }).then(response=>{
            console.log(response)
            if (response.status !== 200)
                throw new Error(response.status)
            return response.json();
        }).then((username)=>{
            console.log(username)
            dispatch(createAction_setUsername(username))
        })
    }
    const getmod = async()=>{
        fetch (`http://${api_socket}/ismgr/`,{
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        }).then(response=>{
            console.log(response)
            return response.json();
        }).then((ismod)=>{
            console.log(ismod)
            if(ismod===true){
                console.log(ismod)
                dispatch(createAction_setuserIsManager(true))
            }
            else{
                console.log(ismod)
                dispatch(createAction_setuserIsManager(false))
            }
        })
    }

    useEffect(() => {
        if (userStatus) {
            getmod()
            getname()

            dispatch(appAct.createAction_setAppBarLinks([
                {
                    title: 'Перейти на основную страницу',
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
            ]))
            if (userIsManager) {
                dispatch(appAct.createAction_setAppBarLinks([
                    {
                        title: 'Перейти на основную страницу',
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
                    {
                        title: 'Редактирование заказов',
                        link: '../ManageOrders'
                    },
                    {
                        title: 'Редактирование продукции',
                        link: '../ProdManagerPage'
                    },
                ]))
            }
        }
        else {
            dispatch(appAct.createAction_deleteFromAppBarLinks('Редактирование заказов'))
            dispatch(appAct.createAction_deleteFromAppBarLinks('Редактирование продукции'))
        }

    }, [userStatus, userIsManager])

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Bahnschrift Condensed',
                            fontWeight: 900,
                            color: 'white',
                            textDecoration: 'none',
                        }}>
                        PC SHOP
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {default_pages.map((page, index) => (
                                <MenuItem key={index} onClick={event => {
                                    event.preventDefault()
                                    handleCloseNavMenu()
                                }}>
                                    <Link
                                        key={index}
                                        style={{
                                            textDecoration: 'none',
                                            color: "black",
                                            cursor: "pointer"
                                        }}
                                        to={page.link}
                                    >
                                        {page.title}
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'Bahnschrift Condensed',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        PC SHOP
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {default_pages.map((page, index) => (
                            <Button
                                key={index}
                                onClick={event => {
                                    event.preventDefault()
                                    history(page.link)
                                }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {!userStatus?
                            <MenuItem onClick={handleLoginLogoutBtnClick}>
                                <div>Войти</div>
                            </MenuItem>:
                            <>
                                <Tooltip title="Open settings">
                                    <MenuItem onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <div>{UserName}</div>
                                    </MenuItem>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {userOptions.map((page, index) => (
                                        <MenuItem key={index} onClick={event => {
                                            event.preventDefault()
                                            handleCloseNavMenu()
                                        }}>
                                            <Link
                                                key={index}
                                                style={{
                                                    textDecoration: 'none',
                                                    color: "black",
                                                    cursor: "pointer"
                                                }}
                                                to={page.link}
                                                onClick={(event) => {
                                                    if (index === 2) {
                                                        event.preventDefault()
                                                        handleLoginLogoutBtnClick(event)
                                                    }
                                                }}
                                            >
                                                {page.title}
                                            </Link>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;