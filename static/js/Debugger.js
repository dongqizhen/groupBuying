/**
 ? 在页面引入这个JS文件就可以使用debug模式
 　必须在getUrl.js文件下面引入这个文件
 */
function dynamicLoadJs(url, callback) {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  if (typeof (callback) == 'function') {
    script.onload = script.onreadystatechange = function () {
      if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
        callback();
        script.onload = script.onreadystatechange = null;
      }
    };
  }
  head.appendChild(script);
}


function log(text) {
  setTimeout(function () {
    console.log(text)
  }, 1000)
}


var isDebug = true;
if (g_server == 1 && isDebug) {
  dynamicLoadJs('./../js/eruda.js', function () {
    eruda.init();
  })
  isDebug = false;
}