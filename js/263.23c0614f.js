"use strict";(self["webpackChunkforum_front_end_vue"]=self["webpackChunkforum_front_end_vue"]||[]).push([[263],{6263:function(t,e,s){s.r(e),s.d(e,{default:function(){return c}});var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container py-5"},[e("table",{staticClass:"table"},[t._m(0),t._l(t.users,(function(s){return e("tbody",{key:s.id},[e("tr",[e("th",{attrs:{scope:"row"}},[t._v(" 1 ")]),e("td",[t._v(t._s(s.email))]),s.isAdmin?e("td",[t._v("admin")]):e("td",[t._v("user")]),e("td",[e("button",{directives:[{name:"show",rawName:"v-show",value:s.isAdmin&&1!==s.id,expression:"user.isAdmin && user.id !== 1"}],staticClass:"btn btn-link",attrs:{type:"button"},on:{click:function(e){return t.changeAdmin(s.id)}}},[t._v(" set as user ")]),e("button",{directives:[{name:"show",rawName:"v-show",value:!s.isAdmin,expression:"!user.isAdmin"}],staticClass:"btn btn-link",attrs:{type:"button"},on:{click:function(e){return t.changeAdmin(s.id)}}},[t._v(" set as admin ")])])])])}))],2)])},n=[function(){var t=this,e=t._self._c;return e("thead",{staticClass:"thead-dark"},[e("tr",[e("th",{attrs:{scope:"col"}},[t._v(" # ")]),e("th",{attrs:{scope:"col"}},[t._v(" Email ")]),e("th",{attrs:{scope:"col"}},[t._v(" Role ")]),e("th",{attrs:{scope:"col",width:"140"}},[t._v(" Action ")])])])}];const a={users:[{id:1,name:"root",email:"root@example.com",password:"$2a$10$87zU8JEI6uZkeDWYm5lSP.S5MQXjfURTfaAyYOIyp3iEil1zmjZnW",isAdmin:!0,image:null,createdAt:"2023-01-24T03:49:55.000Z",updatedAt:"2023-01-24T03:49:55.000Z"},{id:2,name:"user1",email:"user1@example.com",password:"$2a$10$WEZwkcCs1vO7d5ukLuLce.q.PWjEV3Eq9VP3mF660gPC3u./gY7wS",isAdmin:!1,image:null,createdAt:"2023-01-24T03:49:56.000Z",updatedAt:"2023-01-24T03:49:56.000Z"},{id:3,name:"user2",email:"user2@example.com",password:"$2a$10$ByhoFSC9godguwZFohK72.4M9WDnvD.ETDAZqjk1q7RvpV9H1P.iW",isAdmin:!1,image:null,createdAt:"2023-01-24T03:49:56.000Z",updatedAt:"2023-01-24T03:49:56.000Z"}]};var r={name:"AdminUsers",data(){return{users:[]}},created(){this.fetchUsers()},methods:{fetchUsers(){this.users=a.users},changeAdmin(t){this.users=this.users.map((e=>(e.id===t&&(e.isAdmin=!e.isAdmin),e)))}}},u=r,d=s(1001),o=(0,d.Z)(u,i,n,!1,null,null,null),c=o.exports}}]);
//# sourceMappingURL=263.23c0614f.js.map