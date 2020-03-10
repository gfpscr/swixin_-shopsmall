//  Promise 形式 getSetting
export const getSetting =() =>{
    return new Promise((res,rej)=>{
          wx.getSetting({
              success: (result) => {
                  res(result)
              },
              fail: (err) => {
                  rej(err)
              },
          });
               
    })
}

//  Promise 形式 getSetting
export const chooseAddress = () =>{
    return new Promise((res,rej)=>{
          wx.chooseAddress({
              success: (result) => {
                  res(result)
              },
              fail: (err) => {
                  rej(err)
              },
          });        
    })
}

//  Promise 形式 getSetting
export const openSetting = () =>{
    return new Promise((res,rej)=>{
          wx.openSetting({
              success: (result) => {
                  res(result)
              },
              fail: (err) => {
                  rej(err)
              },
          });
               
    })
}

//  Promise 形式 showModel
export const showModel = ({content}) =>{
    return new Promise((res,rej)=>{
        wx.showModal({
            title: '删除',
            content: content,
            success:(result)=>{
                 res(result);
            },
            fail:(err)=>{
                rej(err)
            }

          })
    })
}

//  Promise 形式 showToast
export const showToast = ({title}) =>{
    return new Promise((res,rej)=>{
        wx.showToast({
            title: title,
            icon:'success',
            success:(result)=>{
                 res(result);
            },
            fail:(err)=>{
                rej(err)
            }

          })
    })
}

//  Promise 形式 login
export const login = () =>{
    return new Promise((res,rej)=>{
        wx.login({
          fail: (err) => {
              rej(err)
          },
          success: (result) => {
              res(result)
          },
          timeout: 1000,
        })
    })
}
