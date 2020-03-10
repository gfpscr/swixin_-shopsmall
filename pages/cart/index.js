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
    allchecked:false,
    totalPrice:0, //总价
    totalNum:0   //总数
  },
  onShow(){
    // 1 获取 缓存中的数据地址
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart")||[];
   //把address添加数组
    this.setData({
      address,
    });
    this.setCart(cart);
  },
  //获取地址
  async handleChooseAddress(){
   //1、获取权限
   try {
    const res1 = await getSetting();
    const scopeAddress = res1.authSetting["scope.address"];
    //2 判断  权限
    if (scopeAddress===false) {
    // 4用户 以前拒接过授予权限，先诱导用户打开授权页面 
    await openSetting();
    }
     // 5、调用 获取收货地址 api
     let res2 = await chooseAddress();
     res2.all = res2.provinceName+res2.cityName+res2.countyName+res2.detailInfo;
      console.log(res2);
    //  把地址放到本地服务器
    wx.setStorageSync("address", res2);
      // console.log(res2);
   } catch (error) {
     console.log("错误")
   }

  },
  //商品选中
  handetemChange(e){
//获取商品的id
    // console.log(e.target.dataset.id);
    const goods_id = e.target.dataset.id;
    // console.log(this.data)  是data里的数据
    let {cart} = this.data;
    // console.log(cart);
    //  找到被修改的商品对象
    let index = cart.findIndex(v=>v.goods_id === goods_id);
    cart[index].checked = !cart[index].checked;
    //把购物车数据重新设置会data和缓存中
    this.setCart(cart); 
  },

//设置购物车状态 重新计算 价格等等
  setCart(cart){
     // 这样做费性能，因为下面也做了一个遍历
    // const allchecked = cart.length?cart.every(v=>v.checked):false;
    let allchecked = true;
    // 总额 总量
    let totalNum = 0;
    let totalPrice = 0;
    //遍历
    cart.forEach(v => {
      if(v.checked){
        totalNum +=v.num;
        totalPrice +=v.num*v.goods_price;
      }else{
        allchecked = false;
      }
    });
    //判断是否为空数组
    allchecked = cart.length!=0?allchecked:false;
    // console.log(allchecked);u
    this.setData({
        cart,
        allchecked,
        totalNum,
        totalPrice
      });
      wx.setStorageSync("cart", cart);
  },
  //全选 反选
  handItemAllchecked(){
    //1、获取data的值
    let {cart,allchecked} = this.data;
// 2、  修改值
    allchecked = !allchecked;
// 3 循环修改cart数组选中的值
    cart.forEach(v=>v.checked = allchecked);
//4 把设置好的值 填充回data
    this.setCart(cart)
  },
  //  商品数量的修改
  async handItemNumEdit(e){
    //获取穿过来的数据
    let{id,operation} = e.currentTarget.dataset;
    // 获取购物车数组
    let {cart} = this.data;
    // 找到需要修改的商品的索引
    let index = cart.findIndex(v=>v.goods_id === id);
    //当数量为1得时候点击-号的时候 提示为删除
    //当数量为1的时候，用户点击-号
    if (cart[index].num ===1 && operation === -1) {
      const res = await showModel({content:'您是否要删除该商品？'});
      if (res.confirm) {
        cart.splice(index,1);
        //重新填充数据 
         this.setCart(cart);
      }
    }else{
        // 进行修改
        cart[index].num += operation;
    //把修改的数据
    this.setCart(cart)
    }
  },
  //结功能
  handlePay(){
    //判断收货地址是否存在
    const {address,totalNum} = this.data;
    //address.userName 因为userName里面有值和无值会返回false true
    // 如果是address这个对象是否有值都是放回tru
    if (!address.userName) {
      showToast({title:'您还没有选择收货地址'});
      return;
    }
    // 判断totalNum
    if (totalNum === 0) {
      showToast({title:'您还没有选择商品'});
      return;
    };
    // 、、跳转测试 
    wx.navigateTo({
      url: '/pages/pay/index',
    });
  }
})