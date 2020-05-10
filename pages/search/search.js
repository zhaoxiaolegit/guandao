// pages/search/search.js
const api = require('../../config/api.js')
const util = require('../../utils/util.js')


// pages/mine/mine.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchBottom:[],
    pressHidden:true,
    pingming:'',
    caizhi:'',
    guige:'',
    guigess:'',
    yali:'',
    yalis:'',
    fid:'',
    cid:'',
    shelterhidden:true,
    productShelter:true,
    specificationHidden:true,  //规格的弹框
    caizhiShelter:true,  //材质的弹框
    pressureHidden:true, //压力的弹框
    guigeValue:[], //规格
    caizhiValue:[], //材质
   status:'',

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   console.log(options)
   var that = this;
    if (options.LId == 2 || options.LId==3){
       that.setData({
         cid:options.id,
         fid:options.LId,
         pressHidden: false,
         pingming: options.pingming,
         caizhi: options.caizhiName,
         guigess: options.guigeValue,
         yalis: options.pressValue
       })
    }else{
      that.setData({
        cid: options.id,
        fid: options.LId,
        pingming: options.pingming,
        caizhi: options.caizhiName,
        guigess: options.guigeValue
      })
    }
    that.getDataPage();
  },

  getDataPage:function(){
    var that =this;
    console.log(getApp().globalData.userInfo)
    util.request(api.PricePublish, { cateid: that.data.fid, texture: that.data.cid, specification: that.data.guigess, pressure: that.data.yalis, company_id: getApp().globalData.userInfo.company_id.company}).then(function(res){
      console.log(res)
      if(res.code ==200){
        that.setData({
          searchBottom:res.data
        })
      }
    })
  },
  



  // 点击价格更新表中的更多,进行支付功能，支付成功之后再进行页面跳转到有公司名称页面的价格表
  btnMore:function(e){
    var that = this;
    if (getApp().globalData.userInfo.pay.pay ==null){
      util.request(api.PayGoods, { price: 0.01, openid: getApp().globalData.userInfo.openid}, 'POST').then(function(res){
        console.log(res)
        if(res.code ==200){
          var payData = res.data.data_pay_sign
          wx.requestPayment({
            timeStamp: payData.timeStamp,
            nonceStr: payData.nonceStr,
            package: payData.package,
            signType: payData.signType,
            paySign: payData.paySign,
            success(res){
              console.log(res)
              console.log(getApp().globalData.userInfo)
                wx.navigateTo({
                  url: '/pages/priceCenter/priceCenter?id=' + e.currentTarget.dataset.company_id + '&cateid=' + that.data.fid + '&texture=' + that.data.cid + '&specification=' + that.data.guigess + '&pressure=' + that.data.yalis
                })
            
            }
          })
        }
      })
    }else{
      // 第一次支付成功之后，在这里和一个月之后的时间进行比较，若是时间在一个月之内，则可以进行直接跳转，若是一个月之外，则需要继续支付
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000;
      console.log("当前时间戳为：" + timestamp);
      if(getApp().globalData.userInfo.pay.pay - timestamp >0){
         wx.navigateTo({
    url: '/pages/priceCenter/priceCenter?id=' + e.currentTarget.dataset.company_id + '&cateid=' + that.data.fid + '&texture=' + that.data.cid + '&specification=' + that.data.guigess + '&pressure=' + that.data.yalis
    })
      }else{
        wx.showModal({
          title: '您的会员时间已到期，请续费',
          content: '',
          success(){
            util.request(api.PayGoods, { price: 0.01, openid: getApp().globalData.userInfo.openid }, 'POST').then(function (res) {
              console.log(res)
              if (res.code == 200) {
                var payData = res.data.data_pay_sign
                wx.requestPayment({
                  timeStamp: payData.timeStamp,
                  nonceStr: payData.nonceStr,
                  package: payData.package,
                  signType: payData.signType,
                  paySign: payData.paySign,
                  success(res) {
                    console.log(res)
                    console.log(getApp().globalData.userInfo)
                    wx.navigateTo({
                      url: '/pages/priceCenter/priceCenter?id=' + e.currentTarget.dataset.company_id + '&cateid=' + that.data.fid + '&texture=' + that.data.cid + '&specification=' + that.data.guigess + '&pressure=' + that.data.yalis
                    })

                  }
                })
              }
            })
          }
        })
      }
    }
 
  },



// 点击品名
  btnPinming:function(){
  var that = this;
  that.setData({
    shelterhidden:false,
productShelter:false,
  })
    util.request(api.RightClass, { id: that.data.fid}).then(function(res){
      console.log(res)
      if(res.code ==200){
        that.setData({
          guigeValue:res.data
          
        })
      }
    })

  },

// 品名弹框的各种点击事件
  btnpinming:function(e){
    var that =this;
   console.log(e)
   var id = e.currentTarget.dataset.id
   that.setData({
     pingming: e.currentTarget.dataset.cate_name,
    cid:e.currentTarget.dataset.id,
     status:e.currentTarget.dataset.index

   })
    that.getDataPage();
   
  },







// // 点击品名弹框
  btnClose:function(){
  var that =this;
  that.setData({
    shelterhidden: true,
    productShelter: true,
  })
  },



// 点击材质
  btnCaizhi:function(){
  var that =this;
  that.setData({
    shelterhidden: false,
    caizhiShelter:false
  })
    util.request(api.CaizhiInfo,{id:that.data.fid}).then(function(res){
      console.log(res)
      if(res.code ==200){
        that.setData({
          caizhiValue:res.data
        })
      }
    })


  },

  // 点击材质的确定
  btncaizhiclaose:function(){
    var that =this;
    that.setData({
      shelterhidden: true,
      caizhiShelter: true
    })
  },

// 材质弹框里面的点击事件
  btncaizhibottom:function(e){
  console.log(e)
  var that =this;
  that.setData({
    caizhi:e.currentTarget.dataset.texture,
    cid:e.currentTarget.dataset.id,
    status: e.currentTarget.dataset.index
  })
 that.getDataPage();
  },










// 点击规格
  btnGuige:function(){
 var that = this;
   that.setData({
     shelterhidden: false,
     specificationHidden:false,
   })
  },


  // 点击规格弹框的确定
  btnguigeSure:function(){
  var that = this;
  that.setData({
    shelterhidden: true,
    specificationHidden: true,
  })
  },

// 规格弹框里面的事件
  btnguigebottom:function(e){
   console.log(e) 
   var that =this;
   var guigez = e.detail.value
   that.setData({
     guigess:guigez,
     guige: guigez,
   })
   that.getDataPage();
 
  },








// 点击压力
  btnHpressure:function(){
  var that = this;
  that.setData({
    shelterhidden: false,
    pressureHidden:false
  })
  },

  // 点击压力弹框的确定
  btnpressSure:function(){
 var that =this;
 that.setData({
   shelterhidden: true,
   pressureHidden: true
 })
  },

// 压力弹框的事件
  btnpress:function(e){
var that =this;
var yaliz = e.detail.value
that.setData({
     yalis:yaliz,
     yali:yaliz,
})
that.getDataPage();
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