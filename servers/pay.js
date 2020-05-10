/**
 * 支付相关服务
 */

const util = require('../utils/util.js');
const api = require('../config/api.js');

/**
 * 判断用户是否登录
 */
function payOrder(order_sn, orderid) {
  return new Promise(function (resolve, reject) {
    util.request(api.PayPrepayId, {
      order_sn: order_sn, appkey: getApp().globalData.AppID, orderid: orderid
    }).then((res) => {
      console.log(res)
      if (res.errno === 0) {
        const payParam = res.data;
        wx.requestPayment({
          'timeStamp': payParam.timeStamp,
          'nonceStr': payParam.nonceStr,
          'package': payParam.package,
          'signType': payParam.signType,
          'paySign': payParam.paySign,
          'success': function (res) {
            resolve(res);
            var temp = payParam.package;
            var prepay_id = temp.substring(10, temp.length);
            util.request(api.SendMsg, {
              order_sn: order_sn, appkey: getApp().globalData.AppID, prepay_id: prepay_id
            }).then((res) => {
            });
          },
          'fail': function (res) {
            reject(res);
          },
          'complete': function (res) {
            reject(res);
          }
        });
      } else {
        reject(res);
      }
    });
  });
}


module.exports = {
  payOrder,
};











