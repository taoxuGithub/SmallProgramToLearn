const app = getApp()
const util = require('../../utils/util.js')//导入
var Title = ''
var Remember = ''
var ThisDateTime = util.formatTime(new Date())
Page({
  data: {
    ThisDateTime:util.formatTime(new Date())
  },
  TitleInput: function (e) {
    console.info(e),
    Title = e.detail.value,
    this.setData({
      ThisDateTime: util.formatTime(new Date())
    })
  },
  RememberInput: function (e) {
    console.info(e),
    Remember= e.detail.value,
    this.setData({
      ThisDateTime: util.formatTime(new Date())
    })
  },
  ADiaryCommit: function () {
    ThisDateTime = util.formatTime(new Date()),
    console.info(Title),
    console.info(Remember),
    console.info(ThisDateTime)
    if(Title==""){
      wx.showToast({
        title: '未输入标题',
      })
      return
    }
    if (Remember == "") {
      wx.showToast({
        title: '未输入内容',
      })
      return
    }
    const db = wx.cloud.database()
    db.collection('ADiary').add({
      data: {
        Title,
        Remember,
        ThisDateTime
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id
        })
        wx.showToast({
          title: '保存成功',
        })
        wx.navigateBack();
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '保存失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
  ADiaryClose: function () {
    if(Title!=""){
    }
    if (Remember!=""){
      wx.showModal({
        title: '提示',
        content: '当前记事本中有内容未保存是否放弃',
        success: function (res) {
          if (res.confirm) {
            Title = "";
            Remember = "";
            wx.navigateBack();
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      Title = "";
      Remember = "";
      wx.navigateBack();
      console.log('用户点击确定')
    }
    
  },
}
)