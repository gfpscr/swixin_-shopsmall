// pages/auth/index.js
import {login} from '../../utils/asyncWw.js'
import {request}  from '../../request/index.js'
Page({
//获取授权信息
   async handleGetUser(e){
    try {
       // console.log(e)
  // 获取用户信息
    const {encryptedData,errMsg,iv,signature} = e.detail;
    //获取登录的code  （判断是否登录）
   const {code} = await login();
  //  console.log(code) 
  // 把传到后端的属性生成一个对象
  const loginParams = {encryptedData,errMsg,iv,signature,code};
  // 发送请求 获取用户的tokrn  必须要企业的APPID
  const token = await request({url:"/users/wxlogin",data:loginParams,method:"post"});
  wx.setStorageSync('token', token);
  wx.navigateBack({
    delta:1 //返回上一层  2就返回上2层
  });
  // console.log(token);
    } catch (error) {
      console.log(error)
    }
}
})