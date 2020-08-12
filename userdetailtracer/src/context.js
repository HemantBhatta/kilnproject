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
    searchbydistrict:'All' ,
    searchbymunicipality: 'All',
    searchbyward: '',
    searchbyworkercategory: 'All',
    searchbynaike_f_name: '',
    searchbykilnname: '',
    mobileNav: false,
    searchbykiln: '',
    searchbykilnlocation: '',
    searchbykilnowner: '',
    ModalStatus:false,
    ModalData:[],
    alertData: null,
    csrftoken:'',
    user: null,
    offlineWorkers: {}
  };

  componentDidMount() {
    this.fetchAllData();
  }

  fetchAllData = () => {
    if( localStorage.getItem('app-data')){
      const values = JSON.parse(localStorage.getItem('app-data'))
      this.setState({
        workersInfo:values.workersInfo,
        sortedWorkersInfo:values.workersInfo,
        kilnInfo:values.kilnInfo,
        sortedkilnInfo:values.kilnInfo,
        offlineWorkers: values.offlineWorkers,
        user:values.user
      });

      if( Object.keys(values.offlineWorkers).length ){
        console.log( Object.values(values.offlineWorkers) );
        //this.hookState({offlineWorkers: {}});
      }
    }  else {
    Promise.all([Axiosapi.get('workers'), Axiosapi.get('kiln'), Axiosapi.get('user')])
      .then(([workers, kilns, user]) => {
        this.hookState({ 
          workersInfo: workers.data, sortedWorkersInfo: workers.data,
          kilnInfo: kilns.data, sortedkilnInfo: kilns.data,
          user: user.data 
        })
      }).catch(er => console.log(er))
    }
  }

  hookState = state => {
    this.setState(state);
    const {workersInfo, kilnInfo, user, offlineWorkers} = this.state;
    console.log(offlineWorkers, 'hj');
    localStorage.setItem('app-data', JSON.stringify({workersInfo, kilnInfo, user, offlineWorkers}));
  }







  KilnNewStatefunc =(newState)=> {
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

  WorkerEditPaymentFunc =(worker)=> {
    this.state.offlineWorkers[worker.id] = worker;
    console.log(this.state.offlineWorkers, 'hjofline');
    this.hookState({offlineWorkers: this.state.offlineWorkers});
  }


  ChangeOptionFilter = (e) => {
    let value = e.target.value;
    let name = e.target.name;
  
  
    this.setState({ [name]: value }, () => {
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
     
      searchbyworkercategory,
      searchbynaike_f_name,
      
    } = this.state;

    let tempWorkersInfo = [...workersInfo];
  
    if (searchbyworkername !== null) {
     const search = searchbyworkername.toLowerCase()
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return worker.f_name.toLowerCase().includes(search);
      });
    

    }


    if (searchbynaike_f_name !== null) {
     const search = searchbynaike_f_name.toLowerCase()
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return worker.naike_f_name.toLowerCase().includes(search);
      });
     
    }


    if (gender !== "All") {
     const search = gender.toLowerCase()
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return worker.gender && worker.gender.toLowerCase().startsWith(search);
      });
      
    }

   

  

    if (searchbydistrict !== "All") {
      const search = searchbydistrict.toLowerCase()
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return worker.district.toLowerCase().includes(search);
      });
    }

    if (searchbymunicipality !== "All") {
      const search = searchbymunicipality.toLowerCase()
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return worker.municipality && worker.municipality.toLowerCase().includes(search);
      });
    }

 
    if (searchbyworkercategory !== 'All') {
    const search =  searchbyworkercategory.toLowerCase()
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return worker.category && worker.category.toLowerCase().includes(search);
      });
     
    }

    if (kname !== "All") {
      const search = kname.toLowerCase()
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return worker.kiln.name.toLowerCase() === search;
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
      const search = searchbykiln.toLowerCase()
      tempkilnInfo = tempkilnInfo.filter((kiln) => {
        return kiln.name.toLowerCase().includes(search);
      });
    }

    if (searchbykilnlocation !== null) {
      const search = searchbykilnlocation.toLowerCase()
      tempkilnInfo = tempkilnInfo.filter((kiln) => {
        return kiln.address.toLowerCase().includes(search);
      });
    }


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
        this.hookState({workersInfo:filteredWorker, sortedWorkersInfo:filteredWorker, searchbyworkername: '',
        gender: 'All',
        searchbydistrict:'All' ,
        searchbymunicipality: 'All',  
        searchbyworkercategory: 'All',
        searchbynaike_f_name: '',
        searchbykilnname: ''})
      
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
        this.hookState({kilnInfo:filteredKiln, sortedkilnInfo:filteredKiln, searchbykiln: '',
        searchbykilnlocation: '',})
       
     
        }
      })
      .catch((err) => {
        this.hookState({alertData:{type: 'error', msg: 'Something went wrong. Please try again.'}})
      })
  };

  isSuperUser = () => {
      return this.state.user && this.state.user.is_superuser;
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
          AlertFunc:this.AlertFunc,
          isSuperUser: this.isSuperUser,
          WorkerEditPaymentFunc: this.WorkerEditPaymentFunc
        }}
      >
        {this.props.children}
      </myContext.Provider>
    );
  }
}
const ContextConsumer = myContext.Consumer;
export { ContextProvider, myContext, ContextConsumer };
