import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import KilnInfoInputComp from "./KilnInfoInputComp";
import Axiosapi from '../SingleComponents/Axiosapi'
import { myContext } from "../../context";

const isAuthenticated = () => {
  const token = localStorage.getItem("item");
  return token && token.length > 10;
};


const KilnInfoInput = () => {
  const kiln = {
    name: "",
    address: "",
  };

  const { KilnNewStatefunc, kilnInfo ,alertData,AlertFunc} = useContext(myContext);
  const [kilnInfoValue, setkilnInfoValue] = useState(kilnInfo);
  const [valuea, setValue] = useState(kiln);
  const [alertInfo, setalertInfo] = useState(alertData);


  const isAlreadyAuthenticated = isAuthenticated();

  const InputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    value = value.toUpperCase();
    setValue((prevState) => {
      return { ...prevState, [name]: value };
    });
  };


  useEffect(() => {
    KilnNewStatefunc([...kilnInfoValue]);
  }, [kilnInfoValue]);

  useEffect(() => {
    AlertFunc(alertInfo);
  },[alertInfo]);

  const SubmitHandler = (e) => {
    e.preventDefault();


      Axiosapi({
        method:'POST',
        url:'kiln/',
        data:valuea
      })
     .then(res =>
       {
        valuea.id = res.data.id;
        setkilnInfoValue([...kilnInfoValue, valuea]);
        if (res.status === 201 && res.statusText === "Created") {
          setalertInfo({type: 'success', msg: 'Kiln saved'})
         }
        })
        .catch((err) => {
        setalertInfo({type: 'error', msg: 'Something went wrong. Please try again.'})
      })


      setValue(kiln)
  }

  return (
    <div>
      {isAlreadyAuthenticated ? (
        <div>
          <KilnInfoInputComp
            InputHandler={InputHandler}
            SubmitHandler={SubmitHandler}
            valuea={valuea}
          />
        </div>
      ) : (
        <Redirect to={{ pathname: "login" }} />
      )}
    </div>
  );
};

export default KilnInfoInput;
