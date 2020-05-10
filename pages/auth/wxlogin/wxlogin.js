// pages/wxlogin/wxlogin.js
const api = require('../../../config/api.js')
const user = require('../../../servers/user.js')
const util = require('../../../utils/util.js')
var feedbackApi = require('../../../template/showToast');//引入消息提醒暴露的接口  


var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 点击登陆
  userInfoHandler: function () {
    wx.showLoading({
      title: '正在登陆中……',
    })
    user.loginByWeiXin().then(res => {
      console.log('数据接收成功打印下面的res')
      console.log(res)
      this.setData({
        userInfo: res.data.userinfo.userInfo,
     
      });
      app.globalData.userInfo = res.data.userinfo.userInfo;
      app.globalData.token = res.data.token;
      console.log(getApp().globalData.userInfo);
      wx.hideLoading();
       wx.navigateBack({
         
       })
    }).catch((err) => {
      console.log(err)
      wx.hideLoading();
    })




  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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