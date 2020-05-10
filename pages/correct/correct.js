// pages/correct/correct.js
const api = require('../../config/api.js')
const util = require('../../utils/util.js')
const QQMapWX = require('../../servers/qqmap-wx-jssdk.js')
//index.js
//获取应用实例

// pages/mine/mine.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classs:'',
    geduanHidden:true,
    amendBoxHidden:true,
    amentContent:[],
    name:'',
    city:'',
    titles:'',
    province:'',
    placeFrameHidden:true,
    regionList:'',
    id:'',
    pName:'',
    pid:'',
    cName:'',
    sid:'',
    num:0,
    aid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   console.log(options)
   var that = this;
   that.setData({
     classs:options.classs,
     id:options.id
   })
   that.getUserName();
  //  that.geLocationPlace();







  },


  // 昵称事件
  getUserName:function(){
    var that = this;
    that.setData({
      name: getApp().globalData.userInfo.nickName
    })
  },


  // 点击分类，选择分类
  // 点击分类，显示弹框
  btnClass:function(){
  var that = this;
  that.setData({
    geduanHidden:false,
    amendBoxHidden:false
  })


    util.request(api.LeftClass).then(function (res) {
      console.log(res)
      if (res.code == 200) {
        that.setData({
          amentContent: res.data
        })
      }
    })
  },

  // 点击关闭弹框
  closeAmend:function(){
 var that =this;
 that.setData({
   geduanHidden: true,
   amendBoxHidden:true
 })
  },

// 点击弹框里面的事件
  btncate_name:function(e){
  var that = this;
  that.setData({
    classs:e.currentTarget.dataset.cate_name,
    id:e.currentTarget.dataset.id,
      geduanHidden: true,
    amendBoxHidden: true
  })
  },

// 获取当前定位
  // geLocationPlace:function(){
  //   var that = this;
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


  // },



// 点击定位城市
  btnLocation:function(){
  var that = this;
  that.setData({
    placeFrameHidden:false,
    geduanHidden:false
  })

    that.getRegionList();
  },



// 点击定位城市的弹框的确定
  btnSure:function(){
   var that = this;
   that.setData({
     placeFrameHidden: true,
     geduanHidden: true
   })
  },
  

  // 点击所在地区---选择省份市区

  // 进行地址数据请求
  getRegionList: function () {
    var that = this;
    util.request(api.ShenPrice).then(function (res) {
      console.log(res)
      if (res.code == 200) {
        that.setData({
          regionList: res.data
        })
      }
    })

  },

//   province
// city



  // 给获取到的省份市区添加点击事件
  selectRegion: function (e) {
    var that = this;
    that.setData({
      num:1
    })
    console.log(e)
    that.data.pid = e.currentTarget.dataset.id
    var types = e.currentTarget.dataset.type
    that.data.pName = e.currentTarget.dataset.district_name
    that.data.cName = e.currentTarget.dataset.district_name
    if (types == 1) {
      that.setData({
        provinceModiy: that.data.pName,
        province:that.data.pName
      })
      console.log('我是省')
      wx.setStorage({
        key: 'province',
        data: that.data.pName,
      })
    } else if (types == 2) {
      console.log(e)
        wx.setStorage({
          key: 'aids',
          data: e.currentTarget.dataset.id,
        })
      that.setData({
        sid:e.currentTarget.dataset.id,
        aid:e.currentTarget.dataset.id,
        cityModiy: that.data.cName,
        city:that.data.cName
      })
      // console.log(aid)
      wx.setStorage({
        key: 'city',
        data: that.data.cName,
      })
      console.log('我是市区')
      return
    }
    this.city();
  },

  city: function () {
    var that = this;
    util.request(api.City, { id: that.data.pid }).then(function (res) {
      console.log(res)
      if (res.code == 200) {
        that.setData({
          regionList: res.data
        })
      }
    })
  },


// 点击确定
  saveModify:function(){
    console.log(getApp().globalData.userInfo)
    console.log(getApp().globalData.userInfo.user_id.id)
   var that = this;
    if (that.data.province == '' || that.data.city==''){
      wx.showModal({
        title: '请选择城市信息',
        content: '',
      })
    }else{
      util.request(api.ModifyUserInof, { id: getApp().globalData.userInfo.user_id.id, type: that.data.id, city: that.data.sid }, 'POST').then(function (res) {
        console.log(res)
        if(res.code ==200){
          wx.showToast({
            title: '提交信息成功',
          })
          wx.navigateBack({
            
          })
        }
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
    var that = this;
    wx.getStorage({
      key: 'province',
      success: function (res) {
         that.setData({
           province:res.data
         })
      },
    })

    wx.getStorage({
      key: 'city',
      success: function (res) {
        console.log(res)
        that.setData({
          city:res.data
        })
      },
    })
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