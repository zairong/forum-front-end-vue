(function(){"use strict";var t={8390:function(t,e,n){n.d(e,{Gx:function(){return d},It:function(){return c},Oz:function(){return a},VG:function(){return u},kX:function(){return s},kr:function(){return i},r:function(){return f},yq:function(){return l},yu:function(){return o}});var r=n(6163);const a=()=>r.l.get("/get_current_user"),o=({restaurantId:t})=>r.l.post(`/favorite/${t}`,null),s=({restaurantId:t})=>r.l["delete"](`/favorite/${t}`),i=({restaurantId:t})=>r.l.post(`/like/${t}`,null),u=({restaurantId:t})=>r.l["delete"](`/like/${t}`),c=()=>r.l.get("/users/top"),l=({userId:t})=>r.l.post(`/following/${t}`,null),d=({userId:t})=>r.l["delete"](`/following/${t}`),f=({userId:t})=>r.l.get(`/users/${t}`)},9458:function(t,e,n){var r=n(6369),a=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"restaurant-forum"}},[e("NavBar"),e("main",{staticClass:"mt-5",attrs:{role:"main"}},[e("router-view")],1)],1)},o=[],s=(n(8052),function(){var t=this,e=t._self._c;return e("nav",{staticClass:"navbar navbar-expand-lg fixed-top navbar-dark bg-dark"},[e("router-link",{staticClass:"navbar-brand",attrs:{to:{name:"restaurants"}}},[t._v(" 餐廳評論網 ")]),t._m(0),e("div",{staticClass:"navbar-collapse collapse",attrs:{id:"navbarSupportedContent"}},[e("div",{staticClass:"ml-auto d-flex align-items-center"},[t.currentUser.isAdmin?e("router-link",{staticClass:"text-white mr-3",attrs:{to:"/admin/restaurants"}},[t._v(" 管理員後台 ")]):t._e(),t.isAuthenticated?e("router-link",{staticClass:"text-white mr-3",attrs:{to:{name:"users-id",params:{id:t.currentUser.id}}}},[t._v(" "+t._s(t.currentUser.name)+" 您好 ")]):t._e(),t.isAuthenticated?e("button",{staticClass:"btn btn-sm btn-outline-success my-2 my-sm-0",attrs:{type:"button"},on:{click:t.logout}},[t._v(" 登出 ")]):e("button",{staticClass:"btn btn-sm btn-outline-success my-2 my-sm-0",attrs:{type:"button"}},[t._v(" 登入 ")])],1)])],1)}),i=[function(){var t=this,e=t._self._c;return e("button",{staticClass:"navbar-toggler",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"}},[e("span",{staticClass:"navbar-toggler-icon"})])}],u=(n(7658),n(3822)),c={name:"NavBar",computed:{...(0,u.rn)("user",["currentUser","isAuthenticated"])},methods:{logout(){this.$store.commit("user/revokeAuthentication"),this.$router.push("/signin")}}},l=c,d=n(1001),f=(0,d.Z)(l,s,i,!1,null,"231dc395",null),m=f.exports,p={name:"App",components:{NavBar:m}},h=p,v=(0,d.Z)(h,a,o,!1,null,"7895c591",null),b=v.exports,g=n(2631),k=n(8390);const y={currentUser:{id:-1,name:"",email:"",image:"",isAdmin:!1},isAuthenticated:!1,token:""},C={setCurrentUser(t,e){t.currentUser={...t.currentUser,...e},t.token=localStorage.getItem("token"),t.isAuthenticated=!0},revokeAuthentication(t){t.currentUser={},localStorage.removeItem("token"),t.token="",t.isAuthenticated=!1}},_={async fetchCurrentUser({commit:t}){try{const e=await(0,k.Oz)(),{id:n,name:r,email:a,image:o,isAdmin:s}=e.data;return t("setCurrentUser",{id:n,name:r,email:a,image:o,isAdmin:s}),!0}catch(e){return console.log("error",e),t("user/revokeAuthentication"),!1}}},P={};var A={namespaced:!0,state:y,mutations:C,actions:_,getters:P};const w={},x={},E={},O={};var S={namespaced:!0,state:w,mutations:x,actions:E,getters:O};r.ZP.use(u.ZP);var U=new u.ZP.Store({modules:{user:A,restaurants:S}});r.ZP.use(g.ZP);const j=(t,e,n)=>{const r=U.state.user.currentUser;!r||r.isAdmin?n():n("/404")},I=[{path:"/",name:"root",redirect:"/signin"},{path:"/admin/restaurants",name:"admin-restaurants",component:()=>n.e(546).then(n.bind(n,6546)),beforeEnter:j},{path:"/admin/users",name:"admin-user",component:()=>n.e(263).then(n.bind(n,6263)),beforeEnter:j},{path:"/admin/categories",name:"admin-categories",component:()=>n.e(449).then(n.bind(n,7449)),beforeEnter:j},{path:"/admin/restaurants/create",name:"admin-restaurants-create",component:()=>Promise.all([n.e(459),n.e(489)]).then(n.bind(n,1489)),beforeEnter:j},{path:"/admin/restaurants/:id/edit",name:"admin-restaurant-edit",component:()=>Promise.all([n.e(459),n.e(591)]).then(n.bind(n,8591)),beforeEnter:j},{path:"/admin/restaurants/:id",name:"admin-restaurants-id",component:()=>Promise.all([n.e(459),n.e(934)]).then(n.bind(n,3934)),beforeEnter:j},{path:"/signin",name:"sign-in",component:()=>n.e(264).then(n.bind(n,4264))},{path:"/signup",name:"sign-up",component:()=>n.e(621).then(n.bind(n,9621))},{path:"/restaurants",name:"restaurants",component:()=>Promise.all([n.e(459),n.e(356)]).then(n.bind(n,1356))},{path:"/restaurants/feeds",name:"restaurants-feeds",component:()=>Promise.all([n.e(459),n.e(634)]).then(n.bind(n,1634))},{path:"/restaurants/top",name:"restaurants-tops",component:()=>Promise.all([n.e(459),n.e(547)]).then(n.bind(n,9547))},{path:"/restaurants/:id",name:"restaurant",component:()=>Promise.all([n.e(459),n.e(5)]).then(n.bind(n,9005))},{path:"/restaurants/:id/dashboard",name:"restaurants-dashboard",component:()=>n.e(151).then(n.bind(n,6151))},{path:"/users/top",name:"users-top",component:()=>Promise.all([n.e(459),n.e(842)]).then(n.bind(n,8842))},{path:"/users/:id",name:"users-id",component:()=>Promise.all([n.e(459),n.e(714)]).then(n.bind(n,6714))},{path:"/users/:id/edit",name:"users-id-edit",component:()=>Promise.all([n.e(459),n.e(267)]).then(n.bind(n,5267))},{path:"*",name:"not-found",component:()=>n.e(64).then(n.bind(n,6064))}],T=new g.ZP({linkExactActiveClass:"active",routes:I});T.beforeEach((async(t,e,n)=>{const r=localStorage.getItem("token"),a=U.state.user.token;let o=U.state.user.isAuthenticated;r&&r!==a&&(o=await U.dispatch("user/fetchCurrentUser"));const s=["sign-up","sign-in"];o||s.includes(t.name)?o&&s.includes(t.name)?n("/restaurants"):n():n("/signin")}));var N=T,Z=function(){var t=this,e=t._self._c;return e("ul",{staticClass:"nav nav-tabs mb-4"},[e("li",{staticClass:"nav-item"},[e("router-link",{staticClass:"nav-link",attrs:{to:"/restaurants"}},[t._v(" 首頁 ")])],1),e("li",{staticClass:"nav-item"},[e("router-link",{staticClass:"nav-link",attrs:{to:"/restaurants/feeds"}},[t._v(" 最新動態 ")])],1),e("li",{staticClass:"nav-item"},[e("router-link",{staticClass:"nav-link",attrs:{to:"/restaurants/top"}},[t._v(" TOP 10 人氣餐廳 ")])],1),e("li",{staticClass:"nav-item"},[e("router-link",{staticClass:"nav-link",attrs:{to:"/users/top"}},[t._v(" 美食達人 ")])],1)])},$=[],B={},L=(0,d.Z)(B,Z,$,!1,null,"7c45d91c",null),F=L.exports;r.ZP.component("NavTabs",F),r.ZP.config.productionTip=!1,new r.ZP({router:N,store:U,render:t=>t(b)}).$mount("#app")},6163:function(t,e,n){n.d(e,{F:function(){return l},l:function(){return c}});var r=n(6265),a=n.n(r),o=n(2492),s=n.n(o);const i="https://forum-express-api.herokuapp.com/api",u=a().create({baseURL:i,timeout:5e3});u.interceptors.request.use((t=>{const e=localStorage.getItem("token");return e&&(t.headers["Authorization"]=`Bearer ${e}`),t}),(t=>Promise.reject(t)));const c=u,l=s().mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3})}},e={};function n(r){var a=e[r];if(void 0!==a)return a.exports;var o=e[r]={id:r,loaded:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}n.m=t,function(){var t=[];n.O=function(e,r,a,o){if(!r){var s=1/0;for(l=0;l<t.length;l++){r=t[l][0],a=t[l][1],o=t[l][2];for(var i=!0,u=0;u<r.length;u++)(!1&o||s>=o)&&Object.keys(n.O).every((function(t){return n.O[t](r[u])}))?r.splice(u--,1):(i=!1,o<s&&(s=o));if(i){t.splice(l--,1);var c=a();void 0!==c&&(e=c)}}return e}o=o||0;for(var l=t.length;l>0&&t[l-1][2]>o;l--)t[l]=t[l-1];t[l]=[r,a,o]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})}}(),function(){n.f={},n.e=function(t){return Promise.all(Object.keys(n.f).reduce((function(e,r){return n.f[r](t,e),e}),[]))}}(),function(){n.u=function(t){return"js/"+t+"."+{5:"3a8f2676",64:"77ad4b60",151:"977b30fc",263:"23c0614f",264:"80dddb2f",267:"31ae425e",356:"e4935534",449:"b92bae6a",459:"a021ed53",489:"7f585a0e",546:"ee0c59aa",547:"db7d9e2a",591:"b5805aed",621:"ca79e8f4",634:"ad79c728",714:"05b6665c",842:"a91dbe9a",934:"9bc0a70b"}[t]+".js"}}(),function(){n.miniCssF=function(t){return"css/"+t+"."+{5:"3fdf9c3b",356:"ef8fed43",449:"8d11f033",547:"fcfdaf73",634:"a7b36b3e",842:"fcfdaf73"}[t]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={},e="forum-front-end-vue:";n.l=function(r,a,o,s){if(t[r])t[r].push(a);else{var i,u;if(void 0!==o)for(var c=document.getElementsByTagName("script"),l=0;l<c.length;l++){var d=c[l];if(d.getAttribute("src")==r||d.getAttribute("data-webpack")==e+o){i=d;break}}i||(u=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,n.nc&&i.setAttribute("nonce",n.nc),i.setAttribute("data-webpack",e+o),i.src=r),t[r]=[a];var f=function(e,n){i.onerror=i.onload=null,clearTimeout(m);var a=t[r];if(delete t[r],i.parentNode&&i.parentNode.removeChild(i),a&&a.forEach((function(t){return t(n)})),e)return e(n)},m=setTimeout(f.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=f.bind(null,i.onerror),i.onload=f.bind(null,i.onload),u&&document.head.appendChild(i)}}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){n.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t}}(),function(){n.p="/forum-front-end-vue/"}(),function(){if("undefined"!==typeof document){var t=function(t,e,n,r,a){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var s=function(n){if(o.onerror=o.onload=null,"load"===n.type)r();else{var s=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.href||e,u=new Error("Loading CSS chunk "+t+" failed.\n("+i+")");u.code="CSS_CHUNK_LOAD_FAILED",u.type=s,u.request=i,o.parentNode.removeChild(o),a(u)}};return o.onerror=o.onload=s,o.href=e,n?n.parentNode.insertBefore(o,n.nextSibling):document.head.appendChild(o),o},e=function(t,e){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var a=n[r],o=a.getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(o===t||o===e))return a}var s=document.getElementsByTagName("style");for(r=0;r<s.length;r++){a=s[r],o=a.getAttribute("data-href");if(o===t||o===e)return a}},r=function(r){return new Promise((function(a,o){var s=n.miniCssF(r),i=n.p+s;if(e(s,i))return a();t(r,i,null,a,o)}))},a={143:0};n.f.miniCss=function(t,e){var n={5:1,356:1,449:1,547:1,634:1,842:1};a[t]?e.push(a[t]):0!==a[t]&&n[t]&&e.push(a[t]=r(t).then((function(){a[t]=0}),(function(e){throw delete a[t],e})))}}}(),function(){var t={143:0};n.f.j=function(e,r){var a=n.o(t,e)?t[e]:void 0;if(0!==a)if(a)r.push(a[2]);else{var o=new Promise((function(n,r){a=t[e]=[n,r]}));r.push(a[2]=o);var s=n.p+n.u(e),i=new Error,u=function(r){if(n.o(t,e)&&(a=t[e],0!==a&&(t[e]=void 0),a)){var o=r&&("load"===r.type?"missing":r.type),s=r&&r.target&&r.target.src;i.message="Loading chunk "+e+" failed.\n("+o+": "+s+")",i.name="ChunkLoadError",i.type=o,i.request=s,a[1](i)}};n.l(s,u,"chunk-"+e,e)}},n.O.j=function(e){return 0===t[e]};var e=function(e,r){var a,o,s=r[0],i=r[1],u=r[2],c=0;if(s.some((function(e){return 0!==t[e]}))){for(a in i)n.o(i,a)&&(n.m[a]=i[a]);if(u)var l=u(n)}for(e&&e(r);c<s.length;c++)o=s[c],n.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return n.O(l)},r=self["webpackChunkforum_front_end_vue"]=self["webpackChunkforum_front_end_vue"]||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(9458)}));r=n.O(r)})();
//# sourceMappingURL=app.dc599134.js.map