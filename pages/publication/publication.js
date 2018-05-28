// pages/publication/publication.js
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../services/user.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    kind: [
      { id: "1005008", name: "图书漂流" },
      { id: "1005010", name: "生活用品" },
      { id: "1005009", name: "图书转租" },
      { id: "1005001", name: "体育用材" },
      { id: "1005002", name: "电子数码" },
      { id: "1005012", name: "其他" },
    ],
    kindIndex: 0,
    degree: ["九成新", "八成新"],
    degreeIndex: 0,
    campus: ["镇江", "江苏大学", "江苏科技大学"],
    campusIndex: 0,
    uploadImgSrc: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

  bindPickerKind: function (e) {
    this.setData({
      kindIndex: e.detail.value
    })
  },

  bindPickerDegree: function (e) {
    this.setData({
      degreeIndex: e.detail.value
    })
  },

  bindPickerCampus: function (e) {
    this.setData({
      campusIndex:e.detail.value
    })
  },

  bindUploadImg: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: "original",
      success: function(res) {
        console.log(res);
        let i = 0;
        while (res.tempFilePaths[i]) {
          that.data.uploadImgSrc.push(res.tempFilePaths[i++]);
        }
        that.setData({
          uploadImgSrc: that.data.uploadImgSrc
        })
      },
    })
  },

  bindDeleteImg: function (e) {
    delete this.data.uploadImgSrc[e.target.dataset.index];
    this.setData({
      uploadImgSrc: this.data.uploadImgSrc
    })
  },

  bindSubmit: function (e) {
    var that = this;
    console.log(e.detail.value)
    if (e.detail.value.descript == "") {
      wx.showToast({
        title: '商品描述不能为空',
        icon: "loading",
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (e.detail.value.price == "") {
      wx.showToast({
        title: '价格不能为空',
        icon: "loading",
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (!/^[0-9]+$/.test(e.detail.value.price)) {
      wx.showToast({
        title: '价格必须是数字',
        icon: "loading",
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (e.detail.value.price <= 0) {
      wx.showToast({
        title: '价格必须大于0',
        icon: "loading",
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (e.detail.value.tel == "") {
      wx.showToast({
        title: '手机号码不能为空',
        icon: "loading",
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (e.detail.value.tel.length != 11) {
      wx.showToast({
        title: '请输入11位手机号码',
        icon: "loading",
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }else {
      var file = e.detail.value;
      file.img = that.data.uploadImgSrc;
      let imgSrc = new Array();
      util.wxUploadFile('http://47.98.191.33/platform-admin-1.0.0/api/upload/upload', that.data.uploadImgSrc, 'file', imgSrc, that.data.uploadImgSrc.length - 1,api.saveUrl,
        {
          "goods_brief": e.detail.value.descript,
          "category_id": that.data.kind[that.data.kindIndex].id,
          "goods_desc": that.data.degreeIndex,
          "retail_price": file.price,
          "goods_unit": that.data.campusIndex + 1,
          "mobile": file.tel,
          "is_delete": 1,
          "create_user_id": 1,
          "list_pic_url":  imgSrc.toString()
        },
        "post",
        res => {
          console.log(res)
        },
        err => {

        },
      )
    }
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