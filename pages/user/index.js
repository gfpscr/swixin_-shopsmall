// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:{}
  },

 onShow(){
   const userInfo = wx.getStorageSync("userInfo");
   console.log(userInfo);
   this.setData({
     userInfo
   })
     
 }
})