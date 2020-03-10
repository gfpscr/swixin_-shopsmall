import {request} from '../../utils/util.js'
import {regeneratorRuntime} from '../../lib/runtime/runtime.js'
import {getSetting,chooseAddress,openSetting,showModel,showToast} from '../../utils/asyncWw.js'


// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    totalPrice:0, //总价
    totalNum:0   //总数
  },
  onShow(){
    // 1 获取 缓存中的数据地址
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart")||[];
    //来个过滤后得购物车   选择的商品 
    cart= cart.filter(v=>v.checked)
   //把address添加数组
    this.setData({
      address,
    });
    // 总额 总量
    let totalNum = 0;
    let totalPrice = 0;
    //遍历
    cart.forEach(v => {
        totalNum +=v.num;
        totalPrice +=v.num*v.goods_price;
    });
    // console.log(allchecked);u
    this.setData({
        cart,
        totalNum,
        totalPrice,
        address
      });
      wx.setStorageSync("cart", cart);
  },
  // 支付点击按钮
    async handlePay(){
    // 1  判断缓存中有没有token
    const token = wx.getStorageSync("token");
      // 2 判断 
    if (!token) { //没有token
      wx.navigateTo({
        url: '/pages/auth/index',
      });
        return ;   
    }
    // console.log(token)
    // 创建订单
    //获取请求 头参数
    const   header= {Authorization:token};
    // 请求实体参数
    const order_price = this.data.totalPrice;
    const consignee_addr = this.data.address.all;
    const cart = this.data.cart;
    let goods = [];
    cart.forEach(v=>goods.push({
      goods_id:v.goods_id,
      goods_number:v.num,
      goods_price:v.goods_price
    }));
    const orderParams = {consignee_addr,order_price,goods};
    // 发送请求
    const res = await request({
      url:'/my/orders/create',
      method:"POST",
      data:orderParams,
      header
    })
    // console.log(res)
    }

})