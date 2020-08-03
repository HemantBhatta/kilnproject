import React, { useState,useContext,useEffect } from "react";
// import axios from "axios";
import { Redirect } from "react-router-dom";
import Axiosapi from './Axiosapi'

import {myContext} from '../context'


import WorkersInfoInputComp from './WorkersInfoInputComp'


const isAuthenticated = () => {
  const token = localStorage.getItem("item");
  return token && token.length > 10;
};


const WorkersInfoInput = () => {
const {workersInfo,WorkerNewStatefunc,kilnInfo,alertData,AlertFunc} = useContext(myContext)
const isAlreadyAuthenticated = isAuthenticated();




      const workers = {
       
        f_name: "qwe",
        l_name: "qweq",
        naikename:'qweqe',
        naikelastname:'ertert',
        gender:'MALE',
        age:123,
        country:'nepal',
        district:'adsa',
        municipality:'asdad',
        ward:'ad',
        workercategory:'adsad',    
        phone: 234234,
        salary: 500,
        kiln_id: 1,
      };

  const [valuea, setValue] = useState(workers);
  const [workerInfoValue, setworkerInfoValue] = useState(workersInfo);
  const [alertInfo, setalertInfo] = useState(alertData);

  const InputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    value = value.toUpperCase()
    
   
    setValue((prevState) => {
      return { ...prevState, [name]: value };
    });
  };


  const InputHandlerKiln = (e)=>{
    let name = e.target.name;
    let value = e.target.value;
    
   
    setValue((prevState) => {
      console.log(prevState, name, value)
      return { ...prevState, [name]: value };
    });
  }


  useEffect(() => {
    WorkerNewStatefunc([...workerInfoValue])
  
    },[workerInfoValue])

  useEffect(() => {
    AlertFunc(alertInfo);
  },[alertInfo]);

  const SubmitHandler = (e) => {
    e.preventDefault();
      
      Axiosapi({
        method:'POST',
        url:'workers/',
        data:valuea
      })
     .then(res =>
       {
        valuea.id = res.data.id;
        valuea.kiln = kilnInfo.find(e => e.id === valuea.kiln_id);
        setworkerInfoValue([...workerInfoValue, valuea]);
        if (res.status === 201 && res.statusText === "Created") {
          setalertInfo({type: 'success', msg: 'Worker saved'})
         }
        })
        .catch((err) => {
        setalertInfo({type: 'error', msg: 'Something went wrong. Please try again.'})
      })


  };

  return (
    <div>
{isAlreadyAuthenticated ?
    <div>
          <WorkersInfoInputComp kilnlist ={kilnInfo} InputHandlerKiln={InputHandlerKiln} InputHandler={InputHandler} SubmitHandler={SubmitHandler} valuea={valuea}/>
    </div> : <Redirect to ={{pathname:'/login'}} />
}
    </div>
  );
};

export default WorkersInfoInput;
