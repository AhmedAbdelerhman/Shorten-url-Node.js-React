import { Fragment, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import AllUrlCards from "../components/AllUrlCards";
import UrlsDialog from "../components/UrlsDialog";

const CardUrl = (props) => {
  const [showDialog, setShowDialog] = useState(false);
  const location = useLocation()
  console.log(location.pathname)
  let button = {
    background: "#3f51b5",
    color: "#fff",
    right: "25%",
    top: "2%",
  };
  const history = useHistory();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!(userInfo?.userData.token) ) 
 {   console.log("hi")
  
  
  history.push("/login");}
  }, [history,location]);
  const showDialogHandler = () => {
    setShowDialog((showDialog) => (showDialog = !showDialog));
  };
  const closeDialogHandler = (value) => {
    setShowDialog(value);
  };
  return (
    <Fragment>
      {" "}
      <AllUrlCards />
      <UrlsDialog closeDialoge={closeDialogHandler} IsShowDialog={showDialog} />
      <button
        type="button"
        style={button}
        className="btn btn-labeled position-absolute w-50"
        onClick={showDialogHandler}
      >
        <span className="btn-label">
          <i className="bi bi-plus-circle"></i> Add Shorten Link 
        </span>
      </button>
    </Fragment>
  );
};
export default CardUrl;
