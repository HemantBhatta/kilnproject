import { CssBaseline } from "@material-ui/core";
import React, { Component } from "react";
import Axiosapi from './components/SingleComponents/Axiosapi'
const myContext = React.createContext();

class ContextProvider extends Component {
  state = {
    workersInfo: [],
    sortedWorkersInfo: [],
    singleWorkerInfo: '',
    sortedWorkersInfoSummary:[],
    sortedKilnInfoSummary:[],
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
    searchbykilnlocation: '',
    searchbykilnowner: '',
    ModalStatus:false,
    ModalData:[],
    alertData: null,
    csrftoken:'',
    user: null,
    offlineWorkers: {},
    searchbydistrictsummary:'All',
    searchbymunicipalitysummary:'All',
    moneypaidworker:'All',
    TotalSummaryAmountPaid:0,
    TotalSummaryByDistrict:[],
    searchbykilnsummary:'All',
    moneypaidkiln:'All',
    TotalSummaryByKiln:[],
    TotalSummaryByNgo:[],
    InitialDataStatus:false,
    csvData:[],
    csvKilnData:[],

  };

  componentDidMount() {
    this.fetchAllData();
  }

  //********Data Fetching**********/ 

  fetchAllData = () => {
    if( localStorage.getItem('app-data')){
      const values = JSON.parse(localStorage.getItem('app-data'))
      this.setState({
        workersInfo:values.workersInfo,
        sortedWorkersInfo:values.workersInfo,
        sortedWorkersInfoSummary:values.workersInfo,
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
          workersInfo: workers.data, sortedWorkersInfo: workers.data,sortedWorkersInfoSummary:workers.data,
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
    // console.log(newState,'ok')
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
    // console.log(this.state.offlineWorkers, 'hjofline');
    this.hookState({offlineWorkers: this.state.offlineWorkers});
  }


//********* SelectOption in filter worker/kiln******//

  ChangeOptionFilter = (e) => {
    let value = e.target.value;
    let name = e.target.name;
  // console.log(value,name)
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
  // console.log(workersInfo)
    if (searchbyworkername !== '') {
     const search = searchbyworkername.toLowerCase()
    //  console.log(search,workersInfo)
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return worker.f_name.toLowerCase().includes(search);
      });
    }

    if (searchbycode !== '') {
      const search = searchbycode.toLowerCase()
     //  console.log(search,workersInfo)
       tempWorkersInfo = tempWorkersInfo.filter((worker) => {
         return worker.code.toLowerCase().includes(search);
       });
     }


   if (searchbynaike_f_name !== '') {
     const search = searchbynaike_f_name.toLowerCase()
    //  console.log(search,workersInfo)
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
      searchbykilnlocation,
     
    } = this.state;

    let tempkilnInfo = [...kilnInfo];

    if (searchbykiln !== '') {
      const search = searchbykiln.toLowerCase()
      tempkilnInfo = tempkilnInfo.filter((kiln) => {
        return kiln.name.toLowerCase().includes(search);
      });
    }

    if (searchbykilnlocation !== '') {
      const search = searchbykilnlocation.toLowerCase()
      tempkilnInfo = tempkilnInfo.filter((kiln) => {
        return kiln.address.toLowerCase().includes(search);
      });
    }

    this.hookState({ sortedkilnInfo: tempkilnInfo },()=>this.CsvKilnDataFunc());
  };

//********* SelectOption in filter workersummary******//

  ChangeOptionFilterSummary = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    this.setState({ [name]: value }, () => {
      this.filterAllOptionsSummary(); 
    });
  }

//**********Filter func for workersummary*************//

  filterAllOptionsSummary = () => {
    const {searchbydistrictsummary,searchbymunicipalitysummary,
      workersInfo,moneypaidworker} = this.state

    let tempWorkersInfoSummary = [...workersInfo];

    if (searchbydistrictsummary !== "All") {
      const search = searchbydistrictsummary.toLowerCase()
      tempWorkersInfoSummary = tempWorkersInfoSummary.filter((worker) => {
        return worker.district.toLowerCase().includes(search);
      });
    }

    if (searchbymunicipalitysummary !== "All") {
      const search = searchbymunicipalitysummary.toLowerCase()
      tempWorkersInfoSummary = tempWorkersInfoSummary.filter((worker) => {
        return worker.municipality && worker.municipality.toLowerCase().includes(search);
      });
    }

    if (moneypaidworker == "paid") {
      tempWorkersInfoSummary = tempWorkersInfoSummary.filter((worker) => {
       
        return (worker.extra && (worker.extra.amount > 0|| worker.extra.amount !==''))     
      });
      
    } else if(moneypaidworker == "unpaid"){
     
      tempWorkersInfoSummary = tempWorkersInfoSummary.filter((worker) => {
        return (worker.extra == null)     
      });
    
    }else{
      tempWorkersInfoSummary = tempWorkersInfoSummary   
    }

    this.hookState({ sortedWorkersInfoSummary: tempWorkersInfoSummary },()=>this.calculateTotalPaidSummary());

  }

//***********Calculte Total PaidAmount  func**********//

  calculateTotalPaidSummary = () => {
    let totalprice = this.state.sortedWorkersInfoSummary.reduce((acc, item) => {
      if(item.extra !== null){
        acc = acc + parseInt(item.extra.amount)
        return acc
      }
      return acc;
    }, 0)
  
    this.setState({ TotalSummaryAmountPaid: totalprice },()=>this.PaidUnpaidSummary())
}

//**********Convert Object to desired Format in PaidUnpaid********//

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
            //  console.log(data)
     return data
}

//**********Paid and Unpaid List in Summary***********//

PaidUnpaidSummary = () => {
   const {sortedWorkersInfoSummary} =  this.state

  const s = sortedWorkersInfoSummary.reduce((acc, cur) => {
    if( acc[ cur.district ] ) acc[ cur.district ].push(cur);
    else acc[cur.district] = [cur];
    return acc;
  }, {})

  let districtdata =  this.ReduceKeyValFunc(s); 
  // console.log(districtdata)

  // districtdata = Object.values(districtdata).sort((a,b)=>{return (b.totalamount-a.totalamount)})
  // console.log(districtdata)
  this.setState({TotalSummaryByDistrict:districtdata})   
}

PaidUnpaidKilnSummary = () => {
  const {sortedWorkersInfoSummary} =  this.state

 const s = sortedWorkersInfoSummary.reduce((acc, cur) => {
   if( acc[ cur.kiln.name ] ) acc[ cur.kiln.name ].push(cur);
   else acc[cur.kiln.name] = [cur];
   return acc;
 }, {})

  const kilndata =  this.ReduceKeyValFunc(s);
  this.setState({TotalSummaryByKiln:kilndata})
}

PaidUnpaidNgoSummary = () => {
  const {sortedWorkersInfoSummary} =  this.state
  // console.log(sortedWorkersInfoSummary)
 const s = sortedWorkersInfoSummary.reduce((acc, cur) => {
   if( acc[ cur.org ] ) acc[ cur.org ].push(cur);
   else acc[cur.org] = [cur];
   return acc;
 }, {})

//  console.log(s)

  const ngodata =  this.ReduceKeyValFunc(s);
  // console.log(ngodata)
  this.setState({TotalSummaryByNgo:ngodata})
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
      // item.childrenname = item.children['Full Name'];
      // item.childrenage = item.children.Age;
      // item.childrengender = item.children.Gender;
      item.children = item.children.map(e=>e.join('/')).join(',')

    }

    // delete item['children']
    // delete item['extra']
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
    // console.log(this.state.user)
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
          ChangeOptionFilterSummary:this.ChangeOptionFilterSummary,
          filterAllOptionsSummary:this.filterAllOptionsSummary,
          calculateTotalPaidSummary:this.calculateTotalPaidSummary,
          PaidUnpaidKilnSummary:this.PaidUnpaidKilnSummary,
          PaidUnpaidNgoSummary:this.PaidUnpaidNgoSummary,
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
