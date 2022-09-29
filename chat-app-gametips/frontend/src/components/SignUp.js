import React, { Fragment, useState, useEffect } from 'react';
import { Stack, Box } from '@mui/system';
import { AppBar, TextField, Typography } from '@mui/material';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';

const If = ({ condition, children }) => {
    if (condition) {
        return children;
    }
};

export default function SignUp() {
    const [userName, setUserName] = useState("");
    const [userNameTaken, setUserNameTaken] = useState(false);
    const clientId = '92924635618-jfp2hmchkrqlc6at7iakf4180jb4aeas.apps.googleusercontent.com';
    const navigate = useNavigate();
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });

    useEffect(() => {
        const loggedInUser = JSON.parse(window.localStorage.getItem('user'));
        if (loggedInUser) {
            navigate("/");
        }
    }, []);

    const onSuccess = async (res) => {
        var possibleUser = []
        const email = res.profileObj.email;
        const name = userName;
        const imgurl = res.profileObj.imageUrl
        console.log(name);
        try {
            const response1 = await fetch("http://localhost:5000/checkUserName/".concat(name));
            possibleUser = await response1.json();
        } catch (error) {
            console.error(error.message);
        }
        if (possibleUser.length !== 0) {
            setUserNameTaken(true);
            return null;
        }
        setUserNameTaken(false);
        try {
            const response2 = await fetch("http://localhost:5000/getUser/".concat(email));
            possibleUser = await response2.json();
        } catch (error) {
            console.log(error.message);
        }
        if (possibleUser.length === 0) {
            try {
                const body = { email, name, imgurl };
                const response3 = await fetch("http://localhost:5000/newUser", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                });
                possibleUser = await response3.json();
            } catch (error) {
                console.log(error.message);
            }
        }
        const myObject = {
            user_id: possibleUser[0].user_id,
            name: possibleUser[0].username,
            imageUrl: possibleUser[0].imgurl,
            email: possibleUser[0].email,
            googleId: res.profileObj.googleId
        };
        console.log(myObject);
        window.localStorage.setItem('user', JSON.stringify(myObject));
        navigate("/");
    };

    const onFailure = (err) => {
        console.log('failed', err);
    };

    return (
        <Fragment>
            <Stack spacing={3}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                    </AppBar>
                </Box>
                <Typography variant='h2' component="div" align='center'>Type your preferred username below to sign up!</Typography>
                <If condition={userNameTaken}>
                    <Typography variant='h2' component="div" align='center'>That user name is already taken!</Typography>
                </If>
                <TextField
                    id='outlined-basic'
                    label="Input Username"
                    variant='outlined'
                    value={userName}
                    onChange={(e) => {
                        setUserName(e.target.value);
                    }}
                />
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign up with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                    autoLoad={false}
                    onAutoLoadFinished={true}
                />
            </Stack>
        </Fragment>
    )
}