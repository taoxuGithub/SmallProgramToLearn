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
    // wx.cloud.callFunction({
    //   name: 'login',
    //   success: res => {
    //     console.log('[云函数] [login] user openid: ', res.result.openid)
    //     app.globalData.openid = res.result.openid
    //   },
    //   fail: err => {
    //     console.error('[云函数] [login] 调用失败', err)
    //   }
    // })
    // // 获取用户信息API中已经废弃wx.getSetting方法
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           this.setData({
    //             avatarUrl: res.userInfo.avatarUrl,
    //             userInfo: res.userInfo,
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
     // 查看是否授权
    // wx.getSetting({
    //   success (res){
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function(res) {
    //           console.log(res.userInfo)
    //         }
    //       })
    //     }
    //   }
    // })
  // bindGetUserInfo (e) {/
    console.log(this.data.openid)
  // }
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('ADiary').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        const length = res.data.length
        for (let i = 0; i < length; ++i) {
          var newArray = [{
            NumberId:i+1,
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
        // console.log('[数据库] [查询记录] 成功: ', res)
      },
    })
    // console.log("初始化index")
  },
  onGetUserInfo: function (e) {
    // console.log(e)
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
