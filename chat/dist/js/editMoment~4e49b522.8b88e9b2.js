(window.webpackJsonp=window.webpackJsonp||[]).push([["editMoment~4e49b522"],{"041c":function(e,s,t){"use strict";t("f44b")},f36e:function(e,s,t){"use strict";t.r(s);var a=t("3089"),i={data(){return{message:{content:"",images:[]},imgList:[]}},computed:{isDisabled(){return""===this.message.content&&0===this.message.images.length}},mounted(){},methods:{uploadImg(){this.$refs.fileInputPicture.click()},deleteImg(s){var e=this.message.images.findIndex(e=>e.flag===s.flag);-1<e&&this.message.images.splice(e,1)},onOversize(){Object(a.Toast)("文件大小不能超过 2MB")},async uploadProgress(s,e){var t=s["file"];if(s.status="uploading",s.message="上传中...",s.flag=Date.now(),t){var a=new FormData;a.append("file",t);try{const{data:e={}}=await this.$http.post("http://39.103.233.82:13141/upload",a);s.status="done",s.message="上传完毕",e.fileList.forEach(e=>{this.message.images.push({url:e,type:1,flag:s.flag})})}catch(e){s.status="failed",s.message="上传失败"}}},async sendMsg(){"visitor"===this.$store.state.myInfo.type?(this.$message.error("游客不允许发布朋友圈"),this.$router.replace("/discover/moments")):(await this.$moments.post("/moments",this.message),this.$message.success("发布成功"),this.$router.replace("/discover/moments"),this.message.content="",this.message.images=[],this.imgList=[])}}},t=(t("041c"),t("0c7c")),t=Object(t.a)(i,function(){var s=this,e=s._self._c;return e("div",{staticClass:"container"},[e("div",{staticClass:"top-wrapper flex"},[e("a-icon",{staticClass:"_back back",attrs:{type:"left"},on:{click:s.back}}),e("p",{staticClass:"_title"},[s._v("编辑内容")]),e("a-button",{staticClass:"send_btn",attrs:{disabled:s.isDisabled,size:"small",type:"primary"},on:{click:s.sendMsg}},[s._v("发布")])],1),e("div",{staticClass:"edit-container"},[e("a-textarea",{staticClass:"cus-area",attrs:{rows:4,placeholder:"这一刻的想法..."},model:{value:s.message.content,callback:function(e){s.$set(s.message,"content","string"==typeof e?e.trim():e)},expression:"message.content"}}),e("div",{staticClass:"upload flex"},[e("input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"fileInputPicture",attrs:{accept:"image/*",type:"file",multiple:""},on:{change:function(e){return s.uploadProgress(e,"picture")}}}),e("van-uploader",{attrs:{"preview-size":115,"max-count":9,"max-size":20971520,"after-read":e=>s.uploadProgress(e,"picture")},on:{delete:s.deleteImg,oversize:s.onOversize},model:{value:s.imgList,callback:function(e){s.imgList=e},expression:"imgList"}})],1)],1)])},[],!1,null,"45c92500",null);s.default=t.exports},f44b:function(e,s,t){}}]);