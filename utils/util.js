const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
var sub = function (val) {
  if (val.length == 0 || val == undefined) {
    return;
  }
  if (val.length > 17) {
    return val.substring(0, 17) + "...";
  } else {
    return val;
  }
}
module.exports = {//导出
  formatTime: formatTime,
  sub:sub
}
