const api = require('../../config/api.js')
const util =require('../../utils/util.js')
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tabbar: {},
    top:[
      { id: 0, image:'../../static/images/topImg.png'}
    ],
    redbag:'',
    pruchase:[],
    productimg: [],
    productSplice:'',
    active:false,
    id:0,
    textHidden:false,
    telHidden:true
    
  },
  

// 电话
  telData:function(){
    var that = this;
  console.log(getApp().globalData.userInfo)
    if (getApp().globalData.userInfo.pay.pay == null){
    that.setData({
      telHidden:true
    })
  }else{
    that.setData({
      telHidden:false
    })
  }

  },


  onLoad: function () {
    app.editTabbar();


    this.advertisement(); // 首页广告 
    this.purchase(); //采购信息
    this.telData();
  },

// 首页广告请求接口
  advertisement:function(){
    var that = this;
     wx.getStorage({
       key: 'aids',
       success: function(res) {
         console.log(res)
         that.setData({
            id:res.data
         })
          console.log(res.data)
         util.request(api.IndexAd, { city: res.data }).then(function (res) {
           console.log(res)
           if (res.code == 200) {
             that.setData({
               redbag: res.data
             })

           }
         })
       },
     })
    

 
  
  
  },

  // 获取采购信息接口
  purchase:function(){
    console.log(getApp().globalData.userInfo)   
    var that =this;
    util.request(api.IndexCai).then(function(res){
      if(res.code == 200){
         that.setData({
           pruchase:res.data
         })
      }
      console.log(res.data.length)
      for(var i=0;i<res.data.length;i++){
        console.log(res.data[i].id)
      }
    })
  },

// 图片
  btnimga:function(e){
    var that =this 
    that.data.src = e.currentTarget.dataset.path
    var arr=[];
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




// 点击全文展示
  btnAllContent:function(e){
    var that =this
    var id = e.currentTarget.dataset.id
        that.setData({
          active:true,
          textHidden:true
        })


 

  },







  onShow:function(){
    app.editTabbar();
    this.advertisement(); // 首页广告 
    this.telData();
  },
  // 点击价格表
  btnPrice: function () {
    wx.navigateTo({
      url: '/pages/priceCenter/priceCenter?type=all',
    })
  },

  // 点击采购信息
  btncaigou: function () {
    wx.switchTab({
      url: '/pages/news/news',
    })
  },

  // 点击拼单生产
  btnpindan: function () {
    wx.navigateTo({
      url: '/pages/listProduction/listProduction',
    })
  },

  // 点击低价处理
  btnlowPrice: function () {
    wx.navigateTo({
      url: '/pages/lowPrice/lowPrice',
    })
  },
  // 点击货物物流
  btnwuliu: function () {
    wx.navigateTo({
      url: '/pages/checkLogistics/checkLogistics',
    })
  },

  // 点击参与报价
  btnJoin:function(e){
    if (getApp().globalData.token == '' || getApp().globalData.token == null || getApp().globalData.token == undefined) {
      wx.navigateTo({
        url: '/pages/auth/wxlogin/wxlogin',
      })
      return
    }
    console.log(e)
    var id = e.currentTarget.dataset.id
     wx.navigateTo({
       url: '/pages/joinOffer/joinOffer?id='+id,
     })
  },
  // 点击更多
  btnMore:function(){
   wx.switchTab({
     url: '/pages/news/news',
   })
  }

  
})
