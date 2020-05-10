// 获取应用实例
const api = require('../../config/api.js')
const util = require('../../utils/util.js')
//index.js
//获取应用实例

// pages/mine/mine.js
const app = getApp();
// pages/middle/middle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploaderList: [],
    uploaderNum: 0,
    showUpload: true,
    arrss:[],
    arr:'',
    endIm:'',
    user:'',
    id:0,
    dayDate: [
      { id: 0, index: 0, day: 1 },
      { id: 1, index: 1, day: 3 },
      { id: 2, index: 2, day: 5 },
      { id: 3, index: 3, day: 7 },
      { id: 4, index: 4, day: 10 },
      { id: 5, index: 5, day: 15 },
      { id: 6, index: 6, day: 20 },
      { id: 7, index: 7, day: 30 },
    ],
    day: 0,
    status:'',
    logoHidden:true,
  },
  // 删除图片
  clearImg: function (e) {
    var nowList = [];//新数据
    var uploaderList = this.data.uploaderList;//原数据

    for (let i = 0; i < uploaderList.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        continue;
      } else {
        nowList.push(uploaderList[i])
      }
    }
    this.setData({
      uploaderNum: this.data.uploaderNum - 1,
      uploaderList: nowList,
      showUpload: true
    })
  },
  //展示图片
  showImg: function (e) {
    var that = this;
    wx.previewImage({
      urls: that.data.uploaderList,
      current: that.data.uploaderList[e.currentTarget.dataset.index]
    })
  },
  //上传图片
  upload: function (e) {

    wx.showModal({
      title: '上传图片的数量为四张',
    })


    var that = this;
    wx.chooseImage({
      count: 9 - that.data.uploaderNum, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
      console.log(res)
        var filth = res.tempFilePaths[0]
        var index = filth.lastIndexOf('/');
        var temp = filth.substring(index, filth.length)
        var uploadKey = "bxg/" + temp;
        that.data.arr = api.UploadFileUrl + uploadKey
       console.log(that.data.arr)
        wx.uploadFile({
          url: api.UploadFileUrl,
          filePath: filth,
          name: 'file',
          formData: {
            'name': "file",  //其他额外的formdata，可不写  
            'key': uploadKey,
            'policy': "eyJleHBpcmF0aW9uIjoiMjAyMC0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==",
            'OSSAccessKeyId': "LTAI4jC57sJBNnR5",
            'success_action_status': "200",
            'signature': "CEynaA7tdyQ5EYQ3No0lMcOXOHw=",
          },
          success(res) {
            console.log(res)
          }
        })


        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        let uploaderList = that.data.uploaderList.concat(tempFilePaths);
        if (uploaderList.length == 9) {
          that.setData({
            showUpload: false
          })
        }
        that.setData({
          uploaderList: uploaderList,
          uploaderNum: uploaderList.length,
        })
        
        
        that.data.arrss.push(that.data.arr)
        console.log(that.data.arrss)
        that.data.arrss.join('==')
        that.setData({
          endIm: that.data.arrss.join('==')
        })
         
         console.log(that.data.endIm)

      }
    })
  },


  // 提交报价 
  btnPrice:function(){
    var that =this;
 
    if (that.data.username ==''){
      wx.showModal({
        title: '标题不能为空',
      })
    } else if (that.data.detail ==''){
      wx.showModal({
        title: '详情不能为空',
      })
    } else if (that.data.tellphone== ''){
      wx.showModal({
        title: '联系电话不能为空',
      })
    } else if (that.data.user ==''){
      wx.showModal({
        title: '联系人不能为空',
      })
    }else{

      util.request(api.PushPrice, { buy_id: that.data.id, tel: that.data.tellphone, tel_name: that.data.user, caption: that.data.username, title: that.data.detail, thumb: that.data.endIm, day: that.data.day }, 'POST').then(function (res) {
        if (res.code == 200) {
          wx.showModal({
            title: '报价提交成功',
            success(){
              wx.navigateBack({
                
              })
            }
          })
        } else {
          wx.showModal({
            title: '报价提价失败',
            content: '',
          })
        }
      })
    }




   


  },



  // 拿到标题
  btnTitle: function (e) {
    console.log(e.detail.value)
    var that = this;
    that.setData({
      username: e.detail.value
    })
  },
  // 拿到详情信息
  btnDetail: function (e) {
    var that = this;
    console.log(e.detail.value)
    that.setData({
      detail: e.detail.value
    })
  },
  // 拿到联系人的电话
  btnphone: function (e) {
    var that = this;
    console.log(e.detail.value)
    that.setData({
      tellphone: e.detail.value
    })
  },
// 拿到联系人
  btnUser:function(e){

    var that = this;
    console.log(e.detail.value)
    that.setData({
      user: e.detail.value
    })


  },

  // 点击有效期
  btnDay: function (e) {
    console.log(e)
    var that = this;
    that.data.day = e.currentTarget.dataset.day
    console.log(e.currentTarget.dataset.day)
    var id = e.currentTarget.dataset.id
    that.setData({
      status: e.target.dataset.key 
      
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  

  

  console.log(options)
  var that  = this;
  that.setData({
    id: options.id
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