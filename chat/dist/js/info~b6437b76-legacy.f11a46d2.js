(window.webpackJsonp=window.webpackJsonp||[]).push([["info~b6437b76"],{3248:function(t,s,a){},"91d8":function(t,s,a){"use strict";a("3248")},d782:function(t,s,a){"use strict";a.r(s);var o={computed:{myInfo(){return this.$store.state.myInfo}},methods:{logout(){localStorage.removeItem("token"),this.$store.commit("updateMyInfo",{}),this.$socket.close(),this.$router.replace("/login")}}},a=(a("91d8"),a("0c7c")),a=Object(a.a)(o,function(){var t=this,s=t._self._c;return s("div",{staticClass:"background"},[s("div",{staticClass:"avaterContainer"},[s("img",{staticClass:"_avater _img-scale",attrs:{src:t.myInfo.imgSrc}}),s("div",{staticClass:"name-container"},[s("p",{staticClass:"nick-name"},[t._v(t._s(t.myInfo.username))]),s("p",{staticClass:"status"},[t._v("在线")])])]),s("a-button",{staticClass:"logout",attrs:{type:"danger"},on:{click:t.logout}},[t._v("注销")])],1)},[],!1,null,"2b6fe2c6",null);s.default=a.exports}}]);