import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Axiosapi from "../SingleComponents/Axiosapi";

import { myContext } from "../../context";

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
    naike_name: "",
    naike_l_name: "",
    gender: "",
    age: "",
    country: "",
    district: "",
    municipality: "",
    ward: "",
    category: "",
    phone: "",
    salary: "",
    kiln_id: "",
    extra: null,
    children: []
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

  const genCode = (valuea, codes) => {
    const code = `${valuea.f_name.substr(0, 2)}${valuea.l_name.substr(0, 2)}-${valuea.gender[0]}-${valuea.age}`.toUpperCase();
    let c = code;
    let i = 1;
    while( codes[c] ){
      c = `${code}-${i}`;
      i++;
    }
    return c;
  };

  const SubmitHandler = (e) => {
    e.preventDefault();

    const codes = workerInfoValue.reduce((acc,curr)=>{
      acc[curr.code] = true;
      return acc;
    }, {});
    valuea.code =  genCode(valuea, codes);
    
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
