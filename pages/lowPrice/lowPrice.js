const api = require('../../config/api.js')
const util = require('../../utils/util.js')
//index.js
//获取应用实例
const app = getApp()
// pages/lowPrice/lowPrice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pruchase: [],
    productimg: [],
    page:1,
    size:20,
    textHidden: false,
    active: false,

  },


// 获取低价处理页面列表
  getListData:function(page,size){
    var that = this;
    util.request(api.LowPrice,{page:page,size:size}).then(function(res){
      console.log(res)
      if(res.code ==200){
         that.setData({
           pruchase:res.data
         })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getListData(this.data.page,this.data.size)
  },

//点击图片的操作
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

// 点击全文
  btnAllContent: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    console.log(id)
    that.setData({
      active: true,
      textHidden: true
    })

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
   var that =this;
   that.setData({
     page:that.data.page+1
   })
    that.getListData(that.data.page,that.data.size)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})