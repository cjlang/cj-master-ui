const Base64 = require('js-base64').Base64
import jsmd5 from 'js-md5'
/**
 * 通用工具类
 */
const tools = {
  /**
   * 跳转新的页面
   * @param {*} url
   */
  jump_blank (url) {
    window.open(url, '_blank')
  },
  getRandom(n){
    return Math.floor(Math.random()*n+1)
  },
  /**
   * Base64加密
   * @param {*} text
   * @returns
   */
  encode (text) {
    return Base64.encode(text)
  },
  /**
   * MD5加密
   * @param {*} text 
   * @returns 
   */
  md5 (text){
    return jsmd5(text)
  },
  /**
   * Base64解码
   * @param {*} text
   * @returns
   */
  decode (text) {
    return Base64.decode(text)
  },
  /**
   * 合并数组
   * @param {*} arr1
   * @param {*} arr2
   * @returns
   */
  merge (arr1, arr2) {
    const mergeArr = arr1
    for (const index in arr2) {
      mergeArr.push(arr2[index])
    }
    return mergeArr
  },
  /**判断对象是否为空 */
  isBlank(obj) {
    if (typeof obj == "undefined" || obj == null || obj.trim() == "") {
        return true;
    } else {
        return false;
    }
  },
  isNotBlank(obj) {
    return !isBlank(obj);
  },
  getUUID() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
    })
  },
  fullScreenById() {
    var el =document.getElementById("app");
    var isFullscreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
    if (!isFullscreen) { //进入全屏,多重短路表达式
        (el.requestFullscreen && el.requestFullscreen()) ||
        (el.mozRequestFullScreen && el.mozRequestFullScreen()) ||
        (el.webkitRequestFullscreen && el.webkitRequestFullscreen()) || (el.msRequestFullscreen && el.msRequestFullscreen());
    } else { //退出全屏,三目运算符
        document.exitFullscreen ? document.exitFullscreen() :
        document.mozCancelFullScreen ? document.mozCancelFullScreen() :
        document.webkitExitFullscreen ? document.webkitExitFullscreen() : '';
    }
  },
  isFullscreen(){
    var isFull = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
    return isFull
  },
  pretifyJson(json, pretify=true){
    if (typeof json !== 'string') {
        if(pretify){
            json = JSON.stringify(json, undefined, 4);
        }else{
            json = JSON.stringify(json);
        }
    }
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function (match) {
            let cls = "<span>";
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = "<span class='key'>";
                } else {
                    cls = "<span class='string'>";
                }
            } else if (/true|false/.test(match)) {
                cls = "<span class='boolean'>";
            } else if (/null/.test(match)) {
                cls = "<span class='null'>";
            }
            return cls + match + "</span>";
        }
    );
  }
}

export default tools
