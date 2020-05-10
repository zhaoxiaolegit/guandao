//app.js
const api = require('./config/api.js');
const util = require('./utils/util.js');
const user = require('./servers/user.js');

App({
  onLaunch: function () {
    //隐藏系统tabbar
    wx.hideTabBar();
    //获取设备信息
    this.getSystemInfo();

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })

    let that = this;
    //  获取用户登录信息 
    user.checkLogin().then(res => {
      console.log('app login')
      console.log('你好')
      this.globalData.userInfo = wx.getStorageSync('userInfo');
      this.globalData.token = wx.getStorageSync('token');
    }).catch(() => {
    });

   
    util.request(api.SelfPage, { openid: wx.getStorageSync('userInfo').openid }, 'POST').then(function (res) {
      console.log(res)
      if (res.code == 200) {
        if (res.data != '' && res.data != undefined) {
          //已入驻
          getApp().globalData.tabBar.list[4].text = '个人中心'
          that.editTabbar();
        } else {
          //未入驻
          getApp().globalData.tabBar.list[4].text = '入驻'
          that.editTabbar();
        }
      }
    })
  


  },
  onShow: function () {
    //隐藏系统tabbar
    wx.hideTabBar();
  },
  getSystemInfo: function () {
    let t = this;
    wx.getSystemInfo({
      success: function (res) {
        t.globalData.systemInfo = res;
      }
    });
  },
  editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
      console.log(_this)
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },






  globalData: {
    systemInfo: null,
    userInfo: {
      nickName: 'Hi,游客',
      userName: '点击去登录',
      avatarUrl: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'
    },
    tabBar: {
      "backgroundColor": "#ffffff",
      "color": "#C4C3C0",
      "selectedColor": "#FF8201",
      "list": [
        {
          "pagePath": "/pages/index/index",
          "iconPath": "icon/icon_home.png",
          "selectedIconPath": "icon/icon_home_HL.png",
          "text": "首页"
        },

        {
          "pagePath": "/pages/pricePage/pricePage",
          "iconPath": "icon/icon_price.png",
          "selectedIconPath": "icon/icon_price_HL.png",
          "text": "价格表"
        },
       
        {
          "pagePath": "/pages/excessive/excessive",
          "iconPath": "icon/icon_release.png",
          "isSpecial": true,
          "text": "发布"
        },
        {
          "pagePath": "/pages/news/news",
          "iconPath": "icon/icon_new.png",
          "selectedIconPath": "icon/icon_new_HL.png",
          "text": "采购信息"
        },
        {
          "pagePath": "/pages/mine/mine",
          "iconPath": "icon/icon_mine.png",
          "selectedIconPath": "icon/icon_mine_HL.png",
          "text": '入驻'
        }
      ]
    },
    token: '',
    openid:0,
    AppID: 'wx2df8cbf4a5dfe39b',
    AppSecret: '4265177ffd8e1362d83078f47118bb56',
    name: '管道大数据',
    list:[],
    id:'',
    change:false,
  }
})