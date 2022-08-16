import React, { useState, useRef } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  CardActions,
  Grid,
  IconButton,
} from "@material-ui/core";
import { FileCopyOutlined as FileCopyOutlinedIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  copyButton: {
    justifyContent: "flex-end",
  },
}));

export default function CardUrls(props) {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);

  const [Responsemessage, setResponsemessage] = useState("");
  const longUrlRef = useRef();
  const iosPrimaryRef = useRef();
  const iosFallBackRef = useRef();
  const androidPrimaryRef = useRef();
  const androidFallBackRef = useRef();

  const submitHandler = async (slug) => {
    console.log(longUrlRef.current.value);
    const longUrl = longUrlRef.current.value;
    const androidPrimary = androidPrimaryRef.current.value;
    const androidFallBack = androidFallBackRef.current.value;
    const iosPrimary = iosPrimaryRef.current.value;
    const iosFallBack = iosFallBackRef.current.value;
    const user = JSON.parse(localStorage.getItem("userInfo"))
      ? JSON.parse(localStorage.getItem("userInfo"))
      : { userData: "" };

    try {
      const { data } = await axios.put(
        `https://ahmed-shorten-api.herokuapp.com/api/url/${slug}`,
        {
          longUrl,
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
        }
      );
      console.log(data);
      setResponsemessage(data);
      window.location.reload();

      return { userData: data };
    } catch (error) {
      setResponsemessage(error.response.data);
      console.log(error.response.data);
      return { error: error.response.data };
    }
  };

  return (
    <Box className="col-lg-4">
      <Box>
        <Box>
          <Card className={classes.card}>
            <CardHeader
              action={
                <IconButton
                  color="primary"
                  className={classes.copyButton}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      window.location.host + "/" + props.card.slug
                    );
                  }}
                >
                  <FileCopyOutlinedIcon />
                </IconButton>
              }
              title={window.location.host + "/" + props.card.slug}
              titleTypographyProps={{
                variant: "subtitle1",
              }}
            />
            <CardContent>
              <Box
                color="background.paper"
                style={{
                  overflowX: "auto",
                  overflowY: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                <div class="input-group input-group-sm mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-sm">
                    Long Url
                  </span>
                  <input
                    type="text"
                    ref={longUrlRef}
                    defaultValue={props.card.web}
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    disabled={!isEdit}
                  />
                </div>

                <div class="input-group input-group-sm mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-sm">
                    Ios Primary
                  </span>

                  <input
                    ref={iosPrimaryRef}
                    type="text"
                    defaultValue={props.card.ios.primary}
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    disabled={!isEdit}
                  />
                </div>

                <div class="input-group input-group-sm mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-sm">
                    Ios FallBack
                  </span>

                  <input
                    ref={iosFallBackRef}
                    type="text"
                    defaultValue={props.card.ios.fallback}
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    disabled={!isEdit}
                  />
                </div>

                <div class="input-group input-group-sm mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-sm">
                    Android Primary
                  </span>

                  <input
                    ref={androidPrimaryRef}
                    type="text"
                    defaultValue={props.card.android.primary}
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    disabled={!isEdit}
                  />
                </div>

                <div class="input-group input-group-sm mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-sm">
                    Android FallBack
                  </span>

                  <input
                    ref={androidFallBackRef}
                    type="text"
                    defaultValue={props.card.android.fallback}
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    disabled={!isEdit}
                  />
                </div>
              </Box>
            </CardContent>

            <CardActions>
              <Button size="small" color="primary" href={props.card.slug}>
                Open
              </Button>
              {isEdit ? (
                <Button
                  size="small"
                  onClick={() => submitHandler(props.card.slug)}
                >
                  submit
                </Button>
              ) : (
                <Button size="small" onClick={() => setIsEdit(true)}>
                  Edit
                </Button>
              )}
              {isEdit && (
                <Button
                  size="small"
                  color="primary"
                  onClick={() => setIsEdit(false)}
                >
                  cancel
                </Button>
              )}
            </CardActions>
          </Card>
          <p className="text-center " style={{ color: "red" }}>
            {Responsemessage.message}
          </p>
        </Box>
      </Box>
    </Box>
  );
}
