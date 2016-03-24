// 正则替换 原型链
String.prototype.trim = function() {
  return this.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var EventHandler = {

    addEvent: function(element, event, handler) {
      if (element.addEventListener) {
        element.addEventListener(event, handler);
        return;
      } else if (element.attachEvent) {
        element.attachEvent("on" + event, handler);
        return;
      } else {
        element["on" + event] = handler;
        return;
      }
    }


};

function $(selector, doc) {
  var doc = doc || document;
  if (selector.charAt(0) === '#') {
    return doc.getElementById(selector.slice(1));
  }
  if (selector.charAt(0) === '.') {
    return doc.getElementsByClassName(selector.slice(1));
  }
  return doc.getElementsByTagName(selector);
}

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var city = $("#aqi-city-input").value.trim();
  var value = $("#aqi-value-input").value.trim();
  console.log(city + "|" + value);
  if (!/[\u4e00-\u9fa5]{2,4}/.test(city)) {
    alert("请输入正确的城市名称");
    $("#aqi-city-input").focus();
    return;
  }

  if (!/[1-9][0-9]*/.test(value)) {
    alert("请正确输入空气质量");
    $("#aqi-value-input").focus();
    return;
  }
  aqiData[city] = value;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  $("#aqi-table").innerHTML = "";
  if (isEmpty(aqiData)) {
    return;
  };
  var template = [];
  template.push("<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>");
  for (var key in aqiData) {
    template.push("<tr><td>" + key + "</td><td>" + aqiData[key] + "</td><td><button>删除</button></td></tr>");
  }

  $("#aqi-table").innerHTML = template.join("");

}

function isEmpty(obj) {
  for (var key in obj) {
    return false;
  }
  return true;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  delete aqiData[city];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  EventHandler.addEvent($("#add-btn"), "click", addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  EventHandler.addEvent($("#aqi-table"), "click", function(event) {
    // target currentTarget 
    var btn = event.target;
    delBtnHandle(btn.parentNode.parentNode.firstChild.firstChild.nodeValue);
  });

}

init();
