import { Fragment, useState } from "react";
import AllUrlCards from "../components/AllUrlCards";
import UrlsDialog from "../components/UrlsDialog";

const CardUrl = (props) => {
  const [showDialog, setShowDialog] = useState(false);
  let button = {
    background: "#3f51b5",
    color: "#fff",
    right: "25%",
    top: "2%",
  };
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
          <i className="bi bi-plus-circle"></i> add url
        </span>
      </button>
    </Fragment>
  );
};
export default CardUrl;
