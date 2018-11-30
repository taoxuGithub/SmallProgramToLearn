//app.js
App({
  onLaunch: function () {
    
    // 登录
    wx.login({
      
      success: res => {
        if (res.code) {  
          console.log(res);
          wx.cloud.callFunction({
            name: 'login',
            success: res => {
              console.log('[云函数] [login] user openid: ', res.result.openid)
              this.globalData.openid = res.result.openid
            },
            fail: err => {
              console.error('[云函数] [login] 调用失败', err)
            }
          })

          // var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx6835002130e76cd3&secret=5498fcab2xxxx5df26bf854ba89&js_code=' + res.code+'&grant_type=authorization_code';
          // wx.request({   
          //   url: l,
          //   data: {},
          //   method: 'GET',
          //   success: function (res) {
          //     var obj = {};
          //     obj.openid = res.data.openid;
          //     console.log("openid:" + obj.openid);
          //     console.log("session_key:" + res.data.session_key);
          //     obj.expires_in = Date.now() + res.data.expires_in;
          //     wx.setStorageSync('user', obj);//存储openid 
          //   }
          // })
        }
        // wx.request({
        //   url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
        //   data: {
        //     code: res.code
        //   }
        // })
        //GET https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // // 获取用户信息 API中已经废弃wx.getSetting方法
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
   
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
  },
  globalData: {
    userInfo: null
  }
})