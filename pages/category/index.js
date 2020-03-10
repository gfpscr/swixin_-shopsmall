import {request} from '../../request/index.js'

// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  //左边的数据
  leftMenuList:[],
  //右边的商品数据
  rightContent:[],
  //接口返回数据
  cates:[],
  //点击左侧菜单变色
  currentIndex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCates();
// 1、获取本地存储中的数据
const cates = wx.getStorageSync("Cates");
//2、判断本地服务有无值
if (!cates) {
  //不存在 
  this.getCates();
}else{
//有旧数据
// 1、判断是否过期
  if (Date.now()-cates.time>1000*10) {
    this.getCates();
  }else{
    this.cates = cates.data;
    let leftMenuList = this.cates.map(v=>v.cat_name);
    //构造右侧的菜单数据
    let rightContent = this.cates[0].children;
    // console.log(rightContent)
    this.setData({
      leftMenuList,
      rightContent
    })
  }
}

  },

  //获取数据  async  表示同步
 async getCates(){
    // request({
    //   url:"/categories"
    // }).then((result)=>{
    //   // console.log(result.data.message);
    //   this.cates = result.data.message;
    //   //把接口的数据存入到本地存储
    //   wx.setStorageSync("Cates", {time:Date.now(),data:this.cates});
  
    //   //构造左侧的菜单数据
    //   let leftMenuList = this.cates.map(v=>v.cat_name);
    //   // console.log(leftMenuList);
    //   //构造右侧的菜单数据
    //   let rightContent = this.cates[0].children;
    //   // console.log(rightContent)
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })
  // 1、使用es7的async  await 来发送请求
  const result = await request({
    url:"/categories"
  })
  this.cates = result;
      //把接口的数据存入到本地存储
      wx.setStorageSync("Cates", {time:Date.now(),data:this.cates});
  
      //构造左侧的菜单数据
      let leftMenuList = this.cates.map(v=>v.cat_name);
      // console.log(leftMenuList);
      //构造右侧的菜单数据
      let rightContent = this.cates[0].children;
      // console.log(rightContent)
      this.setData({
        leftMenuList,
        rightContent
      })
  },
  //左侧菜单的点击事件
  handleItemTap(e){
    // console.log(e.currentTarget.dataset.index)
    // this的方案行不通
    // this.currentIndex = e.currentTarget.dataset.index;
    // console.log(this.currentIndex)

    //这种可行
    const {index} = e.currentTarget.dataset;
    let rightContent = this.cates[index].children;
    this.setData({
        currentIndex:index,
        rightContent
      })
  }
})