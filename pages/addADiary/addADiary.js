const app = getApp()
const util = require('../../utils/util.js')//导入
var Title = ''
var Remember = ''
var ThisDateTime = ''
Page({

  TitleInput: function (e) {
    console.info(e),
    Title = e.detail.value
  },
  RememberInput: function (e) {
    console.info(e),
    Remember= e.detail.value
  },
  ADiaryCommit: function () {
    ThisDateTime = util.formatTime(new Date()),
    console.info(Title),
    console.info(Remember),
    console.info(ThisDateTime)
  }
}
)