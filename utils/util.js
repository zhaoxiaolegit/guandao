var api = require('../config/api.js');

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "GET") {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'X-Nideshop-Token': wx.getStorageSync('token'),
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          if (res.data.code == 401) {
            //需要登录后才可以操作
            let code = null;
            return login().then((res) => {
              code = res.code;
              return getUserInfo();
            }).then((userInfo) => {
              //登录远程服务器
              console.log(code)
              console.log(userInfo)
              console.log(getApp().globalData.AppID)
              request(api.WxLogin, { code: code, userInfo: userInfo, appkey: getApp().globalData.AppID }, 'POST').then(res => {
                console.log(res)
                if (res.code == 200) {
                  //存储用户信息
                  wx.setStorageSync('userInfo', res.data.userInfo.userInfo);
                  wx.setStorageSync('token', res.data.token);
                  resolve(res);
                } else {
                  reject(res);
                }
              }).catch((err) => {
                reject(err);
              });
            }).catch((err) => {
              reject(err);
            })
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }
      },
      fail: function (err) {
        reject(err)
        console.log("failed")
      }
    })
  });
}

/**
 * 检查微信会话是否过期
 */
function checkSession() {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: function () {
        resolve(true);
      },
      fail: function () {
        reject(false);
      }
    })
  });
}

/**
 * 调用微信登录
 */
function login() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          //登录远程服务器
          console.log(res)
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}

function getUserInfo() {
  return new Promise(function (resolve, reject) {
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        console.log(res)
        resolve(res);
      },
      fail: function (err) {
        wx.showModal({
          title: '授权提示',
          content: '小程序需要您的授权才能正常使用,请在个人中心登录授权',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              //去到设置中心界面
              wx.navigateTo({
                url: '/pages/auth/wxlogin/wxlogin',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
              reject(err);
            }
          }
        })
      }
    })
  });
}

function redirect(url) {

  //判断页面是否需要登录
  if (false) {
    wx.redirectTo({
      url: '/pages/auth/login/login'
    });
    return false;
  } else {
    wx.redirectTo({
      url: url
    });
  }
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: '/static/images/icon_error.png'
  })
}

function dayTimeArr(bb) {
  var bb = bb
  var day = parseInt(bb / 86400);
  var time = parseInt((bb - (day * 86400)) / 3600);
  var min = parseInt((bb - (time * 3600 + day * 86400)) / 60)
  var sinTime = time * 3600 + min * 60 + day * 86400
  var sinTimeb;
  var sin1 = parseInt((bb - sinTime))
  var timeArr = [addEge(day), addEge(time), addEge(min), addEge(sin1)];
  if (bb <= 0) {
    timeArr = ["00", "00", "00", "00"];
  }
  return timeArr
}

function addEge(a) {
  return a < 10 ? a = "0" + a : a = a
}

// 直接输出倒计时封装
function dayTime(bb) {
  var bb = bb
  var day = parseInt(bb / 86400);
  var time = parseInt((bb - (day * 86400)) / 3600);
  var min = parseInt((bb - (time * 3600 + day * 86400)) / 60)
  var sinTime = time * 3600 + min * 60 + day * 86400
  var sinTimeb;
  var sin1 = parseInt((bb - sinTime))
  var thisTime = addEge(day) + "天" + addEge(time) + ":" + addEge(min) + ":" + addEge(sin1);
  bb <= 0 ? thisTime = "0天00:00:00" : thisTime
  return thisTime
}

module.exports = {
  formatTime,
  request,
  redirect,
  showErrorToast,
  checkSession,
  login,
  getUserInfo,
  dayTimeArr,
  addEge,
  dayTime,
}


