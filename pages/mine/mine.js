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
    //tabbar
    tabbar: {},
    regionType:1,
    shelterLayerHidden:true,
    placeFrameHidden:true,
    selectRegionList:[],
    province:{},
    cangHidden:true,
    pid:0,
    province:{
      district_name:'省份'
    },
    city:{
      district_name:'城市'
    },
    provinces: {
      district_name: '省份'
    },
    citys: {
      district_name: '城市'
    },
    xian:{
      district_name: '县城'
    },
    type:0,
    pName:'',
    cName:'',
    regionList:{},
    cangIndex:{},
    cpName:'',
    cCname:'',
    cXname:'',
    cid :'',
    companyName:'', //企业全称
    companyProfile:'', // 企业简介
    managementModel:'', //经营模式
    business:'',//经营业务
    detailAddress:'', //详细地址
    warehouseAddress:'', //仓库地址
    ruZhuHidden:false,
    selfhidden:true,
    usernameInfomation:[],
    id:0,
    index:0, //识别
    arr:'我的',
    geduanHidden:true,
    amendBoxHidden:true,
    amentContent:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
var that = this;
  //   var arrList = [];
  //   var my = '个人中心'
  //   arrList = getApp().globalData.tabBar.list[4].text
  // that.setData({
  //  arrList:my
  // })

 
    app.editTabbar(); 
    console.log(that.data)
 
    var that = this;
    let userInfo = wx.getStorageSync('userInfo');
    let token = wx.getStorageSync('token');

    console.log(getApp().globalData.userInfo)


    if (app.globalData.token != '' && app.globalData.token != undefined) {
      that.setData({
        ruZhuHidden: true,
        selfhidden: false
      })
      that.getSelfData();
    }
    console.log(app.globalData.userInfo)
    console.log(app.globalData.token)
    if (userInfo && token) {
      app.globalData.userInfo = userInfo;
      app.globalData.token = token;
    }
    this.setData({
      userInfo: app.globalData.userInfo
    })
  

  
   
  },

// 修理过来的
  // modify:function(){
  //     var that = this;
  //     that.setData({
  //       ruZhuHidden:false,
  //       selfhidden:true,
  //     })
  // },



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
    let userInfo = wx.getStorageSync('userInfo');
    let token = wx.getStorageSync('token');

   

    // 判断当前是否在登录状态
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/wxlogin/wxlogin',
      })
      return;
    }
    if (app.globalData.token != '' && app.globalData.token != undefined) {
      that.setData({
        ruZhuHidden: true,
        selfhidden: false
      })
      that.getSelfData();

    }


    if (userInfo && token) {
      app.globalData.userInfo = userInfo;
      app.globalData.token = token;
    }
    this.setData({
      userInfo: app.globalData.userInfo
    })








  },


// 点击所在地区---选择省份市区
  chooseCity:function(){
      var that =this;
      that.setData({
        shelterLayerHidden: false,
        placeFrameHidden: false,
      })
    this.getRegionList();
  },






 
// 进行地址数据请求
  getRegionList: function (){
    var that =this;
    util.request(api.ShenPrice).then(function(res){
      console.log(res)
      if(res.code ==200){
        that.setData({
          regionList: res.data
        })
      }
    })
    
  },


// 给获取到的省份市区添加点击事件
  selectRegion:function(e){
    var that =this;
    console.log(e)
    that.data.pid = e.currentTarget.dataset.id
    var types = e.currentTarget.dataset.type
    that.data.pName = e.currentTarget.dataset
    that.data.cName = e.currentTarget.dataset
    if(types == 1){
      that.setData({
        province: that.data.pName

    })
      console.log(that.data.province.district_name)
    }else if(types == 2){
       that.setData({
         city: that.data.cName
       })
      console.log(that.data.city.district_name)
       return
    }
  this.city();
  },

city:function(){
  var that =this;
  util.request(api.City,{id:that.data.pid}).then(function(res){
    console.log(res)
    if (res.code == 200) {
      that.setData({
        regionList: res.data
      })
    }
  })
},






  // 点击地址弹框里面的确定
  btnSure:function(e){
    var that = this;
    // console.log(that.data.cName)
    // console.log(that.data.pName)

    that.setData({
      shelterLayerHidden: true,
      placeFrameHidden: true,
    })
  },

// 点击仓库区域的点击事件
  cbtnProvince:function(){
     var that =this;
     that.setData({
       shelterLayerHidden:false,
       cangHidden:false,
     })
     this.cangGetIndex();
  },



// 仓库--进行数据请求
  cangGetIndex:function(){
    var that = this;
    util.request(api.ShenPrice).then(function (res) {
      console.log(res)
      if (res.code == 200) {
        that.setData({
          cangIndex: res.data
        })
      }
    })
  },

// 仓库---地址数据的点击事件
  selectcang:function(e){
    console.log(e)
    var that = this;
    that.data.cpName = e.currentTarget.dataset;
     that.data.cCname = e.currentTarget.dataset;
     that.data.cXname = e.currentTarget.dataset;
     that.data.cid = e.currentTarget.dataset.id;
     var ctypes= e.currentTarget.dataset.type;
    if (ctypes == 1){
      that.setData({
        provinces: that.data.cpName 
      })
      console.log(that.data.provinces.district_name)

    }else if(ctypes ==2){
      that.setData({
        citys:that.data.cCname
      })
      console.log(that.data.citys.district_name)

    }else if(ctypes == 3){
      that.setData({
        xian:that.data.cXname
      })
      console.log(that.data.xian.district_name)
      return
    }
     
  this.cangfeng();

  },
  cangfeng:function(){
    var that = this;
    util.request(api.City, { id: that.data.cid }).then(function (res) {
      console.log(res)
      if (res.code == 200) {
        that.setData({
          cangIndex: res.data 
        })
      }
    })


  },


// 仓库--点击确定
  btnSuress:function(){
    var that =this;
     that.setData({
       shelterLayerHidden: true,
       cangHidden: true,
     })
  },
// 拿到企业全称
  btnCompanyName:function(e){
    var that =this;
  console.log(e.detail.value)
  that.setData({
    companyName: e.detail.value
  })
  },

// 拿到企业简介
  btncompanyProfile:function(e){
  var that = this;
  that.setData({
    companyProfile:e.detail.value
  })
  },
  // 拿到经营模式
  btnmanagementModel:function(e){
 var that = this;
 that.setData({
   managementModel:e.detail.value
 })
  },
  // 拿到所营业务
  btnbusiness:function(e){
  var that = this;
  that.setData({
    business:e.detail.value
  })
  },
  // 拿到详细地址
  btndetailAddress:function(e){
  var that = this;
  that.setData({
    detailAddress:e.detail.value
  })
  },

  // 拿到仓库地址
  btnwarehouseAddress:function(e){
  var that = this;
  that.setData({
    warehouseAddress:e.detail.value
  })

  },





//  点击保存
  submit:function(){
    var that = this;
      util.request(api.MineSave, { user_id: getApp().globalData.userInfo.user_id.id, name: that.data.companyName, title: that.data.companyProfile, pattern: that.data.managementModel, business: that.data.business, province: that.data.province.district_name, city: that.data.city.district_name, address: that.data.detailAddress, depot_province: that.data.provinces.district_name, depot_city: that.data.citys.district_name, depot_area: that.data.xian.district_name, depot_address: that.data.warehouseAddress }, 'POST').then(function (res) {
        console.log(res)
        if (res.code == 200) {
          wx.showToast({
            title: '入驻成功',
          })
          that.setData({
            ruZhuHidden: true,
            selfhidden: false,
            index: that.data.index+1
          })
          getApp().globalData.tabBar.list[4].text= '个人中心'
          app.editTabbar();
          that.getSelfData();
        } else {
          wx.showToast({
            title: '入驻失败',
          })
        }
      })
  
   
  },










// 在页面展示用户信息和公司名称
  getSelfData:function(){
    var that = this;
    util.request(api.SelfPage, { openid: getApp().globalData.userInfo.openid}, 'POST').then(function(res){
      console.log(res)
      if(res.code ==200){
        if(res.data != '' && res.data != undefined){
          that.setData({
            usernameInfomation: res.data,
            id: res.data.id
          })
          // getApp().globalData.tabBar.list[4].text = '个人中心';
        }else{
          that.setData({
            ruZhuHidden:false,
            selfhidden:true,
          })
         
        }
      }
    })
  },



  //  点击公司信息
  btncompany: function () {
    var that = this;
    wx.navigateTo({
      url: '/pages/companyInformation/companyInformation?id='+that.data.id,
    })
  },

  //  点击现货网
  btnAbout: function () {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },




// 点击修改
  btnModify:function(){
   console.log('你好啊')
   var that = this;
   that.setData({
     geduanHidden:false,
     amendBoxHidden:false,
   })

    util.request(api.LeftClass).then(function(res){
      console.log(res)
      if(res.code ==200){
      that.setData({
        amentContent: res.data
      })
      }
    })
  },



// 点击关闭弹框
  closeAmend:function(){
  var that = this;
  that.setData({
    geduanHidden: true,
    amendBoxHidden: true
  })
  },


// 点击五个主类，带着id和字符跳转到修改页面
  btnClass:function(e){
   var that = this;
  wx.navigateTo({
    url: '/pages/correct/correct?id=' + e.currentTarget.dataset.id + '&classs=' + e.currentTarget.dataset.cate_name,
  })
  that.setData({
    geduanHidden: true,
    amendBoxHidden: true
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