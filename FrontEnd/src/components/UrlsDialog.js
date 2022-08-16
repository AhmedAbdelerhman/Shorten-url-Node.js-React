import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";


import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
//import { LocalPrintshopSharp } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
  },
}));

export default function UrlsDialog(props) {
  const classes = useStyles();
  const [Responsemessage, setResponsemessage] = useState("");

  const slugRef = useRef();
  const longUrlRef = useRef();
  const iosPrimaryRef = useRef();
  const iosFallBackRef = useRef();
  const androidPrimaryRef = useRef();
  const androidFallBackRef = useRef();

  const submitHandler = async () => {
  console.log( longUrlRef.current.value)
    const longUrl = longUrlRef.current.value;
    const slugKey = slugRef.current.value;
    const androidPrimary = androidPrimaryRef.current.value;
    const androidFallBack = androidFallBackRef.current.value;
    const iosPrimary = iosPrimaryRef.current.value;
    const iosFallBack = iosFallBackRef.current.value;
    const user = JSON.parse(localStorage.getItem("userInfo"))
    ? JSON.parse(localStorage.getItem("userInfo"))
    : { userData: "" };
 

    try {
      const {data} = await axios.post(`https://ahmed-shorten-api.herokuapp.com/api/url`, 
       {

        longUrl,
        slugKey,
        androidPrimary,
        androidFallBack,
        iosPrimary,
        iosFallBack,
       },
       {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.userData.token}`,
        },
      });
      console.log(data)
      setResponsemessage(data)
      closeDialoge()
      window.location.reload()
      

  
    
      return {userData:data};
    } catch (error) {
      setResponsemessage(error.response.data)
      console.log(error.response.data)
      return {error:error.response.data}
          
    }

  };
  const closeDialoge = () => {
    props.closeDialoge(false);
  };

  return (
    <Dialog open={props.IsShowDialog} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">FireShort URL</DialogTitle>
      <DialogContent>
        <DialogContentText>{Responsemessage.message }</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="longurl"
          label="Long URL"
          type="url"
          required
          fullWidth
          inputRef={longUrlRef}
        />
        <TextField
          autoFocus
          margin="dense"
          label="ios Primary Url"
          type="url"
          required
          fullWidth
          inputRef={iosPrimaryRef}
        />
        <TextField
          autoFocus
          margin="dense"
          label="ios fallback Url"
          type="url"
          fullWidth
          required
          inputRef={iosFallBackRef}
        />
        <TextField
          autoFocus
          margin="dense"
          label="android Primary Url"
          type="url"
          fullWidth
          required
          inputRef={androidPrimaryRef}
        />
        <TextField
          autoFocus
          margin="dense"
          label="android Fallback Urls"
          type="url"
          required
          fullWidth
          inputRef={androidFallBackRef}
        />
        <TextField
          margin="dense"
          id="customurl"
          label="Custom URL"
          type="text"
          inputRef={slugRef}
        />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={submitHandler}
        >
          Generate
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialoge} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
