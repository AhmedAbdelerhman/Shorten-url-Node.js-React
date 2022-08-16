import { Fragment } from "react";
import LogIn from "../components/LogIn";

import SignUP from "../components/SignUP";
const Form = (props) => {
  return (
    <Fragment>
      {props.signUp? <SignUP /> : <LogIn  /> }

    </Fragment>
  );
};
export default Form;
