// pages/companyProfile/companyProfile.js
const api = require('../../config/api.js')
const util = require('../../utils/util.js')


// pages/mine/mine.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyImage:[
      {id:0,img:'../../static/images/d.png'}
    ],
    goodslist:[],
    id:0,
    username:'',
    tel:'',
    address:'',
    nick_name:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
     console.log(options)
     that.setData({
       id:options.id
     })
     that.getData();
     that.getList();
  },

  getData:function(){
    var that =this;
    util.request(api.CompanyDetailInformation,{id:that.data.id}).then(function(res){
      console.log(res)
      if(res.code ==200){
        that.setData({
          username:res.data.name,
          tel:res.data.tel,
          address: res.data.address,
          nick_name:res.data.nick_name,

        })
      }
    })
  },


// 下面的列表
  getList:function(){
    var that  =this;
    util.request(api.CompanyDetailList, { id: that.data.id}).then(function(res){
      console.log(res)
      if(res.code ==200){
        that.setData({
          goodslist:res.data
        })
      }
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