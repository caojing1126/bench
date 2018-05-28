var util = require('./utils/util.js');
var api = require('./config/api.js');
var user = require('./services/user.js');

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        this.globalData.code = res.code;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: "https://api.weixin.qq.com/sns/jscode2session?appid=wxaba6d03da0470b79&secret=d4a21962ad9525c5f40d5a82fa9a5e1b&js_code="+res.code+"&grant_type=authorization_code",
          header: {
            "content-type": "application/json"
          },
          success: res => {
            this.globalData.openid = res.data.openid
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          var that = this;
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          util.getUserInfo().then( res => {
            that.globalData.userInfo = res.userInfo;
            util.request(api.loginUrl,{"code": that.globalData.code,"userInfo": that.globalData.userInfo
            }, "post").then( res => {
              console.log(res)
            }).catch( err => {
              console.log(err)
            })
          }).catch( err => {
            console.log(err)
          })
         /* wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              wx.request({
                url: api.loginUrl,
                method: "post",
                data: {
                  "code": this.globalData.code,
                  "userInfo": this.globalData.userInfo
                },
                success: res => {
                  console.log("res")
                }
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })*/
        }
      }
    })
    //获取用户的登录信息
    user.checkLogin().then(res => {
      console.log('app login')
      this.globalData.userInfo = wx.getStorageSync('userInfo');
      this.globalData.token = wx.getStorageSync('token');
    }).catch(() => {
      
    });
  },
  
  globalData: {
    openid: "",
    code: "",
    userInfo: {
      nickName: 'Hi,游客',
      userName: '点击去登录',
      avatarUrl: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'
    },
    token: '',
    code: "",
  }
})