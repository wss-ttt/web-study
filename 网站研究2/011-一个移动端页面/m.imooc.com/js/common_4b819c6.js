function launchAPP(e) {
    var a, s = "mukewang://" + (e || "www.imooc.com"),
    o = "";
    if (isPhone()) o = applink[0],
    window.location.href = s;
    else {
        o = applink[1];
        var i = document.createElement("iframe");
        i.style.display = "none";
        var r = function() {
            i && (clearTimeout(a), ifr.onload = null, i.parentNode.removeChild(i), i = null)
        };
        i.onload = r,
        i.src = s,
        document.body.appendChild(i)
    }
    a = setTimeout(function() {
        var e = Date.now();
        e - now > 500 || (window.location.href = o)
    },
    480)
}
function isWeChat() {
    var e = navigator.userAgent.toLowerCase();
    return "micromessenger" == e.match(/MicroMessenger/i) ? !0 : !1
}
function isQQ() {
    var e = navigator.userAgent.toLowerCase();
    return e.split("QQ").length > 1 && 0 == e.split("MQQBrowser/").length ? !0 : !1
}
function isPhone() {
    for (var e = navigator.userAgent,
    a = ["iPhone", "ipad"], s = !1, o = 0; o < a.length; o++) if (e.indexOf(a[o]) > -1) {
        s = !0;
        break
    }
    return s
}
var nativeShare = function() {
    var e = '<div class="share-box js-share-box">      <ul>        <li>          <a href="javascript:void(0)" class="js-share-qq js-share-cancel">            <i class="imwap-qq"></i><span>QQ空间</span>          </a>        </li>        <li>          <a href="javascript:void(0)" class="js-share-weibo js-share-cancel">            <i class="imwap-weibo"></i><span>微博</span>          </a>        </li>      </ul>      <a href="javascript:void(0)" class="btn-share-cancel js-share-cancel">取消</a>    </div>    <div class="mask-view js-share-mask"></div>',
    a = '<div class="share-box share-box-wx js-share-box">      <ul>        <li>          <a data-app="QZone"  href="javascript:void(0)" class="js-share-qq js-share-cancel">            <i class="imwap-qq"></i><span>QQ空间</span>          </a>        </li>        <li class="share-wechat">          <a data-app="weixin" href="javascript:void(0)" class="js-share-wechat js-share-cancel">            <i class="imwap-wechat"></i><span>微信</span>          </a>        </li>        <li class="share-friends">          <a data-app="weixinFriend" href="javascript:void(0)" class="js-share-friends js-share-cancel">            <i class="imwap-friends"></i><span>朋友圈</span>          </a>        </li>        <li>          <a href="javascript:void(0)"  data-app="sinaWeibo" class="js-share-weibo js-share-cancel">            <i class="imwap-weibo"></i><span>微博</span>          </a>        </li>      </ul>      <a href="javascript:void(0)" class="btn-share-cancel js-share-cancel">取消</a>    </div>    <div class="mask-view js-share-mask"></div>',
    s = {
        lower: "http://3gimg.qq.com/html5/js/qb.js",
        higher: "http://jsapi.qq.com/get?api=app.share"
    },
    o = {
        qq: {
            forbid: 0,
            lower: 1,
            higher: 2
        },
        uc: {
            forbid: 0,
            allow: 1
        }
    },
    i = navigator.appVersion,
    r = i.split("MQQBrowser/").length > 1 ? o.qq.higher: o.qq.forbid,
    n = i.split("UCBrowser/").length > 1 ? o.uc.allow: o.uc.forbid,
    t = {
        uc: "",
        qq: ""
    },
    c = !1;
    this.ucAppList = {
        sinaWeibo: ["kSinaWeibo", "SinaWeibo", 11, "新浪微博"],
        weixin: ["kWeixin", "WechatFriends", 1, "微信好友"],
        weixinFriend: ["kWeixinFriend", "WechatTimeline", "8", "微信朋友圈"],
        QQ: ["kQQ", "QQ", "4", "QQ好友"],
        QZone: ["kQZone", "QZone", "3", "QQ空间"]
    },
    this.encode = function(e) {
        return e = e.replace(/&/g, "%26"),
        e = e.replace(/=/g, "%3D"),
        e = e.replace(/\?/g, "%3F")
    },
    this.share = function(e) {
        var a = this.encode(shareData.title),
        s = this.encode(shareData.url),
        i = this.encode(shareData.desc),
        t = shareData.url,
        h = shareData.imgUrl;
        if ( - 1 == e.indexOf("weixin") && shareData.otherImgUrl && (h = shareData.otherImgUrl), n) e = "" == e ? "": "iPhone" == platform_os ? this.ucAppList[e][0] : this.ucAppList[e][1],
        "QZone" == e && (B = "mqqapi://share/to_qzone?src_type=web&version=1&file_type=news&req_type=1&image_url=" + h + "&title=" + a + "&description=" + i + "&url=" + s + "&app_name=" + t, k = document.createElement("div"), k.style.visibility = "hidden", k.innerHTML = '<iframe src="' + B + '" scrolling="no" width="1" height="1"></iframe>', document.body.appendChild(k), setTimeout(function() {
            k && k.parentNode && k.parentNode.removeChild(k)
        },
        5e3)),
        "undefined" != typeof ucweb ? ucweb.startRequest("shell.page_share", [a, a, t, e, "", "@" + t, ""]) : "undefined" != typeof ucbrowser && ucbrowser.web_share(a, a, t, e, "", "@" + t, "");
        else if (r && !c) {
            e = "" == e ? "": this.ucAppList[e][2];
            var d = {
                url: s,
                title: a,
                description: i,
                img_url: h,
                to_app: e,
                cus_txt: "请输入想要分享的内容"
            };
            d = "" == e ? "": d,
            "undefined" != typeof browser ? "undefined" != typeof browser.app && r == o.qq.higher && browser.app.share(d) : "undefined" != typeof window.qb && r == o.qq.lower && window.qb.share(d)
        }
    },
    this.isloadqqApi = function() {
        if (r) {
            var e = t.qq < 5.4 ? s.lower: s.higher,
            a = document.createElement("script"),
            o = document.getElementsByTagName("body")[0];
            a.setAttribute("src", e),
            o.appendChild(a)
        }
    },
    this.getPlantform = function() {
        return ua = navigator.userAgent,
        ua.indexOf("iPhone") > -1 || ua.indexOf("iPod") > -1 ? "iPhone": "Android"
    },
    this.is_weixin = function() {
        var e = i.toLowerCase();
        return "micromessenger" == e.match(/MicroMessenger/i) ? !0 : !1
    },
    this.getVersion = function(e) {
        var a = e.split("."),
        s = parseFloat(a[0] + "." + a[1]);
        return s
    },
    this.init = function() {
        platform_os = this.getPlantform(),
        t.qq = r ? this.getVersion(i.split("MQQBrowser/")[1]) : 0,
        t.uc = n ? this.getVersion(i.split("UCBrowser/")[1]) : 0,
        c = this.is_weixin(),
        r && t.qq < 5.4 && "iPhone" == platform_os || r && t.qq < 5.3 && "Android" == platform_os ? r = o.qq.forbid: r && t.qq < 5.4 && "Android" == platform_os ? r = o.qq.lower: n && (t.uc < 10.2 && "iPhone" == platform_os || t.uc < 9.7 && "Android" == platform_os) && (n = o.uc.forbid);
        var s = this;
        if (r || n) this.isloadqqApi(),
        $(document.body).append(a),
        $(".js-share-box a").on("click",
        function() {
            s.share($(this).data("app"))
        });
        else {
            var h = shareData.otherImgUrl || shareData.imgUrl;
            $(document.body).append(e).on("click", ".js-share-qq",
            function() {
                var e = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + encodeURIComponent(shareData.url) + "&title=" + encodeURIComponent(shareData.title) + "&desc=" + encodeURIComponent(shareData.desc) + "&summary=&site=&pics=" + h;
                window.open(e)
            }).on("click", ".js-share-weibo",
            function() {
                var e = "http://service.weibo.com/share/share.php?url=" + shareData.url + "&title=" + shareData.title + "&appkey=2254855082&pic=" + h + "&searchPic=true";
                window.open(e)
            })
        }
    },
    this.init()
},
urlParse = function(e) {
    var a = [],
    s = {};
    if ( - 1 != e.indexOf("?")) {
        var o = e.split("?")[1];
        if ( - 1 != o.indexOf("&")) {
            a = o.split("&");
            for (var i = 0; i < a.length; i++) s[a[i].split("=")[0]] = a[i].split("=")[1]
        } else s[o.split("=")[0]] = o.split("=")[1]
    }
    return s
},
applink = ["https://itunes.apple.com/cn/app/mu-ke-wang/id722179140?mt=8", "https://www.imooc.com/mobile/appdown"],
now = Date.now();
$(function() {
    function e() {
        if ($(".js-search-record").is(":hidden")) {
            var e = window.location.href;
            if (n("page", e), $("header").addClass("searching"), $(".adver-con").hide(), $(".js-search-record").show(), $("#wrapper").hide(), _hmt && _hmt.push) {
                var a = document.location.hostname;
                switch (a) {
                case "m.imooc.com":
                    a = "首页";
                    break;
                case "class.m.imooc.com":
                    a = "就业班首页"
                }
                _hmt.push(["_trackEvent", "搜索框", "click", a + "搜索框点击次数"])
            }
        }
    }
    function a() {
        $(".js-search-record").hide(),
        $(".adver-con").show(),
        $(".js-index-search")[0] && ($(".js-search-box").hide(), $(".js-index-search").show())
    }
    var s = "//m.imooc.com",
    o = 0;
    userInfo && $(".js-header-avator").size() > 0 && $.ajax({
        url: s + "/api/user/userInfo",
        dataType: "json",
        type: "get",
        xhrFields: {
            withCredentials: "true"
        },
        success: function(e) {
            if (200 == e.code) {
                var a = '<img src="' + e.data[0].pic + '" />';
                $(".js-header-avator").html(a),
                $(".js-nickname").size() > 0 && $(".js-nickname").html("hi，" + e.data[0].nickname)
            }
        },
        error: function() {
            console.log("发生错误，请稍后尝试！")
        }
    }),

    1 == sessionStorage.getItem("footer-appload-hide") && $("#bargain_enter").css("bottom", 0),
    $(document).on("click", ".js-share",
    function() {
        if (window.isApp && window.nativeSupport && "function" == typeof window.nativeSupport.share) {
            var e = shareData.otherImgUrl || shareData.imgUrl;
            window.nativeSupport.share(shareData.title, shareData.desc, "http:" + e, shareData.url)
        } else $(".js-share-box").length ? ($(".js-share-box").show(), $(".js-share-mask").show()) : nativeShare()
    }).on("click", ".js-share-cancel",
    function() {
        $(".js-share-box").hide(),
        $(".js-share-mask").hide()
    }).on("click", ".js-share-mask",
    function() {
        $(".js-share-box").hide(),
        $(".js-share-mask").hide()
    });
    var i = function(e) {
        if (e.stopPropagation(), now = Date.now(), isWeChat()) window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=cn.com.open.mooc";
        else {
            var a = "",
            s = window.location.hostname,
            o = window.location.pathname; - 1 != s.indexOf("class") ? a = "class.imooc.com/sc/" + urlParse(window.location.href).cid: $(this).hasClass("js-appload-open") ? (o.indexOf("article") >= 0 || o.indexOf("wenda") >= 0 || o.indexOf("act") >= 0) && (a = s + o) : a = "www.imooc.com",
            a && launchAPP(a, this)
        }
    };
    $("#js-appload-footer").on("click", i),
    $("#js-appload").on("click", i),
    $(".js-appload-open").on("click", i);
    var r = window.scrollY;
    $(window).on("scroll",
    function() {
        var e = window.scrollY;
        r > e ? o || $(".js-footer-appload").show() : $(".js-footer-appload").hide(),
        0 !== e || o || $(".js-footer-appload").show(),
        r = e
    });
    var n = function(e, a) {
        document.cookie = e + "=" + a + ";path=/;domain=imooc.com"
    };
    if ($(".js-search").on("input propertychange",
    function() {
        $(this).val().length > 0 ? $(".js-clear").show() : $(".js-clear").hide()
    }), $(".js-clear").on("click",
    function(e) {
        e.stopPropagation(),
        $(".js-search").val(""),
        $(".js-search").focus(),
        $(this).hide()
    }), $(".js-footer-appload-close").on("click",
    function() {
        $(".js-footer-appload").hide(),
        $("#bargain_enter").css("bottom", 0),
        o = 1,
        sessionStorage.setItem("footer-appload-hide", "1")
    }), $(".js-index-search").on("click",
    function() {
        $(this).hide(),
        console.log($(".js-search-box")[0]),
        $(".js-search-box").css("display", "block"),
        e()
    }), $(".js-search").on("focus",
    function() {
        $(this).val().length > 0 ? $(".js-clear").show() : $(".js-clear").hide(),
        e()
    }), $(".js-search").on("click",
    function(e) {
        e.stopPropagation()
    }), $(document).on("click",
    function() {
        $(".js-clear").hide()
    }), $(".js-search-box").size() > 0 && $(".js-search-record").size() > 0 && ($(".js-cancel").on("click",
    function() {
        $("header").removeClass("searching"),
        $("#wrapper").show(),
        a()
    }), $.ajax({
        url: s + "/api/search/searchword",
        type: "get",
        dataType: "json",
        xhrFields: {
            withCredentials: "true"
        },
        success: function(e) {
            if (1e3 == e.errorCode) {
                if (e.data.history.length > 0) {
                    for (var a = '<div class="search-history-box">                                        <p class="search-tit">搜索历史</p>                                        <dl class="clearfix">',
                    o = 0; o < e.data.history.length; o++) a += '<dd><a href="' + s + "/search/?words=" + e.data.history[o].word + '">' + e.data.history[o].word + "</a></dd>";
                    a += "</dl></div>",
                    $(".js-search-record").append(a)
                }
                if (e.data.hotword.length > 0) {
                    for (var i = '<div class="search-hot-box">                                    <p class="search-tit">热门搜索</p>                                    <dl class="clearfix">',
                    o = 0; o < e.data.hotword.length; o++) i += '<dd><a href="' + s + "/search/?words=" + e.data.hotword[o].name + '">' + e.data.hotword[o].name + "</a></dd>";
                    i += "</dl></div>",
                    $(".js-search-record").append(i)
                }
                $(".js-search-record").append('<a href="//www.imooc.com/course/list" class="check-type-btn">查看课程分类</a>')
            }
        }
    })), userInfo) {
        var t = s + "/api/user/ajaxusercheck?uid=" + userInfo.uid;
        $.ajax({
            url: t,
            type: "get",
            dataType: "json",
            xhrFields: {
                withCredentials: "true"
            },
            success: function(e) {
                0 == e.result && (alert(e.msg), window.location.href = "//m.imooc.com/passport/user/logout?referer=https://m.imooc.com")
            }
        })
    }
    $(".js-b-close").click(function() {
        $("#bargain_enter").remove()
    }),
    // 点击猿问
    $(".js-page-name").on("click",
    function() {
        $("header").hasClass("pageon") ? ($("body .mask-box").remove(), $("header").removeClass("pageon"), $(this).find("i").removeClass("imwap-arrow_u").addClass("imwap-arrow_d")) : ($(".js-drawer-more").hasClass("draweron") ? $(".js-drawer-more").removeClass("draweron") : $("body").append('<div class="mask-box"></div>'),
        // 这个代码都会执行
        $("header").addClass("pageon"), $(this).find("i").removeClass("imwap-arrow_d").addClass("imwap-arrow_u"))
    }),
    // 点击 "更多"
    $(".js-drawer-more").on("click",
    function() {
        $(this).hasClass("draweron") ? ($("body .mask-box").remove(), $(this).removeClass("draweron")) : ($("header").hasClass("pageon") ? $("header").removeClass("pageon") : $("body").append('<div class="mask-box"></div>'),
        // 这个代码都会执行
        $(".js-page-name").find("i").removeClass("imwap-arrow_u").addClass("imwap-arrow_d"), $(this).addClass("draweron"))
    }),

    // 点击遮罩层 遮罩层隐藏掉 箭头还原
    $("body").on("click", ".mask-box",
    function() {
        $("header").removeClass("pageon"),
        $(".js-drawer-more").removeClass("draweron"),
        $(".js-page-name").find("i").removeClass("imwap-arrow_u").addClass("imwap-arrow_d"),
        $(".mask-box").remove()
    })
}),
$(function() { (isWeChat() || isQQ()) && ($(".js-footer-appload").remove(), $(".js-share").remove())
});