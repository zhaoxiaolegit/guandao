const api = require('../../config/api.js')
const util = require('../../utils/util.js')
//index.js
//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //tabbar
    tabbar: {},
    pruchase: [],
    productimg: [],
    productSplice: '',
    active: false,
    id: 0,
    textHidden:false,
    telHidden:true, //隐藏电话
    },
  // 获取采购信息接口
  purchase: function () {
    console.log(getApp().globalData.userInfo)
    var that = this;
    util.request(api.IndexCai).then(function (res) {
      if (res.code == 200) {
        that.setData({
          pruchase: res.data
        })
      }

    })
  },

  // 图片
  btnimga: function (e) {
    var that = this
    that.data.src = e.currentTarget.dataset.path
    var arr = [];
    arr.push(that.data.src)
    wx.previewImage({
      urls: arr

    })

  },
  btnimgb: function (e) {
    var that = this
    that.data.src = e.currentTarget.dataset.path
    var arr = [];
    arr.push(that.data.src)
    wx.previewImage({
      urls: arr

    })

  },
  btnimgc: function (e) {
    var that = this
    that.data.src = e.currentTarget.dataset.path
    var arr = [];
    arr.push(that.data.src)
    wx.previewImage({
      urls: arr

    })

  },
  btnimgd: function (e) {
    var that = this
    that.data.src = e.currentTarget.dataset.path
    var arr = [];
    arr.push(that.data.src)
    wx.previewImage({
      urls: arr

    })

  },




  // 点击全文展示
  btnAllContent: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    that.setData({
      active: true,
      textHidden:true
    })

  },



  // 点击参与报价
  btnJoin: function (e) {

    if (getApp().globalData.token == '' || getApp().globalData.token == null || getApp().globalData.token == undefined) {
      wx.navigateTo({
        url: '/pages/auth/wxlogin/wxlogin',
      })
    }



    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/joinOffer/joinOffer?id' + id,
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
    this.purchase(); //采购信息
    this.telData();
  },


  telData(){
    var that = this;
   if(getApp().globalData.userInfo.pay.pay == null){
      that.setData({
        telHidden:true
      })
   }else{
     that.setData({
       telHidden:false
     })
   }
  

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
    this.telData();
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