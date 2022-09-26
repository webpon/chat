const express = require("express");
const moment = require("moment");
const { Buffer } = require("buffer");
const OSS = require("ali-oss");

const app = express();
const path = require("path");

// 按需配置 https://help.aliyun.com/document_detail/322691.htm?spm=a2c4g.11186623.0.0.64f0110aMTictg#task-2121074
let config = {
  accessKeyId: "",
  accessKeySecret: "",
  bucket: "",
  callbackUrl: "/result",
  dir: "prefix/",
};

if (!config.accessKeyId || !config.accessKeySecret){
  console.error("请配置阿里RAM 控制")
  process.exit()
}

app.get("/oss", async (req, res) => {
  const client = new OSS(config);

  const date = new Date();
  date.setDate(date.getDate() + 1);
  const policy = {
    expiration: date.toISOString(), // 请求有效期
    conditions: [
      ["content-length-range", 0, 1048576000], // 设置上传文件的大小限制
      // { bucket: client.options.bucket } // 限制可上传的bucket
    ],
  };

  //  跨域才设置
  res.set({
    "Access-Control-Allow-Origin": req.headers.origin || "*",
    "Access-Control-Allow-Methods": "PUT,POST,GET",
  });

  //签名
  const formData = await client.calculatePostSignature(policy);
  //bucket域名
  const host = `http://${config.bucket}.${
    (await client.getBucketLocation()).location
  }.aliyuncs.com`.toString();
  //回调
  const callback = {
    callbackUrl: config.callbackUrl,
    callbackBody:
      "filename=${object}&size=${size}&mimeType=${mimeType}&height=${imageInfo.height}&width=${imageInfo.width}",
    callbackBodyType: "application/x-www-form-urlencoded",
  };

  //返回参数
  const params = {
    expire: moment().add(1, "days").unix().toString(),
    policy: formData.policy,
    signature: formData.Signature,
    accessid: formData.OSSAccessKeyId,
    host,
    callback: Buffer.from(JSON.stringify(callback)).toString("base64"),
    dir: config.dir,
  };

  res.json(params);
});

//接收回掉
app.post("/result", (req, res) => {
  //公钥地址
  const pubKeyAddr = Buffer.from(
    req.headers["x-oss-pub-key-url"],
    "base64"
  ).toString("ascii");
  //判断
  if (
    !pubKeyAddr.startsWith("https://gosspublic.alicdn.com/") &&
    !pubKeyAddr.startsWith("https://gosspublic.alicdn.com/")
  ) {
    System.out.println("pub key addr must be oss addrss");
    res.json({ Status: "verify not ok" });
  }
  res.json({ Status: "Ok" });
});

app.listen(19000, () => {
  console.log("http://127.0.0.1:19000");
  console.log("App of postObject started.");
});
