// pages/checkLogistics/checkLogistics.js
const api = require('../../config/api.js')
const util = require('../../utils/util.js')
const QQMapWX = require('../../servers/qqmap-wx-jssdk.js')

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logisticInformation:[],
    cvalue:'',
    mvalue:'',
    result:[],
    list:[],
    middleValue:'',
    chufadi:'', //出发地
    mudidi:'', //目的地
    onOff:true,
    city:'沧州',
    citys:'',
    titles:'',
    userLatitude:'', //用户的维度
    userLongitude:'', //经度
    companyLatitude:'',//物流公司的纬度
    companyLongitude:'', //物流公司的经度
    distance:'',

  },


// 这是出发地的值
  btnChu:function(e){
   var that = this;
   that.setData({
     cvalue:e.detail.value
   })
 
  },

  // 这是目的地的值
  btnMudi:function(e){
    var that = this;
    that.setData({
      mvalue:e.detail.value
    })
  
  },



// 点击搜索路线
  btnSearchLine:function(){
    var that = this;
   if(that.data.cvalue==''||that.data.mvalue==''){
     wx.showModal({
       title: '出发地和目的地不能为空',
       content: '',
     })
   }else{
     console.log('你好')
     util.request(api.LogisticsSearch, { start_address: that.data.cvalue, end_address: that.data.mvalue }).then(function (res) {
       console.log(res)
       if (res.code == 200) {
         that.setData({
           result: res.data
         })
         getApp().globalData.list.push(that.data.result)
         wx.navigateTo({
           url: '/pages/searchResult/searchResult?start=' + that.data.cvalue + '&end=' + that.data.mvalue
         })
       }

     })
   }
  },

// 定位模块
  getLocation:function(){
  //  var that = this;
  //   this.qqmapsdk = new QQMapWX({
  //     key: '6Q6BZ-BUOEU-AWKVT-4XDVA-3YYS6-IEBQJ'
  // })

  //   wx.getLocation({
  //     success: res => {
  //       console.log(res);
  //  that.setData({
  //    userLatitude: res.latitude,
  //    userLongitude: res.longitude,
  //  })
     

  //       //调用接口 
  //       this.qqmapsdk.reverseGeocoder({
  //         location: {
  //           latitude: res.latitude,
  //           longitude: res.longitude
  //         },
  //         success: res => {
  //           console.log("获取当前城市", res.result.address_component.city);
  //           console.log("获取当前城市完整信息", res.result.address);
  //           //调用网络数据
  //           this.setData({
  //             city: res.result.address_component.city, //城市为获取的城市
  //             titles: res.result.address //当前城市完整信息
  //           })
  //         }
  //       })


  //     }
  //   })
  },

  

// 直线距离问题


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



// @desc 由经纬度计算两点之间的距离，la为latitude缩写，lo为longitude
// * @param la1 第一个坐标点的纬度 --用户的维度
// * @param lo1 第一个坐标点的经度--用户的经度
// * @param la2 第二个坐标点的纬度---公司的维度
// * @param lo2 第二个坐标点的经度  --公司的经度
// * @return (int)s   返回距离(单位千米或公里)
// * @tips 注意经度和纬度参数别传反了，一般经度为0~180、纬度为0~90
  











  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this;
 
// this.getLocation();

   
    that.qqmapsdk = new QQMapWX({
      key: '6Q6BZ-BUOEU-AWKVT-4XDVA-3YYS6-IEBQJ'
    })


    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log("当前坐标信息：", res)
        that.setData({
          userLatitude: res.latitude,
          userLongitude: res.longitude
        })

        that.Logistics();

        //调用接口 
        that.qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: res => {
            console.log("获取当前城市", res.result.address_component.city);
            console.log("获取当前城市完整信息", res.result.address);
            //调用网络数据
            that.setData({
              city: res.result.address_component.city, //城市为获取的城市
              titles: res.result.address //当前城市完整信息
            })
          }
        })
      



      },
      fail(err){
        that.Logistics();
      }
    })





  },

// 物流公司列表接口
  Logistics:function(){
    var that = this;
    util.request(api.LogisticsCompany).then(function(res){
      console.log(res)
      if(res.code ==200){
        that.setData({
          logisticInformation:res.data
        })
        console.log(res.data.length)
        for (var i = 0; i < that.data.logisticInformation.length;i++){
          that.setData({
            companyLatitude: that.data.logisticInformation[i].latitude,
            companyLongitude: that.data.logisticInformation[i].longitude
          })
       var distance = that.distance(that.data.userLatitude, that.data.userLongitude, that.data.companyLatitude,        that.data.companyLongitude);


  // 向数组里面添加一个属性--distance
          that.data.logisticInformation[i].distance=distance;

        that.setData({
          logisticInformation: that.data.logisticInformation
        })

        }
       
      }
    })
  },

// 点击物流公司事件
  btnDetail:function(e){
  var id = e.currentTarget.dataset.id
  wx.navigateTo({
    url: '/pages/privateDetail/privateDetail?id='+id,
  })
  },



// 点击交换目的地
  btnChange:function(){
   
   var that = this;
    if(that.data.onOff==true){
      that.setData({
        cvalue: that.data.mvalue,
        mvalue: that.data.cvalue,
        onOff:false
      })
    }else if(that.data.onOff==false){
      that.setData({
        cvalue:that.data.cvalue,
        mvalue: that.data.mvalue,
        onOff:true
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