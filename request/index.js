//不在第一次发生请求就关闭
//关闭下拉列表 和 多次加载效果 
let ajaxTime = 0;
export const request=(params)=>{
    ajaxTime++;
    // console.log(ajaxTime);
    //添加一个加载图标
    wx.showLoading({
        title: "加载中",
        mask: true,//在数据没有加载出来，用户不就可以有什么操作
    });
      
    const baseUrl ="https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve,reject) =>{
        wx.request({
            ...params,
            url:baseUrl + params.url,
            success:(res)=>{
                resolve(res.data.message);
            },
            fail:(err)=>{
                reject(err);
            },
            //不管数据加载成功还是失败都要执行
            complete: () => {
                ajaxTime-- ;
                // console.log(ajaxTime)
                if (ajaxTime === 0) {
                //关闭正在等待的图标
                    wx.hideLoading();
                }
           
            }
        })
    })
}