// pages/index/index.js
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../services/user.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sectionArray:["镇江"],
    sectionIndex: 0,
    bannerImageUrl:[
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    navList:[
      {
        url: "../tspl/tspl",
        icon: "../../static/images/home.png",
        text: "图书漂流"
      },
      {
        url: "",
        icon: "../../static/images/home.png",
        text: "房屋租凭"
      },
      {
        url: "",
        icon: "../../static/images/home.png",
        text: "西服租凭"
      },
      {
        url: "",
        icon: "../../static/images/home.png",
        text: "签到"
      }
    ],
    forumList: [
      {
        imageUrl: "http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png",
        money: "50",
        userName: "大爷",
        time: "10分钟前来过",
        mes: "自己养了很久的猫咪，现在主子就交给你们了，急求寄养，送猫粮猫砂！",
        banner: [],
        channel: [],
        hotGoodsList: []
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: api.IndexUrl,
      success: (res) => {
        console.log(res);
        that.setData({
          banner: res.data.data.banner,
          channel: res.data.data.channel,
          hotGoodList: res.data.data.hotGoodList
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