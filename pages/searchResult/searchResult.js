// pages/searchResult/searchResult.js
const api = require('../../config/api.js')
const util = require('../../utils/util.js')

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   list:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   console.log(options)
var that = this
    util.request(api.LogisticsSearch, { start_address: options.start, end_address: options.end}).then(function(res){
      console.log(res)
      if(res.code ==200){
        that.setData({
          list: res.data
        })
      }
    })  
   


    
  },

// 列表公司的点击事件
  btnLIst:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/privateDetail/privateDetail?id=' + id,
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})