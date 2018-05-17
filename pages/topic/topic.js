// pages/topic/topic.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: "",
    menuList: [
      {
        color: "rgba(253,249,221,1)",
        text: "毕业服租凭"
      },
      {
        color: "rgba(253,238,240,1)",
        text: "纪念品"
      },
      {
        color: "rgba(253,249,221,1)",
        text: "西服租凭"
      },
      {
        color: "rgba(253,238,240,1)",
        text: "致远书屋"
      },
      {
        color: "rgba(253,249,221,1)",
        text: "学府考研"
      },
      {
        color: "rgba(253,238,240,1)",
        text: "校园驾校"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
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