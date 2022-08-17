import { Fragment } from "react";
import React, { useEffect, useState, useRef } from "react";

import CardUrl from "./CardUrl";
const AllUrlCards = (props) => {
  const [userUrls, setUserUrls] = useState({});

  const user = JSON.parse(localStorage.getItem("userInfo"))
    ? JSON.parse(localStorage.getItem("userInfo"))
    : { userData: "" };
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.userData.token}`,
    },
  };

  useEffect(() => {
    const getUrls = async () => {
      const response = await fetch(`https://ahmed-shorten-api.herokuapp.com/api/url`, config);
      try {
        const urls = await response.json();
        setUserUrls(urls);
      } catch (error) {}
    };

    getUrls();
  }, []);

  return (
    <Fragment>
        <div className="my-5">..</div>
  <div className="row m-5">
        {userUrls.shortLinks?.map((card) => (
          <CardUrl key={card._id} card={card} userUrls={userUrls} />
        ))}
    
  </div >
    </Fragment>
  );
};
export default AllUrlCards;
