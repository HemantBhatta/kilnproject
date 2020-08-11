import React, { useState, useContext, useEffect } from "react";
// import axios from "axios";
import { Redirect } from "react-router-dom";
import Axiosapi from "./Axiosapi";

import { myContext } from "../context";

import WorkersInfoInputComp from "./WorkersInfoInputComp";

const isAuthenticated = () => {
  const token = localStorage.getItem("item");
  return token && token.length > 10;
};

const WorkersInfoInput = () => {
  const {
    workersInfo,
    WorkerNewStatefunc,
    kilnInfo,
    alertData,
    AlertFunc,
  } = useContext(myContext);
  const isAlreadyAuthenticated = isAuthenticated();

  const workers = {
    f_name: "",
    l_name: "",
    naike_f_name: "",
    naike_l_name: "",
    gender: "",
    age: "",
    country: "",
    district: "",
    municipality: "",
    ward: "",
    workercategory: "",
    phone: "",
    salary: "",
    kiln_id: "",
    extra: null,
    children: null
  };

  const [valuea, setValue] = useState(workers);
  const [workerInfoValue, setworkerInfoValue] = useState(workersInfo);
  const [alertInfo, setalertInfo] = useState(alertData);

  const InputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    value = value.toUpperCase();

    setValue((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const InputHandlerKiln = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setValue((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  useEffect(() => {
    WorkerNewStatefunc([...workerInfoValue]);
  }, [workerInfoValue]);

  useEffect(() => {
    AlertFunc(alertInfo);
  }, [alertInfo]);

  const SubmitHandler = (e) => {
    e.preventDefault();

    Axiosapi({
      method: "POST",
      url: "workers/",
      data: valuea,
    })
      .then((res) => {
        valuea.id = res.data.id;
        valuea.kiln = kilnInfo.find((e) => e.id === valuea.kiln_id);
        setworkerInfoValue([...workerInfoValue, valuea]);
        if (res.status === 201 && res.statusText === "Created") {
          setalertInfo({ type: "success", msg: "Worker saved" });
        }
      })
      .catch((err) => {
        setalertInfo({
          type: "error",
          msg: "Something went wrong. Please try again.",
        });
      });

    setValue(workers);
  };

  return (
    <div className='workerInputSection'>
      {isAlreadyAuthenticated ? (
        <div>
          <WorkersInfoInputComp
            kilnlist={kilnInfo}
            InputHandlerKiln={InputHandlerKiln}
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

export default WorkersInfoInput;
