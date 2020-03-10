import {request} from '../../request/index.js'
 


Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    cateList:[],
    floor:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取轮播图的数据
 this.getSwiper();
 this.getCateList();
 this.getFloor()
  },


// 获取数据
getSwiper(){
  request({
    url:'/home/swiperdata'
  }).then((result)=>{
          this.setData({
        swiperList:result
      })
  })
},
//获取分类导航数据
getCateList(){
  request({
    url:'/home/catitems'
  }).then((result)=>{
    console.log(result)
          this.setData({
        cateList:result
      })
      // this.cateList = result.data.message
  })  
},
  //获取楼层的数据
  getFloor(){
    request({
      url:'/home/floordata'
    }).then((result)=>{
      console.log(result)
      this.setData({
          floor:result
      })
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})