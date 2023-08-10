import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useState, useEffect} from "react";

const defaultTheme = createTheme();

export default function Home() {

    const [data, setData] = useState([]);

    // fetching the data from the API
    useEffect(() => {
        async function fetchData() {
            let response = await fetch('http://127.0.0.1:8000/api_01/v1/retrieve/');
            response = await response.json();
            setData(response);
        }

        fetchData();
    }, []);
    console.log(data)
    const handleSubmit = (event) => {
        const data = new FormData(event.currentTarget);

        fetch('http://127.0.0.1:8000/api_01/v1/store/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'original_data':data.get('data')})
        }).then(res => res.json())
            .then(data => console.log(data))


    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    my={5}
                >
                    <Typography variant={'h3'} my={3}>All the data...</Typography>
                    {data.map((ele, index) => <div key={index}>{index + 1}: {ele.original_data}</div>)}

                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Put in some data
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="data"
                                label="data"
                                name="data"
                                autoComplete="data"
                                autoFocus
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Post
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}