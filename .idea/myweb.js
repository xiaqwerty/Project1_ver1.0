
//计算页面的加载时间
var page = document.getElementById("page").value;
var cid = document.getElementById("cid").value;
//结果id
var rid = document.getElementById("rid").value;
var cdata = "";
var operation = "Information";
var finalPoints = 1000;
var checkedSum = 0;
var PSum = 0;
var jsonAnswer = [];
getInformationParam(rid, operation);//初始化获取实验参数
//初始化加载获取基础数据
function getInformationParam(rid, operation) {
    $.ajax({
        type: "POST",
        url: ctx + "studys/information/getInformationParam",
        data: {"rid": rid, "operation": operation, "page": page},
        async: false,
        success: function (data) {
            $("#list").val(data.list);
            $("#count").val(data.count);
            $("#typenum").text(data.typenum);
            $("#title").text(data.title1);
            $("#title1").val(data.title);
            $("#colorlist").val(data.colorlist);
        }, error: function (msg) {
            alert("系统繁忙")
        }
    });
}

function getList(count) {
    var list = [];
    for (var i = 0; i < count; i++) {
        list.push("黄色");
    }
    for (var i = 0; i < (100 - count); i++) {
        list.push("绿色");
    }
    list.sort(sortNumber);
    list.sort(sortNumber);
    var liststr = "";
    for (var i = 0; i < list.length; i++) {
        if (i > 0) {
            liststr += ",";
        }
        liststr += list[i];
    }
    $("#colorlist").val(liststr);
}

function sortNumber() {
    return Math.random() - 0.5;
}

var checkCount = 0;
var checkCounthuangse = 0;
var timer = null;
var colorstr = "";
var result = "";
var finalChoice = "";
var clickflag = 0;
var colorlistsplit = $("#colorlist").val().split(",");
var listSplit = $("#list").val().split(",");
var begintime = getNowTime();
// $(function () {
//
// });
$(".gameFrameCell").click(function () {
    if (finalChoice == "") {
        var background = $(this).css("background-color");
        if (background == "rgba(0, 0, 0, 0)") {
            $(this).addClass("gameFrameCell2");
            var color = colorlistsplit[checkCount];
            if (checkCount > 0) {
                colorstr += ",";
            }
            colorstr += color;
            if (color == "黄色") {
                $(this).css({'background-color': '#eab106'});
                checkCounthuangse++;
            } else {
                $(this).css({'background-color': '#6aa045'});
            }
            checkCount++;
            var score = 500 - (5 * checkCount);
            $("#score").text("+" + score + " (500-5x" + checkCount + ")");
        } else if (background == "transparent") {
            $(this).addClass("gameFrameCell2");
            var color = colorlistsplit[checkCount];
            if (checkCount > 0) {
                colorstr += ",";
            }
            colorstr += color;
            if (color == "黄色") {
                $(this).css({'background-color': '#eab106'});
                checkCounthuangse++;
            } else {
                $(this).css({'background-color': '#6aa045'});
            }
            checkCount++;
            var score = 500 - (5 * checkCount);
            $("#score").text("+" + score + " (500-5x" + checkCount + ")");
        }
    }
})
/**/
//定时器2
function decision(text) {
    clearTimeout(timer);
    timer = setTimeout(text, 1000);
}


//点击下一页的时候调用
function setinformationParam(setinformationParam) {
    var time = getNowTime();
    //var title = $("#title").text();
    var title = $("#title1").val();
    var typenum = $("#typenum").text();
    var listSplitElement = listSplit[parseInt(typenum - 1)];
    if (clickflag == 0) {
        $("#xuanxiang").hide();
        // $("#next_button2").show();
        // document.getElementById("next_button23").disabled = "disabled";
        clickflag = 1;
        finalChoice = setinformationParam;
        var score = 500 - (5 * checkCount);
        if (setinformationParam == "黄色") {
            if (listSplitElement < 50) {
                $("#tipsdiv").show();
                $("#Tips").text("判断错误，扣100点");
                finalPoints = finalPoints - 100;
                result = "-100";
            } else {
                $("#tipsdiv").show();
                $("#Tips").text("判断正确，加" + score + "点");
                finalPoints = finalPoints + score;
                result = "+" + score;
            }
        }
        if (setinformationParam == "绿色") {
            if (listSplitElement > 50) {
                $("#tipsdiv").show();
                $("#Tips").text("判断错误，扣100点");
                finalPoints = finalPoints - 100;
                result = "-100";
            } else {
                $("#tipsdiv").show();
                $("#Tips").text("判断正确，加" + score + "点");
                finalPoints = finalPoints + score;
                result = "+" + score;
            }
        }
        showbtnColor();
    }
}

function showbtnColor() {
    var frameCell = $(".gameFrameCell");
    var countnum = checkCount;
    for (var i = 0; i < frameCell.length; i++) {
        var background = frameCell[i].style.backgroundColor;
        if (background == "rgba(0, 0, 0, 0)") {
            var color = colorlistsplit[countnum];
            if (color == "黄色") {
                frameCell[i].style.backgroundColor = "#eab106"
            } else {
                frameCell[i].style.backgroundColor = "#6aa045"
            }
            countnum++;
        }
        if (background == "") {
            var color = colorlistsplit[countnum];
            if (color == "黄色") {
                frameCell[i].style.backgroundColor = "#eab106"
            } else {
                frameCell[i].style.backgroundColor = "#6aa045"
            }
            countnum++;
        }
    }
    setTimeout("timestop2()", 2000);
}

//设置延迟
function timestop2() {
    $(".gameFrameCell").css({'background-color': 'rgba(0, 0, 0, 0)'});
    document.getElementById("next_button23").disabled = "";
    next_button();
}

function next_button() {
    var time = getNowTime();
    //  var title = $("#title").text();
    var title = $("#title1").val();
    var typenum = $("#typenum").text();
    var listSplitElement = listSplit[parseInt(typenum - 1)];
    var timecast = time - begintime;
    var yellowRatio = 0;
    if (colorstr == "") {
        yellowRatio = 0;
        yellowRatio = yellowRatio.toFixed(2);
    } else {
        yellowRatio = checkCounthuangse / checkCount;
        yellowRatio = yellowRatio.toFixed(2);
    }
    var z = 100 - checkCount;//计算剩余的格子数
    var A = 0;
    if (finalChoice == "黄色") {
        A = 51 - checkCounthuangse;
    } else {
        A = 51 - (checkCount - checkCounthuangse)
    }
    var P = 0;
    for (var i = A; i <= z; i++) {
        P += jiecheng(z) / (jiecheng(i) * jiecheng((z - i)));
    }
    P = Math.abs(P) / Math.pow(2, z);
    if (P > 1) {
        P = 1;
    }
    checkedSum = parseInt(checkedSum) + parseInt(checkCount);
    PSum = parseFloat(PSum) + parseFloat(P.toFixed(2));
    var content = "{\"type\": \"第二部分" + title + "\",\"typenum\": \"" + typenum + "\",\"checkCounthuangse\": \"" + checkCounthuangse + "\",\"squareRatio\": \"" + listSplitElement + "%-黄色--------" + (100 - parseInt(listSplitElement)) + "%-绿色\",\"checkCount\": \"" + checkCount + "\",\"yellowRatio\": \"" + yellowRatio + "\",\"checkColor\": \"" + colorstr + "\",\"finalChoice\": \"" + finalChoice + "\",\"result\": \"" + result + "\",\"timecast\": \"" + timecast + "\",\"sumpoints\": \"" + finalPoints + "\",\"P\": \"" + P.toFixed(2) + "\"}";
    // getBtnInfo(str, 0, operation, 0, page2, pid, cid, time, "按钮(Button)");
    var str = "{\"content\": " + content + ",\"qnum\":" + 0 + ",\"operation\": \"" + operation + "\",\"anum\": " + 0 + ",\"page\": " + page2 + ",\"pid\": " + pid + ",\"cid\": " + cid + ",\"time\": " + time + ",\"OneOperation\": \"按钮(Button)\",\"rid\": " + rid + "}";
    jsonAnswer.push(str);
    index++;
    page = index;
    showProgress();
    var count = $("#count").val();
    if (count == typenum) {
        getBtnInfo3();//保存数据
        //var sumfinalPoints = $("#sumfinalPoints").text();//总点数
        // var money = $("#money").text();//金额
        // var sumnum = $("#sumnum").val();//总总数
        // var sumPnum = 0;//p总数
        if (index_result == null) {
            index_result = {
                "finalPoints1": 0,
                "resultstatus": 1,
                "finalPoints2": 0,
                "num1": 0,
                "num2": 0,
                "sumPnum1": 0,
                "sumPnum2": 0
            };
        }
        var finalPoints1 = index_result.finalPoints1;//第一部分点数
        var resultstatus = index_result.resultstatus;//第一部分点数
        var finalPoints2 = finalPoints;//第二部分点数
        var num1 = index_result.num1;//第一部分点击总数
        var num2 = checkedSum;//第二部的点击总数
        var sumPnum1 = index_result.sumPnum1;//p1总数
        var sumPnum2 = PSum;//p2总数
        index_result = {
            "finalPoints1": finalPoints1,
            "finalPoints2": finalPoints2,
            "resultstatus": resultstatus,
            "num1": num1,
            "num2": num2,
            "sumPnum1": sumPnum1,
            "sumPnum2": sumPnum2
        };
        nextButton1();
    } else {
        $(".gameFrame").hide();
        $("#tip").hide();
        $("#xuanxiang").hide();
        $("#next_button2").hide();
        $("#tipsdiv").hide();
        $("#judge").show();
        $("#Judgmentoptions1").html("当前部分您已累计获得总点数<b>" + finalPoints + "<b>");
        decision("getInformationParam2()");//一秒后刷新
    }
}

function getBtnInfo3() {
    var title = $("#title1").val();
    $.ajax({
        type: "POST",
        url: ctx + "studys/information/getinformationSave",
        data: {"answer": JSON.stringify(jsonAnswer), "title": title, "projectID": projectID, "uid": uid},
        // async:false,
        success: function (msg) {
            if (msg) {
                if (num == 100) {
                    var endTime = getNowTime();
                    var rid = $("#rid").val();
                    getUser(pid, cid, page, startTime, endTime, rid);
                }
            }
        }, error: function (msg) {
            alert("系统繁忙")
            nextflag = 0;
        }
    });
}

function jiecheng(num) {
    for (var i = 1, fact = 1; i <= num; i++) {
        fact *= i;
    }
    return fact;
}

function getInformationParam2() {
    var typenum = $("#typenum").text();
    var count = $("#count").val();
    $(".gameFrame").show();
    $("#tip").show();
    $("#xuanxiang").show();
    $("#judge").hide();
    if (count == typenum) {
        nextButton1();
    } else {
        $("#typenum").text(parseInt(typenum) + 1);
        getInformationlist(rid, operation, listSplit[parseInt(typenum)]);
        checkCount = 0;
        checkCounthuangse = 0;
        timer = null;
        colorstr = "";
        result = "";
        finalChoice = "";
        clickflag = 0;
        $("#tipsdiv").hide();
        $("#next_button2").hide();
        $("#xuanxiang").show();
        $("#score").text("+500");
        $(".gameFrameCell").css({'background-color': 'rgba(0, 0, 0, 0)'});
        colorlistsplit = $("#colorlist").val().split(",");
        begintime = getNowTime();
    }
}

function getInformationlist(rid, operation, num) {
    getList(num);
    // $.ajax({
    //     type: "POST",
    //     url: ctx + "studys/information/getInformationlist",
    //     data: {"rid": rid, "operation": operation, "num": num},
    //     async: false,
    //     success: function (data) {
    //         $("#colorlist").val(data.colorlist);
    //     }
    // });
}

//多次点击无效
var nextflag = 0;

//点击下一页的时候调用
function nextButton1() {
    //点击1次
    if (nextflag == 1) {
        return;
    } else {
        nextflag = 1;
    }
    var time = getNowTime();
    var selectName = "实验结束跳转下一页";
    getBtnInfoNextButton(selectName, 0, "点击(Click)", 0, page2, pid, cid, time, "按钮(Button)");
    nextButton();
}

setTimeout("timestop()", 3000);

//设置延迟
function timestop() {
    document.getElementById("next_button").disabled = "";
    document.getElementById("next_button1").disabled = "";
}

if (rid) {
    getRandomsr(rid);
    //如果为0，则实验1组，如果为1则实验2
    if ($("#randomsr").val() == 0) {
    } else {
        //判断页码和配置id
        if (page == 11 && cid == 248) {
            cdata += "<p>A justice rating will not be available unless you click on a button that corresponds to that justice dimension. Moreover, " +
                "after you click on one button, you will need to wait for <u>three seconds</u> before you can click on another one. Finally, " +
                "you can check as many justice ratings as you wish and make a judgment any time after you check the first one.<br></p>";
        } else if (page == 77 && cid == 308) {
            cdata += "<p>The same as in the judgment task, after checking the ratings on one justice dimension, " +
                "you need to wait for <u>three seconds</u> before you can check those on another dimension.<br></p>";
        }
        $("#selectData").append(cdata);
    }
} else {
    $("#selectData").append(cdata);
}

$(function () {
    var loadTime = getNowTime();
    var selectLoadName = "第" + page2 + "页";
    getBtnInfo(selectLoadName, 0, "加载(Loading)", 0, page2, pid, cid, loadTime, null);
});
if (page2 == 1) {
    $('#span_button').html("I AGREE");
}


//根据resultID获取值
function getRandomsr(rid) {
    $.ajax({
        type: "POST",
        url: ctx + "studys/list/getRandomsr",
        data: {"rid": rid},
        async: false,
        success: function (data) {
            if (data) {
                $("#randomsr").val(data);
            }
        }, error: function (msg) {
            alert("系统繁忙")
        }
    });
}
