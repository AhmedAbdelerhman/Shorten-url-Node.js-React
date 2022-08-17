import React from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";

import { Redirect } from "react-router-dom";
import { Box, styled } from "@mui/material";

import Form from "./pages/Form";
import MainPage from "./pages/MainPage";
import GetLongUrl from "./components/GetLongUrl";

function App() {
  const ThemeTag = styled("div")({
    position: "fixed",
    top: "3%",
    left: "3%",
  });

  const MyBox = styled(Box)({});

  return (
    <MyBox bgcolor="background.default" color={"text.primary"}>
      <Switch>
 
        <Route path="/login" exact>
          <Form signUp={false} />
        </Route>
        <Route path="/signup" exact>
          <Form signUp={true} />
        </Route>

        <Route path="/" exact>
          <MainPage />
        </Route>

        <Route path="/:id" render={(props) => <GetLongUrl {...props} />} />
      </Switch>

      <ThemeTag></ThemeTag>
    </MyBox>
  );
}

export default App;
