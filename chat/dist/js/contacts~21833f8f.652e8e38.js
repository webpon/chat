(window.webpackJsonp=window.webpackJsonp||[]).push([["contacts~21833f8f"],{"01cf":function(t,s,c){},"0c67":function(t,s,c){},"1d4c":function(t,s,c){"use strict";c("0c67")},"57f9":function(t,s,c){"use strict";c.r(s);var a={name:"",data(){return{isActive:!1}},props:{contactsInfo:{type:Object,default:{}}},components:{},methods:{toChat(){var t;this.contactsInfo.username===this.$store.state.myInfo.username?this.alertWheel.div.add(this.alertWheel.button).add(this.alertWheel.p).show():(t={...this.contactsInfo,msg:null,msgNumber:0},this.$store.commit("updateChatList",t),this.$router.push({path:"/chat/toChat",query:{userName:this.contactsInfo.username}}))}}},n=(c("7078"),c("1d4c"),c("0c7c")),a={name:"contactsList",data(){return{contacts:[]}},components:{listItem:Object(n.a)(a,function(){var t=this,s=t._self._c;return s("div",{staticClass:"listItem",class:{active:1==t.isActive},on:{click:t.toChat}},[s("div",{staticClass:"list_avater_container"},[s("img",{key:Math.random(),staticClass:"_avater _img-scale",attrs:{src:t.contactsInfo.imgSrc,alt:""}})]),s("div",{staticClass:"msgContainer"},[s("p",{staticClass:"Title"},[t._v(" "+t._s(t.contactsInfo.username)+" ")])]),s("div")])},[],!1,null,"066bc4b3",null).exports}};c("ed7a");var a=Object(n.a)(a,function(){var t=this,c=t._self._c;return c("div",{staticClass:"contacts"},[c("h3",{staticClass:"contactstitle"},[t._v("在线用户 ("+t._s(t.$store.state.contacts.length)+")")]),c("div",{ref:"contacts",staticClass:"contacts_container"},t._l(t.$store.state.contacts,function(t,s){return c("listItem",{key:s,attrs:{contactsInfo:t}})}),1)])},[],!1,null,"ddb0597e",null).exports,e={name:"chatBackground",data(){return{}},components:{},created(){}};c("c6db");c={name:"contacts",data(){return{}},components:{contactsList:a,chatBackground:Object(n.a)(e,function(){return this._self._c,this._m(0)},[function(){var t=this._self._c;return t("div",{staticClass:"chatBackground"},[t("div",{staticClass:"bac_title"},[this._v(" Welcome! ")])])}],!1,null,"1c56db3e",null).exports}},a=Object(n.a)(c,function(){var t=this,s=t._self._c;return s("div",[s("contactsList"),t.$store.state.isMobile?t._e():s("chatBackground")],1)},[],!1,null,null,null);s.default=a.exports},7078:function(t,s,c){"use strict";c("01cf")},c6db:function(t,s,c){"use strict";c("f19c")},e499:function(t,s,c){},ed7a:function(t,s,c){"use strict";c("e499")},f19c:function(t,s,c){}}]);