// pages/priceCenter/priceCenter.js
const api = require('../../config/api.js')
const util = require('../../utils/util.js')


// pages/mine/mine.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    searchBottom: [],
    pressHidden: true,
    pingming: '',
    caizhi: '',
    guige: '',
    yali: '',
    fid: '',
    cid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getPriceAllList:function(){
    var that = this;
    util.request(api.PriceListAll).then(function(res){
      console.log(res)
      if(res.code ==200){
        that.setData({
          containerBottom: res.data
        })
      }
    })
  },



  onLoad: function (options) {
    if(options.type == 'all'){
      this.getPriceAllList();
    }
    console.log(options)
    var that = this;
    that.setData({
      cid: options.texture,
      fid: options.cateid,
      guige: options.specification,
      yali: options.pressure
    })
    this.getData();
  },

  getData:function(){
    var that = this;
     console.log(that.data.fid)
     console.log(that.data.cid)
     console.log(that.data.guige)
     console.log(that.data.yali)
    util.request(api.PricePublish, { cateid: that.data.fid, texture: that.data.cid, specification: that.data.guige, pressure: that.data.yali }).then(function (res){
      console.log(res)
      if(res.code ==200){
        that.setData({
          containerBottom:res.data
        })
      }
  
})
},


// 点击公司名称，进入公司详情页
  btnCompany:function(e){
    console.log(e)
  wx.navigateTo({
    url: '/pages/companyProfile/companyProfile?id=' + e.currentTarget.dataset.company_id,
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