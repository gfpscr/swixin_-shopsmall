// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  bandleGetUser(e){
    // console.log(e);
    // 把用户的信息存到缓存
    const {userInfo} = e;
    console.log(userInfo);
    wx.setStorageSync('userInfo', userInfo);
    // 跳回那个页面
    wx.navigateBack({
      delta: 1,
    })
  }
})