// var NewApiRootUrl = 'http://www.bxg.com/api/';
var NewApiRootUrl = 'https://bxg.meshbees.com/api/';

var UploadFileUrl = 'https://image.meshbees.com/';





module.exports = {
  IndexAd: NewApiRootUrl + 'index/banner', //首页广告
  IndexCai: NewApiRootUrl +'index/buys', //首页采购信息
  WxLogin: NewApiRootUrl +'login/login', //登录接口
  LoginAdd: NewApiRootUrl +'login/add_user', //用户添加
  LowPrice: NewApiRootUrl +'lowbuy/lowbuy', //低价处理列表
  ShenPrice: NewApiRootUrl +'city/province',//省份的接口
  City: NewApiRootUrl +'city/city', //城市的接口
  Pinlist: NewApiRootUrl +'share/index', //拼单列表
  PlinListDetail: NewApiRootUrl +'share/sharelist', //拼单详情列表
  Fabu: NewApiRootUrl +'buys/addbuys', //发布信息
  Uplod: NewApiRootUrl +'upload/upload', //上传图片
  UploadFileUrl: UploadFileUrl, //文件上传到阿里云的地址
  PublishInfor: NewApiRootUrl +'buys/addbuys', //发布采购信息
  LowpricePublish: NewApiRootUrl +'lowbuy/addLowbuy', //发布低价处理
  LogisticsCompany: NewApiRootUrl + 'logistics/index', //物流公司列表
  LogisticsDetail: NewApiRootUrl +'logistics/loglist', //物流公司详细信息
  LogisticsSearch: NewApiRootUrl +'logistics/log', //物流路线搜索
  PushPrice: NewApiRootUrl +'buys/addgobuy', //提交报价
  LeftClass: NewApiRootUrl +'cate/index', //左侧主体分类
  RightClass: NewApiRootUrl +'cate/cate', //右边具体的分类
  CaizhiInfo: NewApiRootUrl +'cate/texture', //选择材质
  PricePublish: NewApiRootUrl +'price/index', //提交价格表的数据
  MineSave: NewApiRootUrl +'company/addcompany', //入驻信息的提交保存
  SelfPage: NewApiRootUrl +'login/user', // 入驻成功之后的头像，昵称，公司名称接口
  CompanyDetailInformation: NewApiRootUrl +'company/companylist', //公司详细信息
  CompanyDetailList: NewApiRootUrl +'company/goodslist', //公司详细信息下面的列表
  About: NewApiRootUrl +'about/index', //关于我们
  SpellOrder: NewApiRootUrl +'share/goshare', // 参与拼单接口
  AddressGoods: NewApiRootUrl +'logistics/goods', //货运物流的提交订单信息
  NewPrice: NewApiRootUrl +'price/addprice', //最新价格的发布
  PayGoods: NewApiRootUrl +'paperpay/topay', //支付接口
  PriceListAll: NewApiRootUrl +'price/list', //全部的价格表数据接口
  SpellImage: NewApiRootUrl +'share/file', //参与拼单的用户头像
  CompanyModify: NewApiRootUrl +'company/updatecompany', //修改公司信息
  ModifyUserInof: NewApiRootUrl +'user/edituser', //修改个人信息





};