import { CssBaseline } from "@material-ui/core";
import React, { Component } from "react";
import Axiosapi from "./components/SingleComponents/Axiosapi";
import {register} from './serviceWorker'
const myContext = React.createContext();

class ContextProvider extends Component {
  state = {
    workersInfo: [],
    sortedWorkersInfo: [],
    singleWorkerInfo: "",
    editWorkerInfoId: "",
    kilnInfo: [],
    sortedkilnInfo: [],
    kname: "All",
    gender: "All",
    searchbyworkername: "",
    searchbycode: "",
    searchbycountry: "",
    searchbydistrict: "All",
    searchbymunicipality: "All",
    searchbyward: "",
    searchbyworkercategory: "All",
    searchbynaike_f_name: "",
    searchbykilnname: "",
    searchbypaidstatus: "All",
    mobileNav: false,
    searchbykiln: "",
    searchbykilnowner: "",
    ModalData: null,
    alertData: null,
    csrftoken: "",
    user: null,
    offlineWorkers: {},
    moneypaidworker: "All",
    moneypaidkiln: "All",
    InitialDataStatus: false,
    csvData: [],
    csvKilnData: [],
    ngos: [],
    syncing: false,
    searchbyngo: "All",
    pageRefreshed: new Date().getTime(),
  };

  componentDidMount() {
    this.fetchAllData();
    

  }

  supportServiceWorker = () => {
      return ('serviceWorker' in navigator)
  }

  isOnline = () => {
    return navigator.onLine;
  };

  refreshCache = () => {
    localStorage.removeItem("app-data");
    window.location.href = "";
  };

  syncPayments = () => {
    this.setState({ syncing: true });
    Axiosapi({
      method: "POST",
      url: `sync-payments/`,
      data: Object.values(this.state.offlineWorkers),
    })
      .then((res) => {
        if (res.status === 200 && res.statusText === "OK") {
          this.hookState({ offlineWorkers: {} });
          this.setState({ syncing: false });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ syncing: false });
      });
  };

  cancelPayment = (worker) => {
    worker.extra = null;
    Axiosapi({
      method: "PUT",
      url: `workers/${worker.id}`,
      data: worker,
    })
      .then((res) => {
        if (res.status === 200 && res.statusText === "OK") {
          this.WorkerEditStatefunc(worker);
        }
      })
      .catch((err) => {
        this.setState({});
      });
  };

  //********Data Fetching**********/

  fetchFreshData = () => {
    Promise.all([
      Axiosapi.get("workers"),
      Axiosapi.get("kiln"),
      Axiosapi.get("user"),
      Axiosapi.get("ngos"),
    ])
      .then(([workers, kilns, user, ngos]) => {
        this.hookState({
          workersInfo: workers.data,
          sortedWorkersInfo: workers.data,
          kilnInfo: kilns.data,
          sortedkilnInfo: kilns.data,
          user: user.data,
          InitialDataStatus: true,
          ngos: ngos.data,
        });
      })
      .catch((er) => console.log(er));
  };

  setFreshDataToState = (values, cb=null) => {
    this.setState({
      workersInfo: values.workersInfo,
      sortedWorkersInfo: values.workersInfo,

      kilnInfo: values.kilnInfo,
      sortedkilnInfo: values.kilnInfo,
      offlineWorkers: values.offlineWorkers,
      user: values.user,
      ngos: values.ngos,
      InitialDataStatus: true,
    }, cb);

  }

  fetchAllData = () => {
    if (localStorage.getItem("app-data")) {
      const values = JSON.parse(localStorage.getItem("app-data"));

      if (
        values.workersInfo.length &&
        values.kilnInfo.length &&
        values.user &&
        values.ngos.length
      ) {
        if(this.isOnline() && Object.keys(values.offlineWorkers).length )
        {
          this.setFreshDataToState(values,this.syncPayments )
          
        }
        else{
        if (
          this.isOnline() && (new Date().getTime() - values.pageRefreshed) / 1000 > 1800
        ) {
          this.fetchFreshData();
        } else {
          this.setFreshDataToState(values)
        }
      }
      } else {
        localStorage.removeItem("app-data");
        window.location.href = "";
      }
    } else {
      this.fetchFreshData();
    }
  };

  hookState = (state, cb) => {
    this.setState(state, cb);
    const {
      workersInfo,
      kilnInfo,
      user,
      offlineWorkers,
      ngos,
      pageRefreshed,
    } = this.state;

    localStorage.setItem(
      "app-data",
      JSON.stringify({
        pageRefreshed,
        workersInfo,
        kilnInfo,
        user,
        offlineWorkers,
        ngos,
      })
    );
  };

  //**********Add new values to state******//

  KilnNewStatefunc = (newState) => {
    this.hookState({ sortedkilnInfo: newState, kilnInfo: newState });
  };

  WorkerNewStatefunc = (newState) => {
    this.hookState({ workersInfo: newState, sortedWorkersInfo: newState });
  };

  WorkerEditStatefunc = (worker) => {
    const workersInfo = this.state.workersInfo;
    const idx = workersInfo.findIndex((e) => e.id === worker.id);
    if (idx > -1) {
      workersInfo.splice(idx, 1, worker);
      this.hookState({ workersInfo, sortedWorkersInfo: workersInfo });
    }
  };

  WorkerEditPaymentFunc = (worker) => {
    this.state.offlineWorkers[worker.id] = worker;
    this.hookState({ offlineWorkers: this.state.offlineWorkers });
  };

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
      searchbycode,
      searchbypaidstatus,
      searchbyngo,
    } = this.state;
    let tempWorkersInfo = [...workersInfo];
    if (searchbyworkername !== "") {
      const search = searchbyworkername.toLowerCase();
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        const name = `${worker.f_name.toLowerCase()} ${worker.l_name.toLowerCase()}`;
        return name.includes(search);
      });
    }

    if (searchbycode !== "") {
      const search = searchbycode.toLowerCase();
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return worker.code.toLowerCase().includes(search);
      });
    }

    if (searchbynaike_f_name !== "") {
      const search = searchbynaike_f_name.toLowerCase();
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return (
          worker.naike_name && worker.naike_name.toLowerCase().includes(search)
        );
      });
    }

    if (gender !== "All") {
      const search = gender.toLowerCase();
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return worker.gender && worker.gender.toLowerCase().startsWith(search);
      });
    }

    if (searchbydistrict !== "All") {
      const search = searchbydistrict.toLowerCase();
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return worker.district.toLowerCase().includes(search);
      });
    }

    if (searchbymunicipality !== "All") {
      const search = searchbymunicipality.toLowerCase();
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return (
          worker.municipality &&
          worker.municipality.toLowerCase().includes(search)
        );
      });
    }

    if (searchbyworkercategory !== "All") {
      const search = searchbyworkercategory.toLowerCase();
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return (
          worker.category && worker.category.toLowerCase().includes(search)
        );
      });
    }

    if (kname !== "All") {
      const search = kname.toLowerCase();
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return worker.kiln.name.toLowerCase() === search;
      });
    }

    if (searchbypaidstatus == "paid") {
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return (
          worker.extra &&
          (worker.extra.payment || worker.extra.payment.amount > 0)
        );
      });
    } else if (searchbypaidstatus == "unpaid") {
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return worker.extra == null;
      });
    } else {
      tempWorkersInfo = tempWorkersInfo;
    }

    if (searchbyngo !== "All") {
      const search = searchbyngo.toLowerCase();
      tempWorkersInfo = tempWorkersInfo.filter((worker) => {
        return (
          worker.extra &&
          worker.extra.payment &&
          worker.extra.payment.amountpayer.ngo.name
            .toLowerCase()
            .includes(search)
        );
      });
    }

    this.hookState({ sortedWorkersInfo: tempWorkersInfo }, () => {
      this.CsvWorkerDataFunc();
    });
  };

  //**********Filter func for kiln*************//

  filterKilnData = () => {
    const { kilnInfo, searchbykiln } = this.state;

    let tempkilnInfo = [...kilnInfo];

    if (searchbykiln !== "") {
      const search = searchbykiln.toLowerCase();
      tempkilnInfo = tempkilnInfo.filter((kiln) => {
        return kiln.name.toLowerCase().includes(search);
      });
    }

    this.hookState({ sortedkilnInfo: tempkilnInfo }, () =>
      this.CsvKilnDataFunc()
    );
  };

  ReduceKeyValFunc = (s) => {
    let data = {};

    for (var [k, v] of Object.entries(s)) {
      const amount = v.reduce((acc, cur) => {
        if (cur.extra !== null) {
          acc = acc + parseInt(cur.extra.amount);
          return acc;
        }
        return acc;
      }, 0);

      var xy = v.reduce((acc, cur) => {
        acc[k] = { peoplecount: v.length, totalamount: amount };
        return acc;
      }, {});

      data = { ...data, ...xy };
    }
    return data;
  };

  clone = (v) => {
    return JSON.parse(JSON.stringify(v));
  };

  CsvWorkerDataFunc = () => {
    const { sortedWorkersInfo } = this.state;

    const data = this.clone(sortedWorkersInfo).map((item) => {
      item.kilnname = item.kiln.name;
      item.kilnaddress = item.kiln.address;

      if (item.extra !== null) {
        item.amountpaid = item.extra.payment.amount;
        item.amountpayer = item.extra.payment.amountpayer.username;
        item.amountpaiddate = item.extra.payment.timeofpay
      }

      if (item.children !== null) {
        item.children = item.children.map((e) => e.join("/")).join(",");
      }
      delete item["kiln"];
      return item;
    });

    this.setState({ csvData: data });
  };

  CsvKilnDataFunc = () => {
    const { sortedkilnInfo } = this.state;

    const data = this.clone(sortedkilnInfo).map((item) => {
      return item;
    });

    this.setState({ csvKilnData: data });
  };

  OpenNavMenu = () => {
    this.hookState({ mobileNav: true });
  };

  CloseNavMenu = () => {
    this.hookState({ mobileNav: false });
  };

  filterById = (id, arr) => {
    let filteredList = arr.filter((item) => {
      return item.id !== id;
    });
    return filteredList;
  };

  deleteWorker = (id) => {
    Axiosapi({
      method: "DELETE",
      url: `workers/${id}`,
    })
      .then((res) => {
        if (res.status === 204 && res.statusText === "No Content") {
          this.hookState({
            alertData: { type: "success", msg: "Worker deleted successfully" },
          });
          let filteredWorker = this.filterById(id, this.state.workersInfo);
          this.hookState({
            workersInfo: filteredWorker,
            sortedWorkersInfo: filteredWorker,
            searchbyworkername: "",
            gender: "All",
            searchbydistrict: "All",
            searchbymunicipality: "All",
            searchbyworkercategory: "All",
            searchbynaike_f_name: "",
            searchbykilnname: "",
          });
        }
      })
      .catch((err) => {
        this.hookState({
          alertData: {
            type: "error",
            msg: "Something went wrong. Please try again.",
          },
        });
      });
  };

  deleteKiln = (id) => {
    Axiosapi({
      method: "DELETE",
      url: `kiln/${id}`,
    })
      .then((res) => {
        if (res.status === 204 && res.statusText === "No Content") {
          this.hookState({
            alertData: { type: "success", msg: "Kiln deleted successfully" },
          });
          let filteredKiln = this.filterById(id, this.state.kilnInfo);
          this.hookState({
            kilnInfo: filteredKiln,
            sortedkilnInfo: filteredKiln,
            searchbykiln: "",
          });
        }
      })
      .catch((err) => {
        this.hookState({
          alertData: {
            type: "error",
            msg: "Something went wrong. Please try again.",
          },
        });
      });
  };

  isSuperUser = () => {
    return navigator.onLine && this.state.user && this.state.user.is_superuser;
  };

  isSuperUserSummary = () => {
    return this.state.user && this.state.user.is_superuser;
  };

  OpenModal = (worker) => {
    this.setState({ ModalStatus: true, ModalData: worker });
  };

  CloseModal = (id) => {
    this.hookState({ ModalData: null });
    this.filterAllOptions();
  };

  AlertFunc = (res) => {
    this.hookState({ alertData: res });
  };

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
          deleteKiln: this.deleteKiln,
          fetchAllData: this.fetchAllData,
          KilnNewStatefunc: this.KilnNewStatefunc,
          WorkerNewStatefunc: this.WorkerNewStatefunc,
          WorkerEditStatefunc: this.WorkerEditStatefunc,
          OpenModal: this.OpenModal,
          CloseModal: this.CloseModal,
          AlertFunc: this.AlertFunc,
          isSuperUser: this.isSuperUser,
          WorkerEditPaymentFunc: this.WorkerEditPaymentFunc,
          CsvWorkerDataFunc: this.CsvWorkerDataFunc,
          CsvKilnDataFunc: this.CsvKilnDataFunc,
          cancelPayment: this.cancelPayment,
          filterAllOptions: this.filterAllOptions,
          isSuperUserSummary: this.isSuperUserSummary,
          isOnline: this.isOnline,
          refreshCache: this.refreshCache,
          supportServiceWorker:this.supportServiceWorker
        }}
      >
        {this.props.children}
      </myContext.Provider>
    );
  }
}
const ContextConsumer = myContext.Consumer;
export { ContextProvider, myContext, ContextConsumer };
