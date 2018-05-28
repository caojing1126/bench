// pages/tspl/tspl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    forumList: [
      {
        imageUrl: "http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png",
        money: "50",
        userName: "大爷",
        time: "10分钟前来过",
        mes: "自己养了很久的猫咪，现在主子就交给你们了，急求寄养，送猫粮猫砂！",
        image: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ]
      }
    ],
    section: {
      name: "",
      input: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id == "1005008") { this.data.section.name = "图书漂流"; this.data.section.input = "西游记"; }
    if (options.id == "2") { this.data.section.name = "房屋租赁"; this.data.section.input = "上林苑"; }
    if (options.id == "3") { this.data.section.name = "西服租赁"; this.data.section.input = "西装"; }
    this.setData({
      section: this.data.section
    })
    wx.request({
      url: "https://xcxy.xuechuang.online/platform-admin-1.0.0/api/goods/list?category_id="+options.id,
      success: res =>{
        console.log(res);
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
   * 搜索框点击跳转
   */
  bindSearchInput: function () {
    wx.navigateTo({
      url: '../search/search',
    })
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