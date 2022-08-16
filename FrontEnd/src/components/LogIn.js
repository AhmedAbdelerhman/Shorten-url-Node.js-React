import { Fragment, useEffect, useRef, useState } from "react";
import httpPost from "../Functions/httpPostForm";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/system";
import { Avatar } from "@mui/material";
import { useHistory } from "react-router-dom";

const LogIn = (props) => {
  const refEmailLogIn = useRef();
  const refPasswordLogIn = useRef();
  const [ responseMessage, setResponseMessage]=useState('')

  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")) ;
    if (userInfo?.userData.token) history.push("/main");
  }, [history]);

  const loginHandler = async (event) => {
    event.preventDefault();
    const email = refEmailLogIn.current.value;
    const password = refPasswordLogIn.current.value;
    let payLoad = { email, password };
    try {
      const  data  = await httpPost(payLoad, "login");
      if (data.userData) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        history.push("/chat");
      } else {

        setResponseMessage(data.error.message)
        console.log(data.error);
  
      }
    } catch (error) {
      console.log(error);
    }
  };


  const MyAvatar = styled(Avatar)({
    height: "80px",
    width: "80px",
    backgroundPosition: "center",
    backgroundSize: "cover",
  });

  return (
    <Fragment>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3 className="my-5">{responseMessage}</h3>
            <MyAvatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </MyAvatar>
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            <Box
              component="form"
              onSubmit={loginHandler}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                inputRef={refEmailLogIn}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                inputRef={refPasswordLogIn}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
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
                Log In
              </Button>
              <Grid container>
              
                <Grid item>
                  <NavLink to="/home/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
    </Fragment>
  );
};
export default LogIn;
