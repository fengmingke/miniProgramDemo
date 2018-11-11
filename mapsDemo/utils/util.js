const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getLocationAndOpenMap (callback) {
  wx.getLocation({
    type: 'gcj02',  //返回可以用于wx.openLocation的经纬度
    success: function(res) {
      var latitude = res.latitude;
      var longitude = res.longitude;
      console.log(res);
      wx.openLocation({
        latitude: latitude,
        longitude: longitude,
        scale: 28
      })
    }
  })
}

function getLocationPois(callback) {
  wx.getLocation({
    type: 'gcj02',  //返回可以用于wx.openLocation的经纬度
    success: function (res) {
      var latitude = res.latitude;
      var longitude = res.longitude;
      getPoisByLocation(latitude, longitude, callback);
    }
  })
}

//获取某个坐标的地址和周边的pois信息
function getPoisByLocation(latitude, longitude, callback) {
  //具体json返回格式可自行参考腾讯地图API接口文档
  var key = "WEGBZ-F2I3X-6VV4L-ZIGVN-KKTG7-I3FPG";
  var url = "https://apis.map.qq.com/ws/geocoder/v1/?location=" + latitude + "," + longitude + "&key=" + key + "&get_poi=1";
  // var defaultUrl = "http://www.apayado.com/pois.json?" + new Date().getTime();

  wx.request({
    url: url,
    success: function(res) {
      console.log(res)
      callback(res.data.result);
    },
    fail: function(res) {

    }
  })
}

module.exports = {
  formatTime: formatTime,
  getLocationAndOpenMap: getLocationAndOpenMap,
  getLocationPois: getLocationPois
}
