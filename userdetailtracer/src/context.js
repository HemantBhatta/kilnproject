import { CssBaseline } from "@material-ui/core";
import React, { Component } from "react";
import Axiosapi from './components/SingleComponents/Axiosapi'
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
    searchbycode:'',
    searchbycountry: '',
    searchbydistrict:'All' ,
    searchbymunicipality: 'All',
    searchbyward: '',
    searchbyworkercategory: 'All',
    searchbynaike_f_name: '',
    searchbykilnname: '',
    mobileNav: false,
    searchbykiln: '',
    searchbykilnowner: '',
    ModalStatus:false,
    ModalData:[],
    alertData: null,
    csrftoken:'',
    user: null,
    offlineWorkers: {},
    moneypaidworker:'All',
    moneypaidkiln:'All',
    InitialDataStatus:false,
    csvData:[],
    csvKilnData:[],

  };

  componentDidMount() {
    this.fetchAllData();
   
  }

  //********Data Fetching**********/ 

  fetchAllData = () => {
  
    if( localStorage.getItem('app-datam')){
      const values = JSON.parse(localStorage.getItem('app-data'))
      this.setState({
        workersInfo:values.workersInfo,
        sortedWorkersInfo:values.workersInfo,
       
        kilnInfo:values.kilnInfo,
        sortedkilnInfo:values.kilnInfo,
        offlineWorkers: values.offlineWorkers,
        user:values.user,
        InitialDataStatus:true
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
          user: user.data ,
          InitialDataStatus:true
        })
      }).catch(er => console.log(er))
    }
  }

  hookState = (state, cb) => {
  
    this.setState(state, cb);
    const {workersInfo, kilnInfo, user, offlineWorkers} = this.state;
   
    localStorage.setItem('app-data', JSON.stringify({workersInfo, kilnInfo, user, offlineWorkers}));
    
  }





//**********Add new values to state******//

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
    this.hookState({offlineWorkers: this.state.offlineWorkers});
  }


//********* SelectOption in filter worker/kiln******//

  ChangeOptionFilter = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({ [name]: value }, () => {
      this.filterAllOptions();
      this.filterKilnData();
      
    });
  };


  //**********Filter func for worker*************//

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
      searchbycode
      
    } = this.state;

    let tempWorkersInfo = [...workersInfo];
    if (searchbyworkername !== '') {
     const search = searchbyworkername.toLowerCase()
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return worker.f_name.toLowerCase().includes(search);
      });
    }

    if (searchbycode !== '') {
      const search = searchbycode.toLowerCase()
       tempWorkersInfo = tempWorkersInfo.filter((worker) => {
         return worker.code.toLowerCase().includes(search);
       });
     }


   if (searchbynaike_f_name !== '') {
     const search = searchbynaike_f_name.toLowerCase()
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return worker.naike_name && worker.naike_name.toLowerCase().includes(search);
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
    
    this.hookState({ sortedWorkersInfo: tempWorkersInfo },()=>{this.CsvWorkerDataFunc()});
  };

//**********Filter func for kiln*************//

  filterKilnData = () => {
    const {
      kilnInfo,
      searchbykiln,
      
     
    } = this.state;

    let tempkilnInfo = [...kilnInfo];

    if (searchbykiln !== '') {
      const search = searchbykiln.toLowerCase()
      tempkilnInfo = tempkilnInfo.filter((kiln) => {
        return kiln.name.toLowerCase().includes(search);
      });
    }

 

    this.hookState({ sortedkilnInfo: tempkilnInfo },()=>this.CsvKilnDataFunc());
  };



ReduceKeyValFunc = (s) => {
  let data = {}
 
     for(var [k,v] of Object.entries(s))
           {
             const amount = v.reduce((acc,cur)=>{
               if(cur.extra !== null){
                 acc = acc + parseInt(cur.extra.amount)
                 return acc
               }
               return acc;
             },0)

           var xy =   v.reduce((acc, cur) => {
             acc[k] = {peoplecount:v.length,totalamount:amount}
               return acc
             }, {})

             data = {...data, ...xy}
             
             }
     return data
}


clone = (v) => {
  return JSON.parse(JSON.stringify(v));
}

CsvWorkerDataFunc = () => {
  const {sortedWorkersInfo} =  this.state

  const data = this.clone(sortedWorkersInfo).map(item=>{
      item.kilnname = item.kiln.name;
      item.kilnaddress = item.kiln.address  ;     

    if(item.extra !== null){
      item.amountpaid = item.extra.payment.amount;
      item.amountpayer = item.extra.payment.amountpayer.username;
    }

    if(item.children !== null){
      item.children = item.children.map(e=>e.join('/')).join(',')
    }
    delete item['kiln']
   return item
  })

this.setState({csvData:data})
}

CsvKilnDataFunc = () => {
  const {sortedkilnInfo} = this.state

  const data = this.clone(sortedkilnInfo).map((item)=>{
    return item
  })

  this.setState({csvKilnData:data})
}


  OpenNavMenu = () => {
    this.hookState({ mobileNav: true });
  };

  CloseNavMenu = () => {
    this.hookState({ mobileNav: false });
  };

  filterById = (id,arr) => {
    let filteredList =arr.filter(item=>{
      return item.id !== id
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
        let filteredWorker = this.filterById(id,this.state.workersInfo)
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
        let filteredKiln = this.filterById(id,this.state.kilnInfo)
        this.hookState({kilnInfo:filteredKiln, sortedkilnInfo:filteredKiln, searchbykiln: '',
        })
       
     
        }
      })
      .catch((err) => {
        this.hookState({alertData:{type: 'error', msg: 'Something went wrong. Please try again.'}})
      })
  };

  isSuperUser = () => {
      return navigator.onLine && this.state.user && this.state.user.is_superuser;
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
          WorkerEditPaymentFunc: this.WorkerEditPaymentFunc,
          CsvWorkerDataFunc:this.CsvWorkerDataFunc,
          CsvKilnDataFunc:this.CsvKilnDataFunc
        }}
      >
        {this.props.children}
      </myContext.Provider>
    );
  }
}
const ContextConsumer = myContext.Consumer;
export { ContextProvider, myContext, ContextConsumer };
