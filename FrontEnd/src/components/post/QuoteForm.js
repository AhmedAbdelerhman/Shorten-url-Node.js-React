import { useRef, useState } from "react";
import { Prompt } from "react-router-dom";
import axios from "axios";

import Card from "../Ui/Card";
import LoadingSpinner from "../Ui/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const title = useRef();
  const description = useRef();
  const rate = useRef();
  const category = useRef();
  const [file, setFile] = useState();
  const [formShow, setFormShow] = useState(false);
  // const [ newMovie, setNewMovie]=useState()


  const user = JSON.parse(localStorage.getItem("userInfo"))
    ? JSON.parse(localStorage.getItem("userInfo"))
    : { userData: "" };


  function submitFormHandler(event) {
    if (!formShow) {
      setFormShow(true);
    } else {
      event.preventDefault();
      const enteredTitle = title.current.value;
      const enteredDescription = description.current.value;
      const enteredCategory = category.current.value;
      const enteredRate = rate.current.value;
      const inputData = new FormData();
      inputData.append("title", enteredTitle);
      inputData.append("description", enteredDescription);
      inputData.append("rate", enteredRate);
      inputData.append("movieCategoryName", enteredCategory);

      inputData.append("image", file);

      const createMovie = async () => {
        try {
          const { data } = await axios.post(
            "https://ahmed-shorten-api.herokuapp.com/api/movie/new-move",
            inputData,
            {
              headers: {
                "Content-type": "application/json",

                Authorization: `Bearer ${user.userData.token}`,
              },
            }
          );
          setFormShow(false)
          window.location.reload()
          return  data ;
        } catch (error) {
          return { error: error.response.data };
        }
      };

      createMovie();
    }
  }

  const clickHandler = () => {
    setFormShow(false);
  };
  return (
    <div>
      {/* <Prompt /> */}
      <Card>
        <form className={classes.form}>
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}
           <p> </p>
          {formShow && (
            <div>
              <div className={classes.control}>
                <label htmlFor="author">title</label>
                <input type="text" id="author" ref={title} />
              </div>
              <div className={classes.control}>
                <label htmlFor="author">category</label>
                <input type="text" id="author" ref={category} />
              </div>

              <div className={classes.control}>
                <label htmlFor="author">rate</label>
                <input type="number" min="1" max="5" step="1" ref={rate} />{" "}
              </div>

              <div>
                <label for="formFileLg" className="form-label">
                  select image
                </label>
                <input
                  className="form-control "
                  id="formFileLg"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    setFile(file);
                  }}
                />
              </div>

              <div className={classes.control}>
                <label htmlFor="text">description</label>
                <textarea id="text" rows="3" ref={description}></textarea>
              </div>
              <div className={classes.actions}>
                <button onClick={clickHandler} className="btn btn-danger">
                  close
                </button>
              </div>
            </div>
          )}
          <div className="w-100 text-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={submitFormHandler}
            >
              Post <i className="bi bi-plus-circle"></i>
            </button>{" "}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default QuoteForm;
