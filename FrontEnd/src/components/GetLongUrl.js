import { Fragment } from 'react';
import React, {  useEffect,useState } from "react";
import MobileDetect  from 'mobile-detect'



const  GetLongUrl =(props) =>{
  var md = new MobileDetect(window.navigator.userAgent);
  const [ message, setMessage]=useState("")
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
          const response = await fetch(`https://ahmed-shorten-api.herokuapp.com/shortlinks/${props.match.params.id}`, config);
          try {
            const url = await response.json();
            if( md.os()==="iOS")
            window.location.href = url.originUrl.ios.primary;
            else if(md.os()==="AndroidOS")
            window.location.href = url.originUrl.android.primary;
            else
            window.location.href = url.originUrl.web;  



          } catch (error) {
            
            setMessage("the url not found")
           
        }
        };
    
        getUrls();
      }, []);
    
return  ( <Fragment> 
    
<h1>  {message ? message :"forwarding ..."}</h1>    
      </Fragment> );
 
 }
 export default GetLongUrl