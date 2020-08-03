import React, { Component } from "react";
import Axiosapi from './components/Axiosapi'
const myContext = React.createContext();

class ContextProvider extends Component {
  state = {
    workersInfo: [],
    sortedWorkersInfo: [],
    singleWorkerInfo: '',
    editWorkerInfoId: '',
    kilnInfo: [],
    sortedkilnInfo: [],
    kname: "All",
    gender: "All",
    searchbyworkername: '',
    searchbycountry: '',
    searchbydistrict:'' ,
    searchbymunicipality: '',
    searchbyward: '',
    searchbyworkercategory: '',
    searchbynaikename: '',
    searchbykilnname: '',
    mobileNav: false,
    searchbykiln: '',
    searchbykilnlocation: '',
    searchbykilnowner: '',
    ModalStatus:false,
    ModalData:[],
    alertData: null,
    csrftoken:''
  };

  componentDidMount() {
    let csrftoken = this.getCookie('csrftoken')
    console.log(csrftoken, 'Here')
    this.hookState({csrftoken:csrftoken})
    this.fetchAllData();
  }

  fetchAllData = () => {
    Axiosapi.get('workers')
    .then(res=>{
      this.hookState({ workersInfo: res.data, sortedWorkersInfo: res.data })
    }) 
    .catch((err) => console.log(err));

    Axiosapi.get('kiln')
    .then(res=>{
      this.hookState({ kilnInfo: res.data, sortedkilnInfo: res.data })
    })
    .catch((err) => console.log(err));

    
  }

  hookState = state => {
    this.setState(state);
    console.log(state)
  }


  getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    console.log(cookieValue)
    return cookieValue;
}




  KilnNewStatefunc =(newState)=> {
    console.log(newState)
          this.hookState({sortedkilnInfo:newState,kilnInfo:newState})
  }

  WorkerNewStatefunc =(newState)=> {
    this.hookState({workersInfo:newState,sortedWorkersInfo:newState})
  }

  WorkerEditStatefunc =(worker)=> {
    const workersInfo = this.state.workersInfo;
    const idx = workersInfo.findIndex(e => e.id === worker.id);
    if( idx > -1 ){
      workersInfo.splice(idx, 1, worker);
      this.hookState({workersInfo,sortedWorkersInfo: workersInfo});
    }
  }

  ChangeOptionFilter = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    console.log(value, name);
    this.hookState({ [name]: value }, () => {
      this.filterAllOptions();
      this.filterKilnData();
    });
  };

  filterAllOptions = () => {
    const {
      kname,
      workersInfo,
      gender,
      searchbyworkername,
     
      searchbydistrict,
      searchbymunicipality,
      searchbyward,
      searchbyworkercategory,
      searchbynaikename,
      searchbykilnname,
    } = this.state;

    let tempWorkersInfo = [...workersInfo];

    if (kname !== "All") {
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return worker.kiln.name === kname;
      });
    }

    if (gender !== "All") {
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return worker.gender.startsWith(gender.toUpperCase());
      });
    }

    if (searchbyworkername !== null) {
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return worker.f_name.includes(searchbyworkername.toUpperCase());
      });
    }

  

    if (searchbydistrict !== null) {
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return worker.district.includes(searchbydistrict.toUpperCase());
      });
    }

    if (searchbymunicipality !== null) {
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return worker.municipality.includes(searchbymunicipality.toUpperCase());
      });
    }

    if (searchbyward !== null) {
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return worker.ward.includes(searchbyward.toUpperCase());
      });
    }

    if (searchbyworkercategory !== null) {
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return worker.workercategory.includes(
          searchbyworkercategory.toUpperCase()
        );
      });
    }

    if (searchbynaikename !== null) {
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return worker.naikename.includes(searchbynaikename.toUpperCase());
      });
    }

    if (searchbykilnname !== null) {
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return worker.kiln.name.includes(searchbykilnname.toUpperCase());
      });
    }

    this.hookState({ sortedWorkersInfo: tempWorkersInfo });
  };

  filterKilnData = () => {
    const {
      kilnInfo,
      searchbykiln,
      searchbykilnlocation,
     
    } = this.state;

    let tempkilnInfo = [...kilnInfo];

    if (searchbykiln !== null) {
      tempkilnInfo = tempkilnInfo.filter((kiln) => {
        return kiln.name.includes(searchbykiln.toUpperCase());
      });
    }

    if (searchbykilnlocation !== null) {
      tempkilnInfo = tempkilnInfo.filter((kiln) => {
        return kiln.address.includes(searchbykilnlocation.toUpperCase());
      });
    }

    // if (searchbykilnowner !== null) {
    //   tempkilnInfo = tempkilnInfo.filter((kiln) => {
    //     return kiln.kilnowner.includes(searchbykilnowner.toUpperCase());
    //   });
    // }

    this.hookState({ sortedkilnInfo: tempkilnInfo });
  };

  OpenNavMenu = () => {
    this.hookState({ mobileNav: true });
  };

  CloseNavMenu = () => {
    this.hookState({ mobileNav: false });
  };



  filterByIdworker = (id) => {
    let filteredList =this.state.workersInfo.filter(worker=>{
      return worker.id !== id
    })
    return filteredList
  }

  filterByIdkiln = (id) => {
    let filteredList =this.state.kilnInfo.filter(worker=>{
      return worker.id !== id
    })
    return filteredList
  }

  deleteWorker = (id) => {

      Axiosapi({
        method:'DELETE',
        url:`workers/${id}`,
        
      }).then(res=>{
        if (res.status === 204 && res.statusText === "No Content") {
        this.hookState({alertData:{type: 'success', msg: 'Worker deleted successfully'}})
        let filteredWorker = this.filterByIdworker(id)
        this.hookState({workersInfo:filteredWorker, sortedWorkersInfo:filteredWorker})
        console.log('deleting ok finished')
        }
      })
      .catch((err) => {
        this.hookState({alertData:{type: 'error', msg: 'Something went wrong. Please try again.'}})
      })
      

  };

  deleteKiln = (id) => {

      Axiosapi({
        method:'DELETE',
        url:`kiln/${id}`,
        
      }).then(res=>{
        if (res.status === 204 && res.statusText === "No Content") {
        this.hookState({alertData:{type: 'success', msg: 'Kiln deleted successfully'}})
        let filteredKiln = this.filterByIdkiln(id)
        this.hookState({kilnInfo:filteredKiln, sortedkilnInfo:filteredKiln})
        console.log('deleting ok finished')
        }
      })
      .catch((err) => {
        this.hookState({alertData:{type: 'error', msg: 'Something went wrong. Please try again.'}})
      })
  };


OpenModal = (id) => {
       
        let modaldata =this.state.workersInfo.filter(worker=>{
          return worker.id === id
        })
        
        this.hookState({ModalStatus:true,ModalData:modaldata})
}

CloseModal = (id) => {
  this.hookState({ModalStatus:false})
}

AlertFunc = (res) => {
  this.hookState({alertData:res})
}




  render() {
  console.log(this.state.alertData)
    return (
      <myContext.Provider
        value={{
          ...this.state,
          ChangeOptionFilter: this.ChangeOptionFilter,
          SearchWorkerName: this.SearchWorkerName,
          EditWorker: this.EditWorker,
          OpenNavMenu: this.OpenNavMenu,
          CloseNavMenu: this.CloseNavMenu,
          deleteWorker: this.deleteWorker,
          deleteKiln:this.deleteKiln,
          fetchAllData:this.fetchAllData,
          KilnNewStatefunc:this.KilnNewStatefunc,
          WorkerNewStatefunc:this.WorkerNewStatefunc,
          WorkerEditStatefunc:this.WorkerEditStatefunc,
          OpenModal:this.OpenModal,
          CloseModal:this.CloseModal,
          AlertFunc:this.AlertFunc
        }}
      >
        {this.props.children}
      </myContext.Provider>
    );
  }
}
const ContextConsumer = myContext.Consumer;
export { ContextProvider, myContext, ContextConsumer };
