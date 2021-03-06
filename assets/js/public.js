/**
 * 请求
 * type 请求类型
 * url 请求路径
 * data 请求参数
 * callback 回调函数
 */
function request(type, url, data, callback){
	// let root = "http://www.lishanlei.cn"
    $.ajax({
        type : type,
        // url  : root+url,
        url  : url,
        dataType : 'json',
        data : data,
        success  : function(data) {
        	if(data.code == 0){
        		callback(data.result);
            }
            else if(data.code == 3) {
                window.location.href = 'http://tiaoji.mbahelper.cn/testStop.html'
            } 
            else {
        		layer.alert(data.msg);
        	}
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
        	console.log(textStatus);
        }
    });
}

//验证手机号是否合法
function validatetelephone(telephone) {
        re = /^1\d{10}$/;
    if (re.test(telephone)) {
        return telephone;
    } else {
        layer.alert("尊敬的用户：你输入的手机号有误！");
        return false;
    }
}

/**
 * 倒计时
 * id 标签id
 * time 时间
 */
function countDown(id, time){
    let tempTag = $(id);
    tempTag.addClass('disable');
    tempTag.text('重新获取(60)');
    tempTag.css('opacity','0.6');
    tempTag.css('paddingLeft','8%');
    tempTag.css('paddingRight','8%');
    var flag = true;
    if (flag) {
        flag = false;
        var timer = setInterval(() => {
            time--;
            tempTag.text('重新获取('+time+')');
            if (time < 10) {
                tempTag.text('重新获取(0'+time+')');
            };
            if (time === 0) {
                lock = true;
                clearInterval(timer);
                tempTag.text('重新获取');
                tempTag.removeClass('disable');
                tempTag.css('opacity','1');
                tempTag.css('paddingLeft','20%');
                tempTag.css('paddingRight','18%');
                flag = true;
            }
        }, 1000)
    }
}

/**
 * 发送验证码
 * phone 电话号码
 */
function sendSmsCode(phone){
    request('post', 'http://tiaoji.mbahelper.cn:8889/admin/dispen/sendSmsCode', { 'phone' : phone }, function(data){
        countDown('#telCode', 60);
    });
}

/**
 * 校验验证码
 * phone 电话号码
 * code 验证码
 */
function judgeSms(phone, code, callback){
    request('post', 'http://tiaoji.mbahelper.cn:8889/admin/dispen/judgeSms', {
        "phone" : phone,
        "smCode": code
    }, function(data){
        callback(phone);
    });
}

// Firefox, Google Chrome, Opera, Safari, Internet Explorer from version 9
function OnInput (event) {
    if(event.target.value != '') {
        $('#close-tel').css("opacity","1"); ;
    }
}
// Internet Explorer
function OnPropChanged (event) {
    if (event.propertyName.toLowerCase () == "value") {
        if(event.target.value != '') {
            $('#close-tel').css("filter","1");
        }
    }
}


//判断是pc还是mobile
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
       "SymbianOS", "Windows Phone",
       "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
       if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
       }
    }
    return flag;
 }