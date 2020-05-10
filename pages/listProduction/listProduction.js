// pages/listProduction/listProduction.js
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
    pindanProduct:[],
    id:0,
    userImage:[],
    userImagess:[],
    pin:[],
    pindanImage:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getDataList();
   this.getUseImage();
  },

  getDataList:function(){
    var that =this;
    util.request(api.Pinlist).then(function(res){
      console.log(res)
      if(res.code ==200){
        that.setData({
          pindanProduct:res.data,
        })
      }     
    })
  },


// // 获取用户头像
//   getImage:function(res){
//   var that =this;
//       for(var i=0;i<res.data.length;i++){
//         var pid = res.data[i].id
//         console.log(pid)
//         util.request(api.SpellImage, { id: pid}).then(function(res){
//           console.log(res)
//           if(res.code ==200){
//             that.setData({
//               userImage:res.data.path
//             })
//           }
          
          
//         })
       
//       }

    
//   },



// 获取拼单用户头像
  getUseImage:function(){
  
    // util.request(api.SpellImage,{id})
  


  },




  // 跳转拼单详情
  btnPinDetail:function(e){
       console.log(e)
       var id = e.currentTarget.dataset.id;
       wx.navigateTo({
         url: '/pages/listDetails/listDetails?id='+id,
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