// pages/listDetails/listDetails.js
const api = require('../../config/api.js')
const util = require('../../utils/util.js')

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailInformation:[],
    id:0,
    name:'',
    tel:'',
    image:'',
    customer:'',
    price:'',
    number:'',
    userId:'',
    beizhu:'',
    title:'title',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that =this;
     that.data.id = options.id
     that.getDetail();
  },
  getDetail:function(){
    var that =this;
    util.request(api.PlinListDetail,{id:that.data.id}).then(function(res){
      console.log(res)
      if(res.code ==200){
        that.setData({
          detailInformation:res.data,
          name: res.data.title,
          image: res.data.filepath,
          price: res.data.price,

        })
      }
    })
  },

// 获取客户名
  btnName:function(e){
    console.log(e.detail.value)
    var that =this;
    that.setData({
      customer:e.detail.value
    })

  },

  // 获取电话
  btnTel:function(e){
  var that = this;
  that.setData({
    tel:e.detail.value
  })
  },

  //获取数量
  btnNumber:function(e){
  var that =this;
  that.setData({
    number:e.detail.value
  })
  },

  // 获取备注信息
  btnBeizhu:function(e){
 var that = this;
 that.setData({
   beizhu:e.detail.value
 })
  },



// 拼单生产接口
  btnSpell:function(){
    var that =this;

    if (that.data.customer==''){
      wx.showModal({
        title: '客户名不能为空',
      })
      return
    } else if (that.data.tel == ''){
      wx.showModal({
        title: '电话不能为空',
      })
    } else if (that.data.number == ''){
      wx.showModal({
        title: '数量不能为空',
      })
    }else{
      that.getgoodsData()
    }
  },

  getgoodsData:function(){
    var that = this;
    util.request(api.SpellOrder, { share_id: that.data.id, share_name: that.data.name, tel: that.data.tel, tel_name: that.data.customer, count: that.data.number, price: that.data.price, user_id: getApp().globalData.userInfo.user_id.id, title: that.data.title }, 'POST').then(function (res) {
      console.log(res)
      if (res.code == 200) {
        wx.showModal({
          title: '提交成功',
          success(){
            wx.navigateBack({
              
            })
          }
        })
      } else {
        wx.showModal({
          title: '提交失败',
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