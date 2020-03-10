// pages/goods_list/index.js
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true,
      },
      {
        id:1,
        value:"销售",
        isActive:false,
      },
      {
        id:2,
        value:"价格",
        isActive:false,
      }
    ],
    goods_list:[],
    totalPages:1,
  },
//接口数据参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
//  console.log(options)
    this.QueryParams.cid = options.cid;
    this.getGoodsList();
  },
  //获取商品列表数据
  async getGoodsList(){
    const res = await request({
      url:'/goods/search',
      data:this.QueryParams
    });
    // console.log(res)
    //总条数
    const total = res.total;
    //总页数
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
    // console.log(this.totalPages)
    this.setData({
      //把后面的数据添加到已加载的数据数组里面
      goods_list:[...this.data.goods_list,...res.goods]
    })
    //关闭下拉列表（当数据已经加载完毕）
    wx.stopPullDownRefresh();
      
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
   * 页面下拉触底事件的处理函数
   */
  onPullDownRefresh(){
    // console.log("www")
    //1、先重置数组
    this.setData({
      goods_list:[]
    }),
    //2、重置页码
    this.QueryParams.pagenum = 1;
    //3、重新发送请求
    this.getGoodsList();
  },  
   /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log("sss")
    if (this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '数据已加载完毕',
      });
        
    }else{
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }   
  },
  // 从子组件传递过来的  标题点击事件
  handleTabsItemChange(e){
    // console.log(e);
    const {index} = e.detail;
    let {tabs} = this.data;
    // console.log(tabs);
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs  
    })
  }
  
})