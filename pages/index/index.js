//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')//导入
Page({
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    array: [],
  },

  onLoad: function () {

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
              })
            }
          })
        }
      }
    })
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('ADiary').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        console.log(res.data)
        const length = res.data.length
        // const s=''
        for (let i = 0; i < length; ++i) {
          var newArray = [{
            Title: res.data[i].Title,
            Remember: res.data[i].Remember,
            Remembers: util.sub(res.data[i].Remember),
            ThisDateTime: res.data[i].ThisDateTime
          }];
          this.data.array= this.data.array.concat(newArray)
        }
        this.setData({
          array: this.data.array
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
    })
    console.log("初始化index")
  },
  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  addADiary:function(){
    wx.navigateTo({
      url: '../addADiary/addADiary',
    })
  },
}
)
