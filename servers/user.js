// 引入文件
const util = require('../utils/util.js');
const api = require('../config/api.js')
const app = getApp();

// 调用微信登陆
function loginByWeiXin(){
  // 首先让code--登陆凭证为空
  let code = null;
  return new Promise(function(resolve, reject){
    return util.login().then((res)=>{
      console.log(res)
      code = res.code;
      console.log(code)
      return util.getUserInfo();
    }).then((userInfo)=>{
      console.log(code)
      console.log(getApp().globalData.AppID)
      console.log(userInfo)
      // 登陆远程服务器
      console.log('你好啊')
      util.request(api.WxLogin, { code: code, appkey: getApp().globalData.AppID,  userInfo: userInfo},'POST').then(res=>{
        console.log(res)
        if(res.code ==200){
          // 存储用户信息
          console.log('进来了吗')
          wx.setStorageSync('userInfo', res.data.userinfo.userInfo);
          wx.setStorageSync('token', res.data.token);
          wx.setStorageSync('userId', res.data.user_id.id);
          wx.setStorageSync('openid', res.data.openid);
          resolve(res);
        }else{
          reject(res);
        }
      }).catch((err)=>{
        reject(err);
      })
    }).catch((err)=>{
      reject(err)
    })
  })
}

// 判断用户是否登录
function checkLogin(){
  return new Promise(function(resolve,reject){
    if(wx.getStorageSync('userId') && wx.getStorageSync('token')){
      util.checkSession().then(()=>{
        resolve(ture);
      }).catch(()=>{
        reject(false);
      })
    }else{
      reject(false)
    }
  })
}


module.exports={
  loginByWeiXin,
  checkLogin
}