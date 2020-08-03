(this.webpackJsonpuserdetailtracer=this.webpackJsonpuserdetailtracer||[]).push([[0],{116:function(e,a,t){e.exports=t(145)},121:function(e,a,t){},145:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(9),i=t.n(l),o=(t(121),t(27)),c=(t(51),t(21)),m=t(16),s=t(14),u=t(10),d=t(58),p=t.n(d),h=p.a.create({baseURL:"http://127.0.0.1:8000/api"}),f=t(29),E=t(30),g=t(35),b=t(34),v=r.a.createContext(),k=function(e){Object(g.a)(t,e);var a=Object(b.a)(t);function t(){var e;Object(f.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=a.call.apply(a,[this].concat(r))).state={workersInfo:[],sortedWorkersInfo:[],singleWorkerInfo:"",editWorkerInfoId:"",kilnInfo:[],sortedkilnInfo:[],kname:"All",gender:"All",searchbyworkername:"",searchbycountry:"",searchbydistrict:"",searchbymunicipality:"",searchbyward:"",searchbyworkercategory:"",searchbynaikename:"",searchbykilnname:"",mobileNav:!1,searchbykiln:"",searchbykilnlocation:"",searchbykilnowner:"",ModalStatus:!1,ModalData:[],alertData:null,csrftoken:""},e.fetchAllData=function(){h.get("workers").then((function(a){e.hookState({workersInfo:a.data,sortedWorkersInfo:a.data})})).catch((function(e){return console.log(e)})),h.get("kiln").then((function(a){e.hookState({kilnInfo:a.data,sortedkilnInfo:a.data})})).catch((function(e){return console.log(e)}))},e.hookState=function(a){e.setState(a),console.log(a)},e.getCookie=function(e){var a=null;if(document.cookie&&""!==document.cookie)for(var t=document.cookie.split(";"),n=0;n<t.length;n++){var r=t[n].trim();if(r.substring(0,e.length+1)===e+"="){a=decodeURIComponent(r.substring(e.length+1));break}}return console.log(a),a},e.KilnNewStatefunc=function(a){console.log(a),e.hookState({sortedkilnInfo:a,kilnInfo:a})},e.WorkerNewStatefunc=function(a){e.hookState({workersInfo:a,sortedWorkersInfo:a})},e.WorkerEditStatefunc=function(a){var t=e.state.workersInfo,n=t.findIndex((function(e){return e.id===a.id}));n>-1&&(t.splice(n,1,a),e.hookState({workersInfo:t,sortedWorkersInfo:t}))},e.ChangeOptionFilter=function(a){var t=a.target.value,n=a.target.name;console.log(t,n),e.hookState(Object(m.a)({},n,t),(function(){e.filterAllOptions(),e.filterKilnData()}))},e.filterAllOptions=function(){var a=e.state,t=a.kname,n=a.workersInfo,r=a.gender,l=a.searchbyworkername,i=a.searchbydistrict,o=a.searchbymunicipality,m=a.searchbyward,s=a.searchbyworkercategory,u=a.searchbynaikename,d=a.searchbykilnname,p=Object(c.a)(n);"All"!==t&&(p=p.filter((function(e){return e.kiln.name===t}))),"All"!==r&&(p=p.filter((function(e){return e.gender.startsWith(r.toUpperCase())}))),null!==l&&(p=p.filter((function(e){return e.f_name.includes(l.toUpperCase())}))),null!==i&&(p=p.filter((function(e){return e.district.includes(i.toUpperCase())}))),null!==o&&(p=p.filter((function(e){return e.municipality.includes(o.toUpperCase())}))),null!==m&&(p=p.filter((function(e){return e.ward.includes(m.toUpperCase())}))),null!==s&&(p=p.filter((function(e){return e.workercategory.includes(s.toUpperCase())}))),null!==u&&(p=p.filter((function(e){return e.naikename.includes(u.toUpperCase())}))),null!==d&&(p=p.filter((function(e){return e.kiln.name.includes(d.toUpperCase())}))),e.hookState({sortedWorkersInfo:p})},e.filterKilnData=function(){var a=e.state,t=a.kilnInfo,n=a.searchbykiln,r=a.searchbykilnlocation,l=Object(c.a)(t);null!==n&&(l=l.filter((function(e){return e.name.includes(n.toUpperCase())}))),null!==r&&(l=l.filter((function(e){return e.address.includes(r.toUpperCase())}))),e.hookState({sortedkilnInfo:l})},e.OpenNavMenu=function(){e.hookState({mobileNav:!0})},e.CloseNavMenu=function(){e.hookState({mobileNav:!1})},e.filterByIdworker=function(a){return e.state.workersInfo.filter((function(e){return e.id!==a}))},e.filterByIdkiln=function(a){return e.state.kilnInfo.filter((function(e){return e.id!==a}))},e.deleteWorker=function(a){h({method:"DELETE",url:"workers/".concat(a)}).then((function(t){if(204===t.status&&"No Content"===t.statusText){e.hookState({alertData:{type:"success",msg:"Worker deleted successfully"}});var n=e.filterByIdworker(a);e.hookState({workersInfo:n,sortedWorkersInfo:n}),console.log("deleting ok finished")}})).catch((function(a){e.hookState({alertData:{type:"error",msg:"Something went wrong. Please try again."}})}))},e.deleteKiln=function(a){h({method:"DELETE",url:"kiln/".concat(a)}).then((function(t){if(204===t.status&&"No Content"===t.statusText){e.hookState({alertData:{type:"success",msg:"Kiln deleted successfully"}});var n=e.filterByIdkiln(a);e.hookState({kilnInfo:n,sortedkilnInfo:n}),console.log("deleting ok finished")}})).catch((function(a){e.hookState({alertData:{type:"error",msg:"Something went wrong. Please try again."}})}))},e.OpenModal=function(a){var t=e.state.workersInfo.filter((function(e){return e.id===a}));e.hookState({ModalStatus:!0,ModalData:t})},e.CloseModal=function(a){e.hookState({ModalStatus:!1})},e.AlertFunc=function(a){e.hookState({alertData:a})},e}return Object(E.a)(t,[{key:"componentDidMount",value:function(){var e=this.getCookie("csrftoken");console.log(e,"Here"),this.hookState({csrftoken:e}),this.fetchAllData()}},{key:"render",value:function(){return console.log(this.state.alertData),r.a.createElement(v.Provider,{value:Object(s.a)(Object(s.a)({},this.state),{},{ChangeOptionFilter:this.ChangeOptionFilter,SearchWorkerName:this.SearchWorkerName,EditWorker:this.EditWorker,OpenNavMenu:this.OpenNavMenu,CloseNavMenu:this.CloseNavMenu,deleteWorker:this.deleteWorker,deleteKiln:this.deleteKiln,fetchAllData:this.fetchAllData,KilnNewStatefunc:this.KilnNewStatefunc,WorkerNewStatefunc:this.WorkerNewStatefunc,WorkerEditStatefunc:this.WorkerEditStatefunc,OpenModal:this.OpenModal,CloseModal:this.CloseModal,AlertFunc:this.AlertFunc})},this.props.children)}}]),t}(n.Component),y=(v.Consumer,t(191)),I=t(174),w=t(175),C=t(179),W=t(172),S=t(192),O=t(190),N=t(178),x=t(187),j=function(e){var a=e.title;e.children;return r.a.createElement("div",{className:"title"},r.a.createElement("p",null,a),r.a.createElement("div",null))},A=Object(W.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)},formControl:{minWidth:120}}})),L=function(e){var a=e.SubmitHandler,t=e.valuea,n=e.InputHandler,l=e.kilnlist,i=e.InputHandlerKiln,o=A(),c=l.map((function(e){return r.a.createElement(O.a,{value:e.id},e.name)}));return r.a.createElement(I.a,{maxWidth:"sm",component:"main"},r.a.createElement("div",{className:o.paper},r.a.createElement(j,{title:"Add Worker"}),r.a.createElement("form",{className:o.form,action:"",onSubmit:a},r.a.createElement(w.a,{container:!0,spacing:2},r.a.createElement(w.a,{item:!0,xs:12,sm:6},r.a.createElement(y.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"f_name",value:t.f_name,onChange:n,id:"standard-basic",label:"Enter firstname",InputLabelProps:{shrink:!0}})),r.a.createElement(w.a,{item:!0,xs:12,sm:6},r.a.createElement(y.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"l_name",value:t.l_name,onChange:n,id:"standard-basic",label:"Enter lastname",InputLabelProps:{shrink:!0}})),r.a.createElement(w.a,{item:!0,xs:12,sm:6},r.a.createElement(y.a,{variant:"outlined",required:!0,fullWidth:!0,margin:"normal",name:"naikename",value:t.naikename,onChange:n,id:"standard-basic",label:"Enter naikename",InputLabelProps:{shrink:!0}})),r.a.createElement(w.a,{item:!0,xs:12,sm:6},r.a.createElement(y.a,{variant:"outlined",required:!0,fullWidth:!0,margin:"normal",name:"naikelastname",value:t.naikelastname,onChange:n,id:"standard-basic",label:"Enter naikelastname",InputLabelProps:{shrink:!0}})),r.a.createElement(w.a,{item:!0,xs:12,sm:6},r.a.createElement(y.a,{variant:"outlined",required:!0,fullWidth:!0,margin:"normal",name:"age",value:t.age,onChange:n,id:"standard-basic",label:"Enter age",InputLabelProps:{shrink:!0}})),r.a.createElement(w.a,{item:!0,xs:12,sm:6},r.a.createElement(y.a,{variant:"outlined",required:!0,fullWidth:!0,margin:"normal",name:"country",value:t.country,onChange:n,id:"standard-basic",label:"Enter country",InputLabelProps:{shrink:!0}})),r.a.createElement(w.a,{item:!0,xs:12,sm:6},r.a.createElement(y.a,{variant:"outlined",required:!0,fullWidth:!0,margin:"normal",name:"district",value:t.district,onChange:n,id:"standard-basic",label:"Enter district",InputLabelProps:{shrink:!0}})),r.a.createElement(w.a,{item:!0,xs:12,sm:6},r.a.createElement(y.a,{variant:"outlined",required:!0,fullWidth:!0,margin:"normal",name:"municipality",value:t.municipality,onChange:n,id:"standard-basic",label:"Enter municipality",InputLabelProps:{shrink:!0}})),r.a.createElement(w.a,{item:!0,xs:12,sm:6},r.a.createElement(y.a,{variant:"outlined",required:!0,fullWidth:!0,margin:"normal",name:"ward",value:t.ward,onChange:n,id:"standard-basic",label:"Enter ward",InputLabelProps:{shrink:!0}})),r.a.createElement(w.a,{item:!0,xs:12,sm:6},r.a.createElement(y.a,{variant:"outlined",required:!0,fullWidth:!0,margin:"normal",name:"workercategory",value:t.workercategory,onChange:n,id:"standard-basic",label:"Enter workercategory",InputLabelProps:{shrink:!0}})),r.a.createElement(w.a,{item:!0,xs:12,sm:12},r.a.createElement(y.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"phone",value:t.phone,onChange:n,id:"standard-basic",label:"Enter phone",InputLabelProps:{shrink:!0}})),r.a.createElement(w.a,{item:!0,xs:12,sm:12},r.a.createElement(N.a,{variant:"outlined",fullWidth:!0,className:o.formControl},r.a.createElement(S.a,{id:"demo-simple-select-outlined-label"},"Gender"),r.a.createElement(x.a,{labelId:"demo-simple-select-outlined-label",id:"demo-simple-select-outlined",value:t.gender,name:"gender",onChange:n,label:"gender",InputLabelProps:{shrink:!0}},r.a.createElement(O.a,{value:"MALE"},"Male"),r.a.createElement(O.a,{value:"FEMALE"},"Female"),r.a.createElement(O.a,{value:"OTHERS"},"Others")))),r.a.createElement(w.a,{item:!0,xs:12,sm:12},r.a.createElement(N.a,{variant:"outlined",fullWidth:!0,className:o.formControl},r.a.createElement(S.a,{id:"demo-simple-select-outlined-label"},"Kiln Name"),r.a.createElement(x.a,{labelId:"demo-simple-select-outlined-label",id:"demo-simple-select-outlined",value:t.kiln_id,name:"kiln_id",onChange:i,label:"kiln",InputLabelProps:{shrink:!0}},c)))),r.a.createElement(C.a,{className:o.submit,fullWidth:!0,type:"submit",variant:"contained",color:"primary"},"Submit"))))},M=function(){var e=Object(n.useContext)(v),a=e.workersInfo,t=e.WorkerNewStatefunc,l=e.kilnInfo,i=e.alertData,d=e.AlertFunc,p=function(){var e=localStorage.getItem("item");return e&&e.length>10}(),f=Object(n.useState)({f_name:"qwe",l_name:"qweq",naikename:"qweqe",naikelastname:"ertert",gender:"MALE",age:123,country:"nepal",district:"adsa",municipality:"asdad",ward:"ad",workercategory:"adsad",phone:234234,salary:500,kiln_id:1}),E=Object(o.a)(f,2),g=E[0],b=E[1],k=Object(n.useState)(a),y=Object(o.a)(k,2),I=y[0],w=y[1],C=Object(n.useState)(i),W=Object(o.a)(C,2),S=W[0],O=W[1];Object(n.useEffect)((function(){t(Object(c.a)(I))}),[I]),Object(n.useEffect)((function(){d(S)}),[S]);return r.a.createElement("div",null,p?r.a.createElement("div",null,r.a.createElement(L,{kilnlist:l,InputHandlerKiln:function(e){var a=e.target.name,t=e.target.value;b((function(e){return console.log(e,a,t),Object(s.a)(Object(s.a)({},e),{},Object(m.a)({},a,t))}))},InputHandler:function(e){var a=e.target.name,t=e.target.value;t=t.toUpperCase(),b((function(e){return Object(s.a)(Object(s.a)({},e),{},Object(m.a)({},a,t))}))},SubmitHandler:function(e){e.preventDefault(),h({method:"POST",url:"workers/",data:g}).then((function(e){g.id=e.data.id,g.kiln=l.find((function(e){return e.id===g.kiln_id})),w([].concat(Object(c.a)(I),[g])),201===e.status&&"Created"===e.statusText&&O({type:"success",msg:"Worker saved"})})).catch((function(e){O({type:"error",msg:"Something went wrong. Please try again."})}))},valuea:g})):r.a.createElement(u.a,{to:{pathname:"/login"}}))},P=function(){return r.a.createElement("div",null,r.a.createElement(M,null))},H=t(188),D=t(194),q=t(149),T=t(180),K=t(147),_=t(67),B=t.n(_),F=function(e){Object(g.a)(t,e);var a=Object(b.a)(t);function t(){var e;Object(f.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=a.call.apply(a,[this].concat(r))).state={userInfo:{username:"",first_name:"",last_name:"",email:"",password:""}},e.InputHandle=function(a){var t=a.target.value,n=a.target.name;console.log(t,n),e.setState((function(e){return Object(s.a)(Object(s.a)({},e),{},Object(m.a)({},n,t))}))},e.login=function(a){a.preventDefault(),p()({method:"POST",url:"http://127.0.0.1:8000/auth/",data:e.state}).then((function(a){localStorage.setItem("item",JSON.stringify(a.data.token)),e.setState({})})).catch((function(e){return console.log(e)}))},e.isAuthenticated=function(){var e=localStorage.getItem("item");return e&&e.length>10},e}return Object(E.a)(t,[{key:"render",value:function(){var e=this.isAuthenticated(),a=this.props.classes;return r.a.createElement("div",null,e?r.a.createElement(u.a,{to:{pathname:"/workers"}}):r.a.createElement(I.a,{maxWidth:"sm",component:"main"},r.a.createElement(H.a,{component:"div",mt:10},r.a.createElement("div",{className:a.paper},r.a.createElement(H.a,{component:"div",my:1},r.a.createElement(D.a,{className:a.avatar},r.a.createElement(B.a,null))),r.a.createElement(H.a,{component:"div",mb:2},r.a.createElement(q.a,{component:"h1",variant:"h5"},"Login")),r.a.createElement("form",{className:a.form,onSubmit:this.login},r.a.createElement(w.a,{container:!0,spacing:2},r.a.createElement(w.a,{item:!0,xs:12},r.a.createElement(y.a,{autoComplete:"username",variant:"outlined",required:!0,fullWidth:!0,name:"username",value:this.state.username,onChange:this.InputHandle,id:"userName",label:"User Name",autoFocus:!0})),r.a.createElement(w.a,{item:!0,xs:12},r.a.createElement(y.a,{variant:"outlined",required:!0,fullWidth:!0,value:this.state.password,onChange:this.InputHandle,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password"}))),r.a.createElement(H.a,{component:"div",my:3},r.a.createElement(C.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:a.submit},"Login"))),r.a.createElement(w.a,{container:!0,justify:"flex-end"},r.a.createElement(w.a,{item:!0},r.a.createElement(T.a,{href:"/register",variant:"body2"},"Need an account? Register")))))))}}]),t}(r.a.Component),U=Object(K.a)((function(e){return{paper:{display:"flex",flexDirection:"column",alignItems:"center"},avatar:{backgroundColor:"#3f51b5"},form:{width:"100%"},submit:{}}}))(F),z=function(){return r.a.createElement("div",null,"hello from error page")},R=function(e){Object(g.a)(t,e);var a=Object(b.a)(t);function t(){var e;Object(f.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=a.call.apply(a,[this].concat(r))).state={userInfo:{username:"",first_name:"",last_name:"",email:"",password:""}},e.register=function(a){a.preventDefault(),h({method:"POST",url:"users/",data:e.state}).then((function(e){console.log(e)})).catch((function(e){return console.log(e)}))},e.InputHandle=function(a){var t=a.target.value,n=a.target.name;console.log(t,n),e.setState(Object(m.a)({},n,t))},e}return Object(E.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",null,r.a.createElement(I.a,{maxWidth:"sm",component:"main"},r.a.createElement(H.a,{component:"div",mt:5},r.a.createElement("div",{className:e.paper},r.a.createElement(H.a,{component:"div",my:1},r.a.createElement(D.a,{className:e.avatar},r.a.createElement(B.a,null))),r.a.createElement(H.a,{component:"div",mb:2},r.a.createElement(q.a,{component:"h1",variant:"h5"},"Register")),r.a.createElement("form",{className:e.form,onSubmit:this.register},r.a.createElement(w.a,{container:!0,spacing:2},r.a.createElement(w.a,{item:!0,xs:12,sm:6},r.a.createElement(y.a,{autoComplete:"username",variant:"outlined",required:!0,fullWidth:!0,name:"username",value:this.state.username,onChange:this.InputHandle,id:"userName",label:"User Name",autoFocus:!0})),r.a.createElement(w.a,{item:!0,xs:12,sm:6},r.a.createElement(y.a,{autoComplete:"fname",variant:"outlined",required:!0,fullWidth:!0,name:"first_name",value:this.state.first_name,onChange:this.InputHandle,id:"firstName",label:"First Name",autoFocus:!0})),r.a.createElement(w.a,{item:!0,xs:12,sm:6},r.a.createElement(y.a,{autoComplete:"lname",variant:"outlined",required:!0,fullWidth:!0,name:"last_name",value:this.state.last_name,onChange:this.InputHandle,id:"lastName",label:"Last Name",autoFocus:!0})),r.a.createElement(w.a,{item:!0,xs:12,sm:6},r.a.createElement(y.a,{variant:"outlined",required:!0,fullWidth:!0,value:this.state.email,onChange:this.InputHandle,id:"email",label:"Email Address",name:"email",autoComplete:"email"})),r.a.createElement(w.a,{item:!0,xs:12},r.a.createElement(y.a,{variant:"outlined",required:!0,fullWidth:!0,value:this.state.password,onChange:this.InputHandle,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password"})),r.a.createElement(w.a,{item:!0,xs:12,sm:12})),r.a.createElement(H.a,{component:"div",my:3},r.a.createElement(C.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:e.submit},"Register"))),r.a.createElement(w.a,{container:!0,justify:"flex-end"},r.a.createElement(w.a,{item:!0},r.a.createElement(T.a,{href:"/login",variant:"body2"},"Already have an account? Login")))))))}}]),t}(r.a.Component),G=Object(K.a)((function(e){return{paper:{display:"flex",flexDirection:"column",alignItems:"center"},avatar:{backgroundColor:"#3f51b5"},form:{width:"100%"},submit:{}}}))(R),J=t(13),Y=function(){return localStorage.removeItem("item"),r.a.createElement("div",{className:"logoutSection"},r.a.createElement("div",{className:"logoutIn"},r.a.createElement("h2",null,"You have been successfully logged out."),r.a.createElement(J.b,{to:"/login"},r.a.createElement(C.a,{variant:"contained",color:"primary"},"Login Again"))))},$=t(181),Q=t(182),V=Object(W.a)({root:{minWidth:275},title:{fontSize:14},pos:{marginBottom:8},buttonMargin:{marginTop:15,marginRight:15}}),X=function(e){var a=e.worker,t=Object(n.useContext)(v),l=t.deleteWorker,i=t.OpenModal,o=V();return r.a.createElement(w.a,{item:!0,xs:12,sm:6,md:4},r.a.createElement($.a,{className:o.root},r.a.createElement(Q.a,null,r.a.createElement(q.a,{gutterBottom:!0,variant:"h5",component:"h2"},a.f_name," ",a.l_name),r.a.createElement(q.a,{className:o.pos,variant:"body1",component:"p"},"Worker Category: ",a.workercategory),r.a.createElement(q.a,{className:o.pos,variant:"body1",component:"p"},"Naike Name: ",a.naikename),r.a.createElement(q.a,{className:o.pos,variant:"body1",component:"p"},"Gender: ",a.gender),r.a.createElement(q.a,{className:o.pos,variant:"body1",component:"p"},"Age: ",a.age),r.a.createElement(q.a,{className:o.pos,variant:"body1",component:"p"},"Country: ",a.country),r.a.createElement(q.a,{className:o.pos,variant:"body1",component:"p"},"District: ",a.district),r.a.createElement(q.a,{className:o.pos,variant:"body1",component:"p"},"Municipality: ",a.municipality),r.a.createElement(q.a,{className:o.pos,variant:"body1",component:"p"},"Ward: ",a.ward),r.a.createElement(q.a,{className:o.pos,variant:"body1",component:"p"},"Phone: ",a.phone),r.a.createElement(q.a,{className:o.pos,variant:"body1",component:"p"},"Kiln: ",a.kiln.name),r.a.createElement(J.b,{to:"workers/".concat(a.id)},r.a.createElement(C.a,{className:o.buttonMargin,variant:"contained",color:"primary"},"Edit")),r.a.createElement(C.a,{onClick:function(){return l(a.id)},className:o.buttonMargin,variant:"contained",color:"secondary"},"Delete"),r.a.createElement(C.a,{onClick:function(){return i(a.id)},variant:"contained",color:"secondary",className:o.buttonMargin},"Payment"))))},Z=t(68),ee=t.n(Z),ae=Object(W.a)((function(e){return{formControl:{margin:e.spacing(1),minWidth:120},selectEmpty:{marginTop:e.spacing(2)},inputSection:{width:"90%",margin:"auto"}}})),te=function(){var e=ae(),a=Object(n.useContext)(v),t=a.workersInfo,l=a.kname,i=a.gender,o=a.searchbyworkername,m=a.ChangeOptionFilter,s=a.searchbydistrict,u=a.searchbymunicipality,d=a.searchbyward,p=a.searchbyworkercategory,h=a.searchbynaikename,f=a.searchbykilnname,E=t.map((function(e){return e.kiln.name})),g=[].concat(Object(c.a)(new Set(E)),["All"]).map((function(e,a){return r.a.createElement("option",{key:a,value:e},e)}));return r.a.createElement("div",null,r.a.createElement("div",{className:e.inputSection},r.a.createElement(w.a,{container:!0,spacing:4},r.a.createElement(w.a,{item:!0,xs:12,sm:6,md:4},r.a.createElement(y.a,{fullWidth:!0,label:"Search by name",id:"outlined-size-small",name:"searchbyworkername",value:o,onChange:m,variant:"outlined"})),r.a.createElement(w.a,{item:!0,xs:12,sm:6,md:4},r.a.createElement(y.a,{fullWidth:!0,label:"Search by workercategory",id:"outlined-size-normal",name:"searchbyworkercategory",value:p,onChange:m,variant:"outlined"})),r.a.createElement(w.a,{item:!0,xs:12,sm:6,md:4},r.a.createElement(y.a,{fullWidth:!0,label:"Search by naikename",id:"outlined-size-normal",name:"searchbynaikename",value:h,onChange:m,variant:"outlined"})),r.a.createElement(w.a,{item:!0,xs:12,sm:6,md:4},r.a.createElement(y.a,{fullWidth:!0,label:"Search by district",id:"outlined-size-normal",name:"searchbydistrict",value:s,onChange:m,variant:"outlined"})),r.a.createElement(w.a,{item:!0,xs:12,sm:6,md:4},r.a.createElement(y.a,{fullWidth:!0,label:"Search by municipality",id:"outlined-size-normal",name:"searchbymunicipality",value:u,onChange:m,variant:"outlined"})),r.a.createElement(w.a,{item:!0,xs:12,sm:6,md:4},r.a.createElement(y.a,{fullWidth:!0,label:"Search by ward",id:"outlined-size-normal",name:"searchbyward",value:d,onChange:m,variant:"outlined"})),r.a.createElement(w.a,{item:!0,xs:12,sm:6,md:4},r.a.createElement(y.a,{fullWidth:!0,label:"Search by kilnname",id:"outlined-size-normal",name:"searchbykilnname",value:f,onChange:m,variant:"outlined"})),r.a.createElement(w.a,{item:!0},r.a.createElement(N.a,{variant:"outlined",className:e.formControl},r.a.createElement(S.a,{id:"demo-simple-select-outlined-label"},"By Kiln Name"),r.a.createElement(x.a,{labelId:"demo-simple-select-outlined-label",id:"demo-simple-select-outlined",name:"kname",value:l,onChange:m,label:"Kilnname"},g))),r.a.createElement(w.a,{item:!0},r.a.createElement(N.a,{variant:"outlined",className:e.formControl},r.a.createElement(S.a,{id:"demo-simple-select-outlined-label"},"By Gender"),r.a.createElement(x.a,{labelId:"demo-simple-select-outlined-label",id:"demo-simple-select-outlined",name:"gender",value:i,onChange:m,label:"Gender"},r.a.createElement(O.a,{value:"All"},"All"),r.a.createElement(O.a,{value:"Male"},"Male"),r.a.createElement(O.a,{value:"Female"},"Female"),r.a.createElement(O.a,{value:"Others"},"Others")))))))},ne=Object(W.a)((function(e){return{pos:{marginTop:30,width:"90%",margin:"auto"},addIcon:{width:"90%",marginTop:30,margin:"auto",display:"flex",alignItems:"center",color:"primary"},AddIconLink:{display:"flex",alignItems:"center",textDecoration:"none"}}})),re=function(){var e=ne(),a=function(){var e=localStorage.getItem("item");return e&&e.length>10}(),t=Object(n.useContext)(v).sortedWorkersInfo;console.log(t);var l=t.map((function(e){return r.a.createElement(X,{worker:e,key:e.id})}));return r.a.createElement("div",null,a?r.a.createElement("div",null,r.a.createElement("span",{className:e.addIcon},r.a.createElement(J.b,{to:"/",className:e.AddIconLink},r.a.createElement(ee.a,{color:"primary",fontSize:"large"}),r.a.createElement(q.a,{className:"addnewWorker",color:"primary",component:"h1",variant:"h6"},"Add new worker"))),r.a.createElement(j,{title:"Workers List"}),r.a.createElement(te,null),r.a.createElement("div",{className:e.pos},r.a.createElement(w.a,{container:!0,spacing:2},l))):r.a.createElement(u.a,{to:{pathname:"/login"}}))},le=t(183),ie=t(184),oe=t(96),ce=t.n(oe),me=t(97),se=t.n(me),ue=function(){var e=Object(n.useContext)(v),a=e.mobileNav,t=e.CloseNavMenu,l=e.OpenNavMenu,i=function(){var e=localStorage.getItem("item");return e&&e.length>10}();return r.a.createElement("div",null,r.a.createElement(le.a,{position:"static"},r.a.createElement(ie.a,{className:"nav"},r.a.createElement("div",{className:"navLeft"},r.a.createElement(q.a,{edge:"start",className:"logoTitle",variant:"h6"},"Better Brick Nepal"),r.a.createElement("div",{className:"burgerBar"},a?r.a.createElement(ce.a,{onClick:function(){return t()}}):r.a.createElement(se.a,{onClick:function(){return l()}}))),r.a.createElement("div",{className:a?"navRight hide":"navRight"},r.a.createElement(J.b,{to:"/kilnlist"},r.a.createElement(C.a,{className:"loginButton"},"Kiln")),r.a.createElement(J.b,{to:"/workers"},r.a.createElement(C.a,{className:"loginButton"},"Workers")),r.a.createElement("div",null,i?r.a.createElement("span",null,r.a.createElement(J.b,{to:"/logout"},r.a.createElement(C.a,{className:"loginButton"},"Logout"))):r.a.createElement("span",null,r.a.createElement(J.b,{to:"/login"},r.a.createElement(C.a,{className:"loginButton",variant:"h6"},"Login"))))))))},de=Object(W.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},form:{width:"100%",marginTop:e.spacing(1),textAlign:"center"},submit:{margin:e.spacing(3,0,2)}}})),pe=function(e){var a=e.InputHandler,t=e.SubmitHandler,n=e.valuea,l=de();return r.a.createElement(I.a,{component:"main",maxWidth:"sm"},r.a.createElement("div",{className:l.paper},r.a.createElement(j,{title:"Add Kiln"}),r.a.createElement("form",{className:l.form,action:"",onSubmit:t},r.a.createElement(w.a,{container:!0,spacing:1},r.a.createElement(w.a,{item:!0,xs:12},r.a.createElement(y.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"name",value:n.name,onChange:a,id:"standard-basic",label:"Enter kilnname"})),r.a.createElement(w.a,{item:!0,xs:12},r.a.createElement(y.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"address",value:n.address,onChange:a,id:"standard-basic",label:"Enter kilnaddress"}))),r.a.createElement(C.a,{className:l.submit,fullWidth:!0,type:"submit",variant:"contained",color:"primary"},"Submit"))))},he=Object(W.a)((function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(200)}}}})),fe=function(){he();var e=Object(n.useContext)(v),a=e.KilnNewStatefunc,t=e.kilnInfo,l=e.alertData,i=e.AlertFunc,d=Object(n.useState)(t),p=Object(o.a)(d,2),f=p[0],E=p[1],g=Object(n.useState)({name:"",address:""}),b=Object(o.a)(g,2),k=b[0],y=b[1],I=Object(n.useState)(l),w=Object(o.a)(I,2),C=w[0],W=w[1];console.log(C);var S=function(){var e=localStorage.getItem("item");return e&&e.length>10}();console.log([].concat(Object(c.a)(f),[k])),Object(n.useEffect)((function(){a(Object(c.a)(f))}),[f]),Object(n.useEffect)((function(){i(C)}),[C]);return r.a.createElement("div",null,S?r.a.createElement("div",null,r.a.createElement(pe,{InputHandler:function(e){var a=e.target.name,t=e.target.value;console.log(a,t),t=t.toUpperCase(),y((function(e){return Object(s.a)(Object(s.a)({},e),{},Object(m.a)({},a,t))}))},SubmitHandler:function(e){e.preventDefault(),h({method:"POST",url:"kiln/",data:k}).then((function(e){k.id=e.data.id,E([].concat(Object(c.a)(f),[k])),201===e.status&&"Created"===e.statusText&&W({type:"success",msg:"Kiln saved"})})).catch((function(e){W({type:"error",msg:"Something went wrong. Please try again."})}))},valuea:k})):r.a.createElement(u.a,{to:{pathname:"/login"}}))},Ee=Object(W.a)({root:{minWidth:275},title:{fontSize:14},pos:{marginBottom:8},posBtn:{marginTop:10}}),ge=function(e){var a=e.kiln,t=Ee(),l=Object(n.useContext)(v).deleteKiln;return r.a.createElement(w.a,{item:!0,xs:12,sm:6,md:4},r.a.createElement($.a,{className:t.root},r.a.createElement(Q.a,null,r.a.createElement(q.a,{gutterBottom:!0,variant:"h5",component:"h2"},"KilnName: ",a.name),r.a.createElement(q.a,{className:t.pos,variant:"body2"},"Kiln Address: ",a.address),r.a.createElement(C.a,{onClick:function(){return l(a.id)},className:t.posBtn,variant:"contained",color:"secondary"},"Delete"))))},be=Object(W.a)((function(e){return{formControl:{margin:e.spacing(1),minWidth:120},selectEmpty:{marginTop:e.spacing(2)},inputSection:{width:"90%",margin:"auto"}}})),ve=function(){var e=be(),a=Object(n.useContext)(v),t=a.searchbykiln,l=a.searchbykilnlocation,i=a.ChangeOptionFilter;return r.a.createElement("div",null,r.a.createElement("div",{className:e.inputSection},r.a.createElement(w.a,{container:!0,spacing:4},r.a.createElement(w.a,{item:!0,xs:12,sm:6},r.a.createElement(y.a,{fullWidth:!0,label:"Search by kilnname",id:"outlined-size-small",name:"searchbykiln",value:t,onChange:i,variant:"outlined"})),r.a.createElement(w.a,{item:!0,xs:12,sm:6},r.a.createElement(y.a,{fullWidth:!0,label:"Search by kilnlocation",id:"outlined-size-normal",name:"searchbykilnlocation",value:l,onChange:i,variant:"outlined"})))))},ke=Object(W.a)({pos:{marginTop:30,width:"90%",margin:"auto"},addIcon:{width:"90%",marginTop:30,margin:"auto",display:"flex",alignItems:"center",color:"primary"},AddIconLink:{display:"flex",alignItems:"center",textDecoration:"none"}}),ye=function(){var e=ke(),a=function(){var e=localStorage.getItem("item");return e&&e.length>10}(),t=Object(n.useContext)(v),l=t.sortedkilnInfo,i=t.kilnInfo;console.log(l,i);var o=l.map((function(e){return r.a.createElement(ge,{kiln:e,key:e.id})}));return r.a.createElement("div",null,a?r.a.createElement("div",null,r.a.createElement("span",{className:e.addIcon},r.a.createElement(J.b,{to:"/kiln",className:e.AddIconLink},r.a.createElement(ee.a,{color:"primary",fontSize:"large"}),r.a.createElement(q.a,{className:"addnewWorker",color:"primary",component:"h1",variant:"h6"},"Add new kiln"))),r.a.createElement(j,{title:"Kiln List"}),r.a.createElement(ve,null),r.a.createElement("div",{className:e.pos},r.a.createElement(w.a,{container:!0,spacing:2},o))):r.a.createElement(u.a,{to:{pathname:"/login"}}))},Ie=function(e){Object(g.a)(t,e);var a=Object(b.a)(t);function t(){var e;Object(f.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=a.call.apply(a,[this].concat(r))).state={singleWorkerInfo:{},id:e.props.match.params.id,alertInfo:e.context.alertData},e.InputHandler=function(a){var t=a.target.name,n=a.target.value;console.log(t,n),n=n.toUpperCase();var r=Object(s.a)(Object(s.a)({},e.state.singleWorkerInfo),{},Object(m.a)({},t,n));e.setState({singleWorkerInfo:r})},e.InputHandlerKiln=function(e){var a=e.target.name,t=e.target.value;console.log(a,t)},e.SubmitHandler=function(a){a.preventDefault(),h({method:"PUT",url:"workers/".concat(e.state.singleWorkerInfo.id),data:e.state.singleWorkerInfo}).then((function(a){e.context.WorkerEditStatefunc(e.state.singleWorkerInfo),201===a.status&&"Created"===a.statusText&&e.setState({type:"success",msg:"Worker saved"})})).catch((function(a){e.setState({alertInfo:{type:"error",msg:"Something went wrong. Please try again."}})}))},e}return Object(E.a)(t,[{key:"componentDidMount",value:function(){var e=this;h({method:"GET",url:"workers/".concat(this.state.id)}).then((function(a){e.setState({singleWorkerInfo:a.data})})).catch((function(e){return console.log(e)}))}},{key:"render",value:function(){var e=this.context,a=e.kilnInfo,t=(e.alertData,e.AlertFunc,a.map((function(e){return r.a.createElement(O.a,{value:e.id},e.name)})));return r.a.createElement(I.a,{maxWidth:"sm",component:"main"},r.a.createElement("div",null,r.a.createElement(j,{title:"Update Worker"}),r.a.createElement("form",{action:"",onSubmit:this.SubmitHandler},r.a.createElement(w.a,{container:!0,spacing:2},r.a.createElement(w.a,{item:!0,xs:12,sm:6},r.a.createElement(y.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"f_name",value:this.state.singleWorkerInfo.f_name,onChange:this.InputHandler,id:"standard-basic",label:"Enter firstname",InputLabelProps:{shrink:!0}})),r.a.createElement(w.a,{item:!0,xs:12,sm:6},r.a.createElement(y.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"l_name",value:this.state.singleWorkerInfo.l_name,onChange:this.InputHandler,id:"standard-basic",label:"Enter lastname",InputLabelProps:{shrink:!0}})),r.a.createElement(w.a,{item:!0,xs:12,sm:6},r.a.createElement(y.a,{variant:"outlined",required:!0,fullWidth:!0,margin:"normal",name:"naikename",value:this.state.singleWorkerInfo.naikename,onChange:this.InputHandler,id:"standard-basic",label:"Enter naikename",InputLabelProps:{shrink:!0}})),r.a.createElement(w.a,{item:!0,xs:12,sm:6},r.a.createElement(y.a,{variant:"outlined",required:!0,fullWidth:!0,margin:"normal",name:"naikelastname",value:this.state.singleWorkerInfo.naikelastname,onChange:this.InputHandler,id:"standard-basic",label:"Enter naikelastname",InputLabelProps:{shrink:!0}})),r.a.createElement(w.a,{item:!0,xs:12,sm:6},r.a.createElement(y.a,{variant:"outlined",required:!0,fullWidth:!0,margin:"normal",name:"age",value:this.state.singleWorkerInfo.age,onChange:this.InputHandler,id:"standard-basic",label:"Enter age",InputLabelProps:{shrink:!0}})),r.a.createElement(w.a,{item:!0,xs:12,sm:6},r.a.createElement(y.a,{variant:"outlined",required:!0,fullWidth:!0,margin:"normal",name:"district",value:this.state.singleWorkerInfo.district,onChange:this.InputHandler,id:"standard-basic",label:"Enter district",InputLabelProps:{shrink:!0}})),r.a.createElement(w.a,{item:!0,xs:12,sm:6},r.a.createElement(y.a,{variant:"outlined",required:!0,fullWidth:!0,margin:"normal",name:"municipality",value:this.state.singleWorkerInfo.municipality,onChange:this.InputHandler,id:"standard-basic",label:"Enter municipality",InputLabelProps:{shrink:!0}})),r.a.createElement(w.a,{item:!0,xs:12,sm:6},r.a.createElement(y.a,{variant:"outlined",required:!0,fullWidth:!0,margin:"normal",name:"ward",value:this.state.singleWorkerInfo.ward,onChange:this.InputHandler,id:"standard-basic",label:"Enter ward",InputLabelProps:{shrink:!0}})),r.a.createElement(w.a,{item:!0,xs:12,sm:6},r.a.createElement(y.a,{variant:"outlined",required:!0,fullWidth:!0,margin:"normal",name:"workercategory",value:this.state.singleWorkerInfo.workercategory,onChange:this.InputHandler,id:"standard-basic",label:"Enter workercategory",InputLabelProps:{shrink:!0}})),r.a.createElement(w.a,{item:!0,xs:12,sm:6},r.a.createElement(y.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"phone",value:this.state.singleWorkerInfo.phone,onChange:this.InputHandler,id:"standard-basic",label:"Enter phone",InputLabelProps:{shrink:!0}})),r.a.createElement(w.a,{item:!0,xs:12,sm:12},r.a.createElement(N.a,{variant:"outlined",fullWidth:!0},r.a.createElement(S.a,{id:"demo-simple-select-outlined-label"},"Gender"),r.a.createElement(x.a,{labelId:"demo-simple-select-outlined-label",id:"demo-simple-select-outlined",value:this.state.singleWorkerInfo.gender,name:"gender",onChange:this.InputHandler,label:"gender",InputLabelProps:{shrink:!0}},r.a.createElement(O.a,{value:"MALE"},"MALE"),r.a.createElement(O.a,{value:"FEMALE"},"FEMALE"),r.a.createElement(O.a,{value:"OTHERS"},"OTHERS")))),r.a.createElement(w.a,{item:!0,xs:12,sm:12},r.a.createElement(N.a,{variant:"outlined",fullWidth:!0},r.a.createElement(S.a,{id:"demo-simple-select-outlined-label"},"Kiln Name"),r.a.createElement(x.a,{labelId:"demo-simple-select-outlined-label",id:"demo-simple-select-outlined",value:this.state.singleWorkerInfo.kiln,name:"kiln",onChange:this.InputHandlerKiln,label:"kiln",InputLabelProps:{shrink:!0}},t)))),r.a.createElement(C.a,{className:"editWorkerBtn",fullWidth:!0,type:"submit",variant:"contained",color:"primary"},"Submit"))))}}]),t}(n.Component);Ie.contextType=v;var we=Ie,Ce=t(69),We=t.n(Ce),Se=function(){var e=Object(n.useContext)(v),a=e.CloseModal,t=e.ModalStatus;return r.a.createElement("div",{className:t?"modalOverlay":"hideModal"},r.a.createElement(I.a,{maxWidth:"sm",component:"main"},r.a.createElement("div",{className:"modalInner"},r.a.createElement(We.a,{className:"CloseModelIcon",onClick:function(){return a()}}),r.a.createElement("h2",null,"Enter Amount"),r.a.createElement(y.a,{id:"outlined-full-width",label:"Enter Amount",placeholder:"Enter Amount",helperText:"",fullWidth:!0,margin:"normal",InputLabelProps:{shrink:!0},variant:"outlined"}),r.a.createElement(C.a,{style:{marginTop:8},type:"submit",variant:"contained",color:"primary",onClick:function(){return a()}},"Save Payment"))))},Oe=t(189),Ne=t(186),xe=t(185);var je=function(){var e=r.a.useState(!0),a=Object(o.a)(e,2),t=a[0],l=a[1],i=Object(n.useContext)(v).alertData,c=i?r.a.createElement(xe.a,{in:t},r.a.createElement(Oe.a,{action:r.a.createElement(Ne.a,{"aria-label":"close",color:"inherit",size:"small",onClick:function(){l(!1)}},r.a.createElement(We.a,{fontSize:"inherit"})),severity:i.type},i.msg)):null;return r.a.createElement("div",{className:"App"},r.a.createElement(J.a,null,r.a.createElement(ue,null),c,r.a.createElement(u.d,null,r.a.createElement(u.b,{exact:!0,path:"/",component:P}),r.a.createElement(u.b,{exact:!0,path:"/register",component:G}),r.a.createElement(u.b,{exact:!0,path:"/login",component:U}),r.a.createElement(u.b,{exact:!0,path:"/workers/:id",component:we}),r.a.createElement(u.b,{exact:!0,path:"/logout",component:Y}),r.a.createElement(u.b,{exact:!0,path:"/kiln",component:fe}),r.a.createElement(u.b,{exact:!0,path:"/workers",component:re}),r.a.createElement(u.b,{exact:!0,path:"/kilnlist",component:ye}),r.a.createElement(u.b,{component:z})),r.a.createElement(Se,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(k,null,r.a.createElement(je,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},51:function(e,a,t){}},[[116,1,2]]]);
//# sourceMappingURL=main.ecad117c.chunk.js.map