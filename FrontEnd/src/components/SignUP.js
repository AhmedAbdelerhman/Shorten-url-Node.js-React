import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';



import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CircularProgress, styled } from "@mui/material";
import { NavLink } from "react-router-dom";
import httpPost from "../Functions/httpPostForm";

const SignUP = (props) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadPicture, setUploadPicture] = useState(false);

  const [pic, setPic] = useState(null);
  const refEmailSignUp = useRef();
  const passwordSignUp = useRef();
  const nameSignup = useRef();

  const upLoadPhoto = (pics) => {
    setUploadPicture(true);
    if (pics === undefined) {
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dgrbwggrg");
      fetch("https://api.cloudinary.com/v1_1/dgrbwggrg/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setUploadPicture(false);
        })
        .catch((err) => {
          console.log(err);
          setUploadPicture(false);
        });
    } else {
      setUploadPicture(false);
      return;
    }
  };

  const signUpHandler = async (event) => {
    event.preventDefault();
    const email = refEmailSignUp.current.value;
    const password = passwordSignUp.current.value;
    const name = nameSignup.current.value;
    let payLoad = { name, email, password, pic };
    console.log();
    if (
      email.trim().length <= 0 ||
      password.trim().length <= 0 ||
      name.trim().length <= 0
    ) {
 

      return;
    }
    if (!pic) {
      payLoad = { name, email, password };
    }

    setIsLoading(true);
    const data = await httpPost(payLoad, "signup");
    if (data.userData) {
      localStorage.setItem("userInfo", JSON.stringify(data));
      history.push("/main")
    } else {
      console.log(data.error);
    
    }
  };

  const MyAvatar = styled(Avatar)({
    height: "80px",
    width: "80px",
    backgroundPosition: "center",
    backgroundSize: "cover",
  });

  const theme = createTheme({
    palette: {
      mode: props.theme,
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
          <MyAvatar src={pic} sx={{ m: 1, bgcolor: "secondary.main" }}>
            {isUploadPicture ? <CircularProgress /> : <LockOutlinedIcon />}
          </MyAvatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={signUpHandler} sx={{ mt: 1 }}>
            <TextField
              inputRef={nameSignup}
              margin="normal"
              required
              fullWidth
              id="text"
              label="Your Name"
              name="text"
              autoComplete="email"
              autoFocus
            />

            <TextField
              inputRef={refEmailSignUp}
              margin="normal"
              required
              fullWidth
              type="email"
              id="email"
              label="Email Address"
              name="name"
              autoComplete="name"
            />

            <TextField
              inputRef={passwordSignUp}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              pattern=".{8,}"
              title="8 characters minimum"
              inputProps={{
                pattern: ".{8,}",
                title: "8 characters minimum",
              }}
              onInvalid={() => {
                console.log("hi");
              }}
              autoComplete="current-password"
            />


            <Button variant="contained" component="label">
              Upload File
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => upLoadPhoto(e.target.files[0])}
              />
            </Button>
      
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoading ? <CircularProgress /> : "Sign Up"}
            </Button>
            <Grid container>
              <Grid item xs>
        
              </Grid>
              <Grid>
                <NavLink color={"text.primary"} to="/home/login">
                  Already have an account? Log In
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default SignUP;
