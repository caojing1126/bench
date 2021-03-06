var api = require('../config/api.js');

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "GET") {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    })
  });
}

/**
 * 检查微信会话是否过期
 */
function checkSession() {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: function () {
        resolve(true);
      },
      fail: function () {
        reject(false);
      }
    })
  });
}

/**
 * 调用微信登录
 */
function login() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          //登录远程服务器
          console.log(res);
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}

function getUserInfo() {
  return new Promise(function (resolve, reject) {
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      }
    })
  });
}

function redirect(url) {

  //判断页面是否需要登录
  if (false) {
    wx.redirectTo({
      url: '/pages/auth/login/login'
    });
    return false;
  } else {
    wx.redirectTo({
      url: url
    });
  }
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: '/static/images/icon_error.png'
  })
}

function wxUploadFile (url,filePath,name,imgSrc,i,rUrl,data,method,success,fail) {
  if(i >= 0) {
      wx.uploadFile({
        url: url,
        filePath: filePath[i],
        name: name,
        success: res => {
          imgSrc.push(JSON.parse(res.data).data);
          console.log(imgSrc.toString())
          wxUploadFile(url, filePath, name, imgSrc, i - 1, rUrl, data, method, success,fail);
        },
        fail: err => {
          console.log(err)
        }
      })
  } else {
    data.list_pic_url = imgSrc.toString()
    console.log(data)
    wx.request({
      url: rUrl,
      data: data,
      method: method,
      success: success,
      fail: fail
    })
  }
}

function imgUploadFile (url,filePath,name,imgSrc,i) {
  return new Promise(function(resolve,reject) {
    wxUploadFile(url, filePath, name, imgSrc, i);
    wx.uploadFile({
      url: url,
      filePath: filePath[0],
      name: name,
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject(err)
      }
    });
  })
}

module.exports = {
  formatTime,
  request,
  redirect,
  showErrorToast,
  checkSession,
  login,
  getUserInfo,
  imgUploadFile,
  wxUploadFile,
}


