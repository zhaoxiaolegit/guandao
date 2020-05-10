// pages/companyInformation/companyInformation.js
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
    quancheng:'', //企业全称
    jianjie:'',// 公司简介
    jinyingmoshi:'', //经营模式
    yewu:'', //所营业务
    suozaidiqu:'', //所在地区
    xiangxidizhi:'', //详细地址
    cangkuquyu:'', //仓库区域
    cangkudizhi:'', //仓库地址
    diqusheng:'',
    diqushi:'',
    regionType: 1,
    shelterLayerHidden: true,
    placeFrameHidden: true,
    selectRegionList: [],
    province: {},
    cangHidden: true,
    pid: 0,
    province: {
      district_name: '省份'
    },
    city: {
      district_name: '城市'
    },
    provinces: {
      district_name: '省份'
    },
    citys: {
      district_name: '城市'
    },
    xian: {
      district_name: '县城'
    },
    type: 0,
    pName: '',
    cName: '',
    regionList: {},
    cangIndex: {},
    cpName: '',
    cCname: '',
    cXname: '',
    cid: '',
    companyName: '', //企业全称
    companyProfile: '', // 企业简介
    managementModel: '', //经营模式
    business: '',//经营业务
    detailAddress: '', //详细地址
    warehouseAddress: '', //仓库地址
    ruZhuHidden: false,
    selfhidden: true,
    usernameInfomation: [],
    id: 0,
    index: 0, //识别
    provinceModiy:'',  //所在地区的省
    cityModiy:'', //所在地区的市
    cProvinceModiy:'', //仓库区域的省 
    cCityModiy:'', //仓库所在区域的市
    cXianModiy:'', //仓库所在区域的县城
    modifyCompanyName:'', //修改后的企业全称
    modifyCompanyBrief:'', //修改后的企业简介
    modifyCompanyType:'', //修改后的企业经营模式
    modifyCompanyBusiness:'', //修改后的企业所营业务
    modifyCompanyAddressProvince:'', //修改后的所在地区的省
    modifyCompanyAddressCity:'',//修改后的所在地区的市
    modifyCompanyAddressDetail:'', //修改后的所在地区的详细信息
    modifyCompanyWarehouseProvince:'', //修改后的仓库区域的省
    modifyCompanyWarehouseCity:'', //修改后的仓库区域的市
    modifyCompanyWarehouseTown:'', //修改后的仓库区域的县城
    modifyCompanyWarehouseDetail:'', //修改后的仓库区域所在的详细地址
    modifyInfor:{},
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
      console.log(options)
    util.request(api.CompanyDetailInformation,{id:options.id}).then(function(res){
      console.log(res)
      if(res.code ==200){
        wx.setStorage({
          key: 'SaveString',
          data: res.data,
        })
       that.setData({
         quancheng:res.data.name,
         jianjie:res.data.title,
         jinyingmoshi: res.data.pattern,
         yewu: res.data.business,
         diqushi:res.data.city,
         diqusheng:res.data.province,
         xiangxidizhi: res.data.address,
         ca: res.data.depot_province,
         cb: res.data.depot_city,
         cc: res.data.depot_area,
         cangkudizhi: res.data.depot_address,
         provinceModiy: res.data.province,
         cityModiy:res.data.city,
         cProvinceModiy: res.data.depot_province,
         cCityModiy: res.data.depot_city,
         cXianModiy: res.data.depot_area
       })

        wx.getStorage({
          key: 'SaveString',
          success: function (res) {
            console.log(res)
            that.setData({
              modifyInfor: res.data
            })
          },
        })
        console.log(that.data.modifyInfor)
      }
    })

  },



// 仓库地址
  btnwarehouseAddress:function(e){
    var that = this;
    console.log(that.data.modifyInfor)

   that.setData({
     ceshi:e.detail.value
   })

  },


  // 点击所在地区---选择省份市区
  chooseCity: function () {
    var that = this;
    that.setData({
      shelterLayerHidden: false,
      placeFrameHidden: false,
    })
    this.getRegionList();
  },

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

  // 给获取到的省份市区添加点击事件
  selectRegion: function (e) {
    var that = this;
    console.log(e)
    that.data.pid = e.currentTarget.dataset.id
    var types = e.currentTarget.dataset.type
    that.data.pName = e.currentTarget.dataset.district_name
    that.data.cName = e.currentTarget.dataset.district_name
    if (types == 1) {
      that.setData({
        provinceModiy: that.data.pName

      })
      console.log(that.data.provinceModiy)
    } else if (types == 2) {
      that.setData({
        cityModiy: that.data.cName
      })
      console.log(that.data.cityModiy)
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






  // 点击地址弹框里面的确定
  btnSure: function (e) {
    var that = this;
    // console.log(that.data.cName)
    // console.log(that.data.pName)

    that.setData({
      shelterLayerHidden: true,
      placeFrameHidden: true,
    })
  },

  // 点击仓库区域的点击事件
  cbtnProvince: function () {
    var that = this;
    that.setData({
      shelterLayerHidden: false,
      cangHidden: false,
    })
    this.cangGetIndex();
  },



  // 仓库--进行数据请求
  cangGetIndex: function () {
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
  selectcang: function (e) {
    console.log(e)
    var that = this;
    that.data.cpName = e.currentTarget.dataset.district_name;
    that.data.cCname = e.currentTarget.dataset.district_name;
    that.data.cXname = e.currentTarget.dataset.district_name;
    that.data.cid = e.currentTarget.dataset.id;
    var ctypes = e.currentTarget.dataset.type;
    if (ctypes == 1) {
      that.setData({
        cProvinceModiy: that.data.cpName
      })
      console.log(that.data.provinces.district_name)

    } else if (ctypes == 2) {
      that.setData({
        cCityModiy: that.data.cCname
      })
      console.log(that.data.citys.district_name)

    } else if (ctypes == 3) {
      that.setData({
        cXianModiy: that.data.cXname
      })
      console.log(that.data.xian.district_name)
      return
    }

    this.cangfeng();

  },
  cangfeng: function () {
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
  btnSuress: function () {
    var that = this;
    that.setData({
      shelterLayerHidden: true,
      cangHidden: true,
    })
  },









// 拿到修改后的企业全称
  btnCompanyName:function(e){
  var that = this;
    that.data.quancheng = that.data.modifyInfor.name
  that.setData({
    quancheng:e.detail.value
  })
  },
  
  //拿到修改后的企业简介
  btncompanyProfile:function(e){
  var that = this;
    that.data.jianjie = that.data.modifyInfor.title
  that.setData({
    jianjie:e.detail.value
  })
  },

  // 拿到修改后的经营模式
  btnmanagementModel:function(e){
 var that =this;
    that.data.jinyingmoshi = that.data.modifyInfor.pattern
 that.setData({
   jinyingmoshi:e.detail.value
 })
  },

  // 拿到修改后的所营业务
  btnbusiness:function(e){
  var that = this;
    that.data.yewu = that.data.modifyInfor.business
  that.setData({
    yewu:e.detail.value
  })
  },

  // 拿到修改后的所在地区的详细地址
  btndetailAddress:function(e){
 var that =this;
    that.data.xiangxidizhi = that.data.address
 that.setData({
   xiangxidizhi:e.detail.value
 })
  },

  // 拿到修改后的仓库区域的详细地址
  btnwarehouseAddress:function(e){
var that = this;
    that.data.cangkudizhi = that.data.modifyInfor.depot_address
that.setData({
  cangkudizhi:e.detail.value
})
  },















  // 点击修改数据
  btnmodify: function () {
  var that  =this;
  

    console.log(getApp().globalData.userInfo)
    var that = this;
    util.request(api.CompanyModify, { name: that.data.quancheng, title: that.data.jianjie, address: that.data.xiangxidizhi, province: that.data.provinceModiy, city: that.data.cityModiy, depot_address: that.data.cangkudizhi, depot_province: that.data.cProvinceModiy, depot_city: that.data.cCityModiy, depot_area: that.data.cXianModiy, pattern: that.data.jinyingmoshi, business: that.data.yewu, id: getApp().globalData.userInfo.company_id.company},'POST').then(function(res){
       console.log(res)
       if(res.code ==200){
         wx.showToast({
           title: '更新成功',
         })
       }
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