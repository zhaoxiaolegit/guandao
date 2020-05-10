// pages/mine/mine.js
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
    bottompressHidden:true,
    imageHidden:true,
    pressHidden:true,
    active:true,
    shelterhidden:true,
    productShelter:true,
    specificationHidden:true,
    leftcontainer:[],
    rightContainer:[],
    sheltercontainer:[],
    leftClass:[],
    pingming:'',
    caizhi:'',
    yali:'',
    guige:'',
    cid:0,
    gID:0,
    faID:0,
    Fid:0,
    caizhiid:0,
    moreID:0,
    pressValue:'',
    guigeValue:'',
    status:'',
     },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('我是onlaod')
    app.editTabbar();
    this.leftData();
  },

  leftData:function(){
    var that = this;
    util.request(api.LeftClass).then(function(res){
      console.log(res)
      if(res.code ==200){
        that.setData({
          leftClass:res.data
        })
      }
    })
  },


// 点击左边的主类，获取右边的子类
  btnLeftChange:function(e){

    if (getApp().globalData.token == '' || getApp().globalData.token == null || getApp().globalData.token == undefined) {
      wx.navigateTo({
        url: '/pages/auth/wxlogin/wxlogin',
      })
    }

    var that = this

    // that.setData({
    //   pingming: '',
    //   caizhi: '',
    //   pressValue: '',
    //   guigeValue: '',
    //   guige: '',
    // })

   console.log(e.currentTarget.dataset.id)
    if (e.currentTarget.dataset.id == 2 || e.currentTarget.dataset.id==3){
      that.setData({
        pressHidden:false,
        gID: e.currentTarget.dataset.id,
      
      })
    }else{
      that.setData({
        pressHidden: true,
         moreID: e.currentTarget.dataset.id,
            gID: e.currentTarget.dataset.id,
      })
    }
    util.request(api.RightClass,{id:e.currentTarget.dataset.id}).then(function(res){
      console.log(res)
      if(res.code ==200){
        that.setData({
          rightContainer: res.data
        })
      }
    })

  },


  // 点击右侧选项卡(品名选项)的每一项，带着点击产品的id进行跳转
  btnright:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id
    that.setData({
      pingming: e.currentTarget.dataset.cate_name
    })
    wx.navigateTo({
      url: '/pages/search/search?id='+id+'&pingming='+that.data.pingming + '&LId='+that.data.gID,
    })
  },




// 点击材质的事件
  material:function(){
   var  that = this;
 
    if(that.data.gID==''){
      wx.showModal({
        title: '请先选择分类',
      })
    }else{
      that.setData({
        productShelter: false,
        shelterhidden: false
      })
      util.request(api.CaizhiInfo, { id: that.data.gID }).then(function (res) {
        console.log(res)
        if(res.code ==200){
          that.setData({
            sheltercontainer:res.data
          })
        }
      })
    }
  },

  // 点击材质弹框里面选项内容的按钮
  btncaizhi:function(e){
    var that  = this;
    console.log(e)
    var id = e.currentTarget.dataset.id;
    var text = e.currentTarget.dataset.texture
    that.setData({
      caizhi:text,
      status:e.currentTarget.dataset.index
    })
    wx.navigateTo({
      url: '/pages/search/search?id=' + id + '&caizhiName=' + text + '&LId=' + that.data.gID,
    })
    that.setData({
      productShelter: true,
      shelterhidden: true
    })
  },
  // 点击材质弹框的关闭
  btnClose:function(){
    var that = this;
    that.setData({
      productShelter: true,
      shelterhidden: true
    })
  },
  


  // 点击压力事件
  pressBTN:function(){
   var that = this;
   that.setData({
     bottompressHidden:false,
     shelterhidden:false,
   })
  },

  // 拿到输入的压力值
  btnpressinput:function(e){
  console.log(e)
  var that =this;
  that.setData({
    pressValue:e.detail.value,
    yali: e.detail.value,
  })
  },
  // 点击压力弹框的确定按钮
  btnsurePress:function(e){
    var that = this;

    // if (that.data.pingming == '' || that.data.caizhi == '') {
    //   wx.showModal({
    //     title: '请先选择分类',
    //     content: '',
    //   })
    //   return;
    // }

    wx.navigateTo({
      url: '/pages/search/search?pressValue=' + that.data.pressValue + '&LId=' + that.data.gID,
    })
    that.setData({
      bottompressHidden: true,
      shelterhidden: true,
    })
  },
// 点击压力的关闭按钮
  pressClose:function(){
  var that = this;
  that.setData({
    bottompressHidden: true,
    shelterhidden: true,
  })
  },




// 规格的点击事件
  btnSpecification:function(){

    if (getApp().globalData.token == '' || getApp().globalData.token == null || getApp().globalData.token == undefined) {
      wx.navigateTo({
        url: '/pages/auth/wxlogin/wxlogin',
      })
    }




    var that = this;
    that.setData({
      shelterhidden:false,
      specificationHidden:false,
    })
  },

  // 拿到规格弹框里面的输入值
  btnguige:function(e){
    console.log(e)
    var that = this;
    that.setData({
      guigeValue: e.detail.value,
      guige: e.detail.value,
    })
  },
  

  

  // 规格弹框里面的确定按钮的点击事件
  btnsure:function(){
   var that =this;

    // if (that.data.pingming == '' || that.data.caizhi==''){
    //   wx.showModal({
    //     title: '请先选择分类',
    //     content: '',
    //   })
    //   return;
    // }

   wx.navigateTo({
     url: '/pages/search/search?guigeValue=' + that.data.guigeValue + '&LId=' + that.data.gID,
   })
   that.setData({
     shelterhidden: true,
     specificationHidden: true,
   })

  },
  // 点击规格的关闭按钮
  btnguigClose:function(){
  var that = this;
  that.setData({
    shelterhidden: true,
    specificationHidden: true,
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
    var that =this;
    that.setData({
      pingming:'',
      caizhi:'',
      pressValue:'',
      guigeValue:'',
      guige:'',
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