// pages/privateDetail/privateDetail.js
const api = require('../../config/api.js')
const util = require('../../utils/util.js')
//index.js
//获取应用实例

// pages/mine/mine.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  id:0,
    lgisticsDetail:[],
    payMethods:[
      { id: 0, meth: '到付' },
      { id: 1, meth: '现付' },
      { id: 2, meth: '回单' },
      { id: 3, meth: '月结' },
    ],
    status:'',

    goodsName:'',//货物名称
    maddress:'', // 目的地
    number:'',  //数量
    total:'', //共计
    volume:'', //体积
    tel:'',//电话
    cid:'', //公司id
    ctel:'', //公司电话
    contacts:'', //联系人
    type:'', //付款方式
    companyLatitude:'', //物流公司的纬度
    companyLongitude:'', //物流公司的经度
    userLatitude:'', //用户的维度
    userLongitude:'',//用户的经度
    distance:'',
  },








  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.data. id = options.id



    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log("当前坐标信息：", res)
        that.setData({
          userLatitude: res.latitude,
          userLongitude: res.longitude
        })
      // var distance = that.distance(that.data.userLatitude, that.data.userLongitude, that.data.companyLatitude, that.data.companyLongitude);
      // console.log("当前位置距离：", distance, "千米")
      // that.setData({
      //   distance:distance
      // })
        that.getDetail();
      }
    })
















    // this.distance();




    
  },

  getDetail:function(){
    var that  =this;
    util.request(api.LogisticsDetail,{id:that.data.id}).then(function(res){
      console.log(res)
      if(res.code ==200){
        that.setData({
          lgisticsDetail:res.data,
          cid:res.data.id,
          ctel: res.data.tel,
          companyLatitude: res.data.latitude,
          companyLongitude: res.data.longitude
        })
      }
      var distance = that.distance(that.data.userLatitude, that.data.userLongitude, that.data.companyLatitude, that.data.companyLongitude);
      console.log("当前位置距离：", distance, "千米")
      that.setData({
        distance:distance
      })


    })
  },


// 拿到货物名称
  btnGodds:function(e){
  console.log(e.detail.value)
  var that = this;
  that.setData({
    goodsName:e.detail.value
  })
  },

  // 拿到目的地值
  btnMudi:function(e){
   var that =this;
   that.setData({
     maddress:e.detail.value
   })
  },

  // 拿到数量
  btnNumber:function(e){
 var that = this;
 that.setData({
   number:e.detail.value
 })
},

// 拿到共计
  btntotal:function(e){
 var that = this;
 that.setData({
  total:e.detail.value
 })
  },

// 拿到体积
  btnTiji:function(e){
 var that =this;
 that.setData({
   volume:e.detail.value
 })
    console.log(that.data.volume)
  },

  // 拿到电话
  btntel:function(e){
 var that = this;
 that.setData({
   tel:e.detail.value
 })
  },

//拿到联系人
  btncontactUser:function(e){
  var that = this;
  that.setData({
    contacts:e.detail.value
  })
  },


// 拿到付款方式
  btnType:function(e){
  console.log(e)
  var that = this;
  that.setData({
    type: e.currentTarget.dataset.meth,
    status:e.currentTarget.dataset.index
  })
  },



  distance: function (la1, lo1, la2, lo2) {
    var La1 = la1 * Math.PI / 180.0;
    var La2 = la2 * Math.PI / 180.0;
    var La3 = La1 - La2;
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    s = s.toFixed(2);
    return s;
  },





  // 提交订单的点击事件
  btnPublishOrder:function(){
    var that =this;
    if (that.data.goodsName ==''){
      wx.showModal({
        title: '货物名城不能为空',
      })
    } else if (that.data.maddress ==''){
      wx.showModal({
        title: '目的地不能为空',
      })
    } else if (that.data.number == ''){
      wx.showModal({
        title: '数量不能为空',
      })
    } else if (that.data.total ==''){
      wx.showModal({
        title: '共计不能为空',
      })
    } else if (that.data.volume ==''){
      wx.showModal({
        title: '体积不能为空',
      })
    } else if (that.data.tel==''){
      wx.showModal({
        title: '电话不能为空',
      })
    } else if (that.data.contacts == ''){
      wx.showModal({
        title: '联系人不能为空',
      })
    }else{
      that.publishData()
    }


  },

publishData:function(){

  var that = this;
  util.request(api.AddressGoods, { tel: that.data.tel, tel_name: that.data.contacts, goods_name: that.data.goodsName, company_id: that.data.cid, number: that.data.number, bulk: that.data.volume, weight: that.data.total, end_address: that.data.maddress, user_id: getApp().globalData.userInfo.user_id.id, company_tel: that.data.ctel, type: that.data.type }, 'POST').then(function (res) {
    console.log(res)
    if (res.code == 200) {
      wx.showModal({
        title: '订单提交成功',
        success(){
          wx.navigateBack({

          })
        }
      })
     
    } else {
      wx.showModal({
        title: '订单提交失败',
      })
    }
  })


},






// 开始进行导航事件
  btnNavigation:function(){
    var that = this;
    wx.openLocation({
      latitude: Number(that.data.companyLatitude),
      longitude: Number(that.data.companyLongitude),
      name:1321,
      scale: 28
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