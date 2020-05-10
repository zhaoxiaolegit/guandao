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
    username: '',
    tellphone: '',
    addressPlace: '',
    detail: '',
    dayDate: [
      { id: 0, day: 1 },
      { id: 1, day: 3 },
      { id: 2, day: 5 },
      { id: 3, day: 7 },
      { id: 4, day: 10 },
      { id: 5, day: 20 },
      { id: 6, day: 25 },
 {id:7,day:30},

    ],
    day: 0,
    dianHidden: true,
    status: '',
    imgAddress: '',
    arr: '',
    arrss: [],
    type: 0,
    endImg: '',
    title: '',
    classs:[],
    yaliHidden:true,
    pingming:[],
    caizhi:[],
    price:'',
    number:'',
    danwei:'',
    fenId:'', //分类id
    guige:'',  //规格值
    yali:0, // 压力值
    cid:0, //材质id
    pName:'', // 品名
    status:'',
    statuss:'',
    statusCai:'',
    classHidden:true,  //分类的隐藏框
    fenlei:'',
    pingmingHidden:true, //品名的隐藏框
    nfid:'',
    newpingming:[],
    newPingmings:'',
    newcaizhiName:'',
    caizhiHidden:true,
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
    var that = this;
    wx.chooseImage({
      count: 9 - that.data.uploaderNum, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var filth = res.tempFilePaths[0]
        // that.data.arr = res.tempFilePaths[0];
        var index = filth.lastIndexOf('/');
        var temp = filth.substring(index, filth.length)
        var uploadKey = "bxg/" + temp;
        that.data.arr = api.UploadFileUrl + uploadKey
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
            var addresImg = api.UploadFileUrl + 'bxg/' + temp;
            //  console.log(addresImg)

          }
        })

        //  wx.uploadFile({
        //    url: api.Uplod,
        //    filePath: filth,
        //    header: { "Content-Type": "multipart/form-data" },
        //    name: 'file',
        //    success(res){
        //      console.log(res)
        //    }
        //  })    


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
        that.data.arrss.join('==')
        that.setData({
          endIm: that.data.arrss.join('==')
        })

      }


    })

  },

  // 拿到联系人的姓名
  btnUser: function (e) {
    console.log(e.detail.value)
    var that = this;
    that.setData({
      username: e.detail.value
    })
  },

  // 拿到联系人的电话
  btnphone: function (e) {
    var that = this;
    that.setData({
      tellphone: e.detail.value
    })
  },

  // 拿到货物所在地
  btnpGodds: function (e) {
    var that = this;
    that.setData({
      addressPlace: e.detail.value
    })
  },

  // 拿到标题
  btnTitle: function (e) {
    var that = this;
    that.setData({
      title: e.detail.value
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


  // 点击有效期
  btnDay: function (e) {
    console.log(e)
    var that = this;
    that.data.day = e.currentTarget.dataset.day
    var id = e.currentTarget.dataset.id
    that.setData({
      status: id
    })

  },







  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getApp().globalData.userInfo)
    var that = this;
    console.log(options.type)
    that.data.type = options.type;
    console.log(that.data.type)
    that.getClass();
   
  },



// 拿到价格的值
  btnPrice:function(e){
  var that = this;
  that.setData({
    price:e.detail.value
  })
  },

  // 拿到数量
  btnNumber:function(e){
 var that =this;
 that.setData({
   number:e.detail.value
 })
  },

  // 拿到单位
  btnDan:function(e){
  var that =this;
  that.setData({
    danwei:e.detail.value
  })
  },

// 拿到规格值
  btnguige:function(e){
 var that = this;
 that.setData({
   guige:e.detail.value
 })
  },

  // 拿到压力
  btnyali:function(e){
  var that = this;
  that.setData({
    yali:e.detail.value
  })
  },


// 拿到材质id
  btncaizhi:function(e){
    console.log(e)
   var that = this;
   that.setData({
     cid:e.currentTarget.dataset.id,
     statusCai:e.currentTarget.dataset.index
   })
   console.log(that.data.cid)
  },


// 拿到品名字段
  pinming:function(e){
    console.log(e)
   var that = this;
    console.log(e.currentTarget.dataset.cate_name)
    that.setData({
      pName: e.currentTarget.dataset.cate_name,
      statuss:e.currentTarget.dataset.index
    })
  },


  btnSubmit: function () {
    var that = this;
    if(that.data.price ==''){
      wx.showModal({
        title: '价格不能为空',
        content: '',
      })
    }else if( that.data.number ==''){
      wx.showModal({
        title: '数量不能为空',
        content: '',
      })
    }else if(that.data.danwei==''){
      wx.showModal({
        title: '单位不能为空',
        content: '',
      })
    }else{
      console.log(getApp().globalData.userInfo)
      console.log(getApp().globalData.userInfo.company_id.company)
      console.log(getApp().globalData.userInfo.user_id.id)
      util.request(api.NewPrice, { price: that.data.price, count: that.data.number, unit: that.data.danwei, cate_id: that.data.nfid, specification_id: that.data.guige, pressure: that.data.yali, user_id: getApp().globalData.userInfo.user_id.id, texture_id: that.data.cid, company_id: getApp().globalData.userInfo.company_id.company, name: that.data.pName }, 'POST').then(function (res) {
        if (res.code == 200) {
          wx.showModal({
            title: '发布成功',
            content: '',
            success() {
              wx.navigateBack({

              })
            }
          })
        } else {
          wx.showModal({
            title: '发布失败',
            content: '',
          })
        }
      })


    }


  },


// 获取分类
  getClass:function(){
    var that = this;
    util.request(api.LeftClass).then(function(res){
      console.log(res)
      if(res.code==200){
        that.setData({
          classs:res.data
        })
      }
    })
  },

// 点击分类的每一项
  btnClass:function(e){
    console.log(e)
    var that =this;
   console.log(e.currentTarget.dataset.id)
    if (e.currentTarget.dataset.id == 2 || e.currentTarget.dataset.id == 3){
      that.setData({
        yaliHidden:false,
        fenId: e.currentTarget.dataset.id,
        status:e.currentTarget.dataset.index
      })
    }else{
      that.setData({
        yaliHidden: true,
        fenId: e.currentTarget.dataset.id,
        status: e.currentTarget.dataset.index

      })
    }
   
    util.request(api.RightClass, { id: e.currentTarget.dataset.id}).then(function(res){
      console.log(res)
      if(res.code == 200){
        that.setData({
          pingming:res.data
        })
      }
    })

// 获取材质
    util.request(api.CaizhiInfo, { id: e.currentTarget.dataset.id}).then(function(res){
      console.log(res)
      if(res.code ==200){
        that.setData({
          caizhi:res.data
        })
      }
    })


  },

// 点击箭头，显示所有的分类
  btnAllClass:function(){
var that = this;
that.setData({
  classHidden:false
})
    that.getClass();
  },

// 分类选项的点击事件
  btnClassNew:function(e){
    console.log(e)
    var that = this;
    that.setData({
      fenlei: e.currentTarget.dataset.cate_name,
      nfid:e.currentTarget.dataset.id,
      classHidden:true
    })
  },
 

//  点击品名显示隐藏框
  btnallP:function(){
    var that = this;
    that.setData({
      pingmingHidden:false
    })

    util.request(api.RightClass, { id: that.data.nfid}).then(function(res){
      console.log(res)
      if(res.code ==200){
        that.setData({
          newpingming:res.data
        })
      }
    })
  },

  btnNewPingming:function(e){
   var that = this;
   that.setData({
     newPingmings: e.currentTarget.dataset.cate_name,
     pName:e.currentTarget.dataset.cate_name,
     pingmingHidden:true
   })
  },

// 点击材质的隐藏事件
  btncaizhi:function(){
  var that =this;
  that.setData({
    caizhiHidden:false
  })

    util.request(api.CaizhiInfo, { id: that.data.nfid }).then(function (res) {
      console.log(res)
      if (res.code == 200) {
        that.setData({
          caizhi: res.data
        })
      }
    })

  },

// 点击材质的隐藏框事件
  bencaizhi:function(e){
var that =this;
that.setData({
  newcaizhiName:e.currentTarget.dataset.texture,
  cid:e.currentTarget.dataset.id,
  caizhiHidden:true
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