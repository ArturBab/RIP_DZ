import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect, useState} from "react";
import {createAction_setuserIsManager, createAction_setUserStatus} from "../store/actionCreators/AppActionCreators";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import api_socket from "../network";
import theme from "../themes"

export default function AuthPage() {

    const [access, setAccess] = useState(localStorage.getItem('accessToken'))
    const [refresh, setRefresh] = useState(localStorage.getItem('refreshToken'))
    const [refreshRequired, setRefreshRequired] = useState(false)
    const [loading, setLoading] = useState()
    const [ error, setError] = useState()

    const dispatch = useDispatch()

    const submitHandler = e => {

        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setLoading(true);

        fetch(
            `http://${api_socket}/api/token/obtain`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    username: data.get('username'),
                    password: data.get('password'),
                })
            }
        )
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw Error(`Something went wrong: code ${response.status}`)
                }
            })
            .then(({access, refresh}) => {
                localStorage.setItem('accessToken', access)
                setAccess(access)
                localStorage.setItem('refreshToken', refresh)
                setRefresh(refresh)
                setError(null)
                setError(null)
            })
            .catch(error => {
                console.log(error)
                setError('Ошибка, подробности в консоли')
            })
            .finally(setLoading(false))
    }

    const navigate = useNavigate()


    useEffect(() => {
        if (access) {
            fetch(
                `http://${api_socket}/api/user`,
                {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization': `Bearer ${access}`,
                    },
                }
            )
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    else {
                        if (response.status === 401) {
                            throw Error('refresh')
                        }
                        throw Error(`Something went wrong: code ${response.status}`)
                    }
                })
                .then((data) => {
                    setError(null)
                    localStorage.setItem('userId', data.data.id)
                    dispatch(createAction_setUserStatus(true))
                    fetch (`http://${api_socket}/ismgr/`,{
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8',
                            'Authorization': `Bearer ${access}`,
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
                    navigate('/')
                })
                .catch(error => {
                    console.log(`ОШибка:${error.message}`)
                    if (error.message === 'refresh') {
                        setRefreshRequired(true)
                    } else {
                        console.log(error)
                        setError('Ошибка, подробности в консоли')
                    }
                })
        }
    }, [access])

    useEffect(() => {
        if (refreshRequired) {
            fetch(
                `http://${api_socket}/api/token/refresh`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify({ refresh })
                }
            )
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw Error(`Something went wrong: code ${response.status}`)
                    }
                })
                .then(({access, refresh}) => {
                    localStorage.setItem('accessToken', access)
                    setAccess(access)
                    localStorage.setItem('refreshToken', refresh)
                    setRefresh(refresh)
                    setError(null)

                })
                .catch(error => {
                    console.log(error)
                    setError('Ошибка, подробности в консоли')
                })
        }
    }, [refreshRequired])


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {/*<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>*/}
                    <Typography component="h1" variant="h5">
                        Авторизоваться в систему
                    </Typography>
                    <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Имя пользователя"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Войти
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/reg" variant="body2">
                                    {"Нет аккаунта? Зарегестрируйтесь"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}