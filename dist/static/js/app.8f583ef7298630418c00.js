webpackJsonp([1],{"+A8S":function(t,e){},"7Otq":function(t,e,n){t.exports=n.p+"static/img/logo.b022587.png"},"9CX6":function(t,e){},F1FX:function(t,e){},IcPj:function(t,e){},Ikok:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("7+uW"),a=n("Dd8w"),o=n.n(a),s=n("NYxO"),i={name:"Navigation",props:{navItems:{type:Array,default:[],required:!0}},computed:o()({},Object(s.b)({currentUser:"currentUser"})),created:function(){console.log(this.currentUser)},data:function(){return{query:null,searchPlaceholder:" Search Devos",loggedInNavLinks:[{linkName:"Categories",linkIcon:"navIcon fas fa-map-signs"},{linkName:"Popular",linkIcon:"navIcon fas fa-chart-line"}]}},methods:{submitQuery:function(t){this.query=t.target.value,console.log(this.$router),this.$router.push({name:"SearchResults",params:{query:t.target.value}})}}},u={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"navbar"},[t._m(0),t._v(" "),r("router-link",{staticClass:"brand",attrs:{to:{name:"Homepage"}}},[r("img",{attrs:{src:n("7Otq"),alt:""}})]),t._v(" "),r("div",{staticClass:"navSearchBar"},[r("input",{attrs:{type:"text",placeholder:t.searchPlaceholder},domProps:{value:t.query},on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.submitQuery(e):null}}})]),t._v(" "),r("div",{staticClass:"right"},[t._l(t.loggedInNavLinks,function(e){return r("router-link",{key:e.linkName,staticClass:"link",attrs:{to:{name:e.linkName}}},[r("i",{class:e.linkIcon}),t._v(" "+t._s(e.linkName)+"\n      ")])}),t._v(" "),t.currentUser?t._e():r("router-link",{staticClass:"link",attrs:{to:{name:"Login"}}},[r("i",{staticClass:"navIcon fas fa-sign-in-alt"}),t._v(" Login\n      ")]),t._v(" "),t.currentUser?r("router-link",{staticClass:"link",attrs:{to:{name:"Profile"}}},[r("i",{staticClass:"navIcon fas fa-user"}),t._v(" Profile\n      ")]):t._e(),t._v(" "),t.currentUser?r("router-link",{staticClass:"link",attrs:{to:{name:"Publish"}}},[r("i",{staticClass:"navIcon fas fa-plus-square"}),t._v(" Publish\n      ")]):t._e(),t._v(" "),t.currentUser?r("router-link",{staticClass:"link",attrs:{to:{name:"Logout"}}},[r("i",{staticClass:"navIcon fas fa-sign-out-alt"}),t._v(" Logout\n      ")]):t._e()],2)],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticClass:"toggle",attrs:{href:"#",id:"navHamburger"}},[e("i",{staticClass:"fas fa-bars"})])}]};var l={name:"App",data:function(){return{pageElements:[1,2,3]}},components:{Navigation:n("VU/8")(i,u,!1,function(t){n("+A8S")},"data-v-275fa64c",null).exports},computed:o()({},Object(s.b)({currentUser:"currentUser"}))},c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("Navigation",{attrs:{navItems:this.pageElements}}),this._v(" "),e("router-view")],1)},staticRenderFns:[]};var p=n("VU/8")(l,c,!1,function(t){n("F1FX")},null,null).exports,h=n("/ocq"),m={name:"Homepage",computed:o()({},Object(s.b)({currentUser:"currentUser"})),data:function(){return{msg:"Welcome to Your Vue.js App"}}},d={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"homepage-wrapper"},[e("h1",[this._v("You're on the homepage")]),this._v(" "),this.currentUser?e("div",[this._v("\n    "+this._s(this.currentUser.email)+"\n  ")]):this._e()])},staticRenderFns:[]};var f=n("VU/8")(m,d,!1,function(t){n("TxQb")},"data-v-2f22a020",null).exports,g={name:"SearchResults",data:function(){return{query:null,results:[],gettingResults:!0}},beforeMount:function(){this.query=this.$route.params.query,this.getResults(this.query)},watch:{$route:function(t,e){console.log("watcher...")}},methods:{getResults:function(t){this.results=[],console.log(t)}}},v={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("h1",[this._v("Search results")])])}]};var _=n("VU/8")(g,v,!1,function(t){n("9CX6")},"data-v-3c656656",null).exports,y={name:"Login",data:function(){return{email:"",password:"",error:!1}},methods:{login:function(){var t=this;this.$http.post("/auth",{user:this.email,password:this.password}).then(function(e){return t.loginSuccessful(e)}).catch(function(){return t.loginFailed()})},loginSuccessful:function(t){t.data.token?(localStorage.token=t.data.token,this.$store.dispatch("login"),this.error=!1,this.$router.push({name:"SearchResults"})):this.loginFailed()},loginFailed:function(){this.error="Login failed!",this.$store.dispatch("logout"),delete localStorage.token}},computed:o()({},Object(s.b)({currentUser:"currentUser"}))},k={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h2",[t._v("Login")]),t._v(" "),t.error?n("div",[t._v(t._s(t.error))]):t._e(),t._v(" "),n("form",{on:{submit:function(e){return e.preventDefault(),t.login(e)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"email",placeholder:"Email address",required:"",autofocus:""},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",placeholder:"Password",required:"",autofocus:""},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._v(" "),n("button",{attrs:{type:"submit"}},[t._v("Login")])])])},staticRenderFns:[]};var b=n("VU/8")(y,k,!1,function(t){n("WDdP")},"data-v-9a494c52",null).exports,U=n("Gu7T"),P=n.n(U),C=n("mtWM"),S=n.n(C),w={name:"Categories",data:function(){return{categoryApiUrl:"https://open-devos-api.herokuapp.com/topics",categories:[]}},beforeMount:function(){this.getCategories()},methods:{getCategories:function(){var t=this;S.a.get(this.categoryApiUrl).then(function(e){var n;(n=t.categories).push.apply(n,P()(e.data.topics))}).catch(function(t){console.log(t)})}}},$={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h1",[t._v("Categories")]),t._v(" "),t._l(t.categories,function(e){return n("div",{key:e.id},[n("router-link",{staticClass:"link",attrs:{to:{name:"CategoryDetail",params:{category_slug:e.slug}}}},[t._v("\n      "+t._s(e.title)+"\n    ")])],1)})],2)},staticRenderFns:[]};var F=n("VU/8")(w,$,!1,function(t){n("P6HX")},"data-v-6a54cb3c",null).exports,N={name:"CategoryDetail",data:function(){return{categoryName:null,categorySlug:this.$route.params.category_slug,categoryApiUrl:"https://open-devos-api.herokuapp.com/topics",plans:[]}},beforeMount:function(){console.log("params...",this.$route.params),this.getCategoryPlans()},beforeRouteUpdate:function(t,e,n){this.categorySlug=this.$route.params.category_slug,n()},methods:{getCategoryPlans:function(){var t=this;S.a.get(this.categoryApiUrl+"/"+this.categorySlug).then(function(e){t.categoryName=e.data.topic.title,console.log(e)}).catch(function(t){console.log(t)})}}},x={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("h1",[this._v(this._s(this.categoryName))])])},staticRenderFns:[]};var I=n("VU/8")(N,x,!1,function(t){n("WNzL")},"data-v-a8e676ee",null).exports,L={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("h1",[this._v("Popular")])])}]};var R=n("VU/8")({name:"Popular",data:function(){return{}}},L,!1,function(t){n("q7fG")},"data-v-276b4463",null).exports,T={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("h1",[this._v("Profile")])])}]};var E=n("VU/8")({name:"Profile",data:function(){return{}}},T,!1,function(t){n("IcPj")},"data-v-4d0f0d33",null).exports,q={name:"Publish",data:function(){return{plans:[],showForm:!1,planTitle:null,selectedPlan:null,errorSubmittingForm:!1,planSubmittedSuccessfully:!1,responseMessage:null}},computed:o()({},Object(s.b)({currentUser:"currentUser"})),beforeMount:function(){console.log(this.currentUser.id),this.getCurrentPlans()},methods:{submitPlanForm:function(){var t=this;S.a.post("https://open-devos-api.herokuapp.com/plans",{plan:{title:this.planTitle,topic_id:1,user_id:this.currentUser.id}},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then(function(e){return console.log(e.data),t.errorSubmittingForm=!1,t.planSubmittedSuccessfully=!0,t.responseMessage="The plan was successfully created",e.data}).catch(function(e){console.log(e),t.responseMessage="There was an error submitting the form, please try again",t.errorSubmittingForm=!0})},formToggle:function(){console.log("Form toggle")},getCurrentPlans:function(){var t=this;S.a.get("https://open-devos-api.herokuapp.com/user-plans",{headers:{Authorization:"Bearer "+localStorage.getItem("token")},params:{user_id:1}}).then(function(e){var n;(n=t.plans).push.apply(n,P()(e.data.plans)),console.log("data: ",e)}).catch(function(t){console.log("error: ",t)})}}},A={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h1",[t._v("Publish")]),t._v(" "),n("div",{staticClass:"published-plans-wrapper"},[n("button",{staticClass:"formToggleLink",on:{click:t.formToggle}},[t._v("New Plan")]),t._v(" "),n("h2",[t._v("Published Plans")]),t._v(" "),t._l(t.plans,function(e){return n("div",{key:e.id},[t._v("\n      "+t._s(e.title)+"\n    ")])})],2),t._v(" "),n("div",{staticClass:"plan-form-wrapper"},[n("h2",[t._v(t._s(t.responseMessage))]),t._v(" "),n("form",{on:{submit:function(e){return e.preventDefault(),t.submitPlanForm(e)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.planTitle,expression:"planTitle"}],attrs:{type:"text",placeholder:"Title"},domProps:{value:t.planTitle},on:{input:function(e){e.target.composing||(t.planTitle=e.target.value)}}}),t._v(" "),n("button",[t._v("Save")])])])])},staticRenderFns:[]};var O=n("VU/8")(q,A,!1,function(t){n("Ikok")},"data-v-6389902a",null).exports,V={name:"Logout",created:function(){delete localStorage.token,this.$store.dispatch("logout"),this.$router.push("/")}},j=n("VU/8")(V,null,!1,null,null,null).exports;r.a.use(h.a);var M=new h.a({mode:"history",routes:[{path:"/",name:"Homepage",component:f},{path:"/search-results",name:"SearchResults",component:_},{path:"/login",name:"Login",component:b},{path:"/logout",name:"Logout",component:j},{path:"/categories",name:"Categories",component:F},{path:"/category/:category_slug",name:"CategoryDetail",component:I},{path:"/popular",name:"Popular",component:R},{path:"/profile",name:"Profile",component:E},{path:"/publish",name:"Publish",component:O}]}),D=n("Rf8U"),H=n.n(D),W=S.a.create({baseURL:"https://open-devos-api.herokuapp.com",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.token}});r.a.use(H.a,W);var G,X=n("bOdI"),z=n.n(X),B=n("Zrlr"),Q=n.n(B),Y=n("wxAW"),J=n.n(Y),Z=n("ytdl"),K=n.n(Z),tt=function(){function t(e){var n=e.user_id,r=e.admin,a=e.email;Q()(this,t),this.id=n,this.admin=r,this.email=a}return J()(t,null,[{key:"from",value:function(e){try{return new t(K()(e))}catch(t){return null}}}]),J()(t,[{key:"isAdmin",get:function(){return this.admin}}]),t}(),et={state:{user:tt.from(localStorage.token)},mutations:(G={},z()(G,"LOGIN",function(t){t.user=tt.from(localStorage.token)}),z()(G,"LOGOUT",function(t){t.user=null}),G),getters:{currentUser:function(t){return t.user}},actions:{login:function(t){(0,t.commit)("LOGIN")},logout:function(t){(0,t.commit)("LOGOUT")}}};r.a.use(s.a);var nt=new s.a.Store({modules:{auth:et}});r.a.config.productionTip=!1,new r.a({el:"#app",router:M,axios:void 0,store:nt,components:{App:p},template:"<App/>"})},P6HX:function(t,e){},TxQb:function(t,e){},WDdP:function(t,e){},WNzL:function(t,e){},q7fG:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.8f583ef7298630418c00.js.map