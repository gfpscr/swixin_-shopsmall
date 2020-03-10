import { request } from '../../request/index.js'
import {regeneratorRuntime } from '../../lib/runtime/runtime.js'
// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //保存获取数据
    goodsObj:{},
  },
//商品对象
    Goods:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    const {goods_id} = options;
    this.getGoodsDetail(goods_id);
  },
//获取商品详情数据
  async getGoodsDetail(goods_id){
    const goodsObj = await request({
      url:"/goods/detail",
      data:{goods_id}
    });
    this.Goods = goodsObj;
    this.setData({
      // 为了减上不必要的数据在加载，影响小程序的性能
      // goodsObj:res
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        //有部分手机不识别.webp图片格式   这种格式体积小，图片质量好
        // 最好是找后台人员修改
        // 不行的话就替换，自己修改
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.pics,
      }, 
    }) 

  },

  //点击轮播图 放大预览  微信小程序 api previewImage
  handlePrevewImage(e){
    //先构造要预览的图片
    const urls = this.Goods.pics.map(v => v.pics_mid);
    
  //接受点击传过来的图片地址
  const current = e.currentTarget.dataset.url;  
    wx.previewImage({
      current,
      urls
    });
  },
  //点击加入购物车
  handleCartAdd(){
      //1、获取缓存中的购物车  数组
      let cart = wx.getStorageSync('cart')||[];
    //2、判断商品对象是否存在于购物车数组中
    let index = cart.findIndex(v => v.goods_id === this.Goods.goods_id);
    // console.log(index);
    if (index === -1) {
      //第一次添加
      this.Goods.num = 1;
      // 添加购物车选中
      this.Goods.checked = true;
      cart.push(this.Goods);
    }else{
      //多次添加
      cart[index].num++;
    }
    //3、把购物车重新添加回缓存中
    wx.setStorageSync('cart', cart);
    //提示添加是否成功
    wx.showLoading({
      title: '添加成功',
      //防止用户 点击多洗
      icon:'success',
      duration:800,
      mask: true,
    });
      
        
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