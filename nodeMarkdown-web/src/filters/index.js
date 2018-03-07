import vue from 'vue'

vue.filter('addUnit', function (limit) {
  var size = ''
  if (limit < 0.1 * 1024) {
    size = limit.toFixed(2) + 'B'
  } else if (limit < 0.1 * 1024 * 1024) {
    size = (limit / 1024).toFixed(2) + 'KB'
  } else if (limit < 0.1 * 1024 * 1024 * 1024) {
    size = (limit / (1024 * 1024)).toFixed(2) + 'MB'
  } else {
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
  }

  var sizestr = size + ''
  var len = sizestr.indexOf('.')
  var dec = sizestr.substr(len + 1, 2)
  if (dec === '00') {
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2)
  }
  return sizestr
})

vue.filter('formatDate', function (dateStr, fmt) {
  if (!dateStr) return ''
  var date = new Date(dateStr)
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
})
