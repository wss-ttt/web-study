!
function() {
    var a = [],
    e = function() {
        $.ajax({
            type: "GET",
            url: "//www.imooc.com/apiw/logo",
            dataType: "jsonp",
            success: function(e) {
                if (1 == e.result) {
                    for (adver in e.data) e.data[adver],
                    a.push(adver);
                    i(e.data)
                }
            },
            error: function(a) {
                console.log(a)
            }
        })
    },
    i = function(e) {
        $.each(a,
        function(a, i) {
            if (!e[i] || !e[i].length) return 0;
            if ($("#" + i).size() > 0) {
                if (w_or_h = "wap_global_banner" == i || "wap_class_banner" == i || "wap_coding_banner" == i ? "height:100%;width:auto;": "width:100%;height:auto;", "yuanwenindex" == i) var n = ['<a class="js-advertisement new-issue-link" href="javascript:;" data-adver-id="', e[i][0].id, '" data-jump-url="', e[i][0].links, '"><span class="issue-icon"></span><p class="issue-p">', e[i][0].name, "</p></a>"],
                t = n.join("");
                else if ("wenzhangindex" == i) {
                    if (e[i].length > 0) for (var t = "",
                    a = 0; a < e[i].length; a++) t += '<div class="swiper-slide">	                    			<a class="js-advertisement" href="javascript:;" data-adver-id="' + e[i][a].id + '" data-jump-url="' + e[i][a].links + '"><img src="//img.mukewang.com/' + e[i][a].pic + '.jpg" alt="' + e[i][a].name + '">			                        <p>' + e[i][a].name + "</p>						    	</a>			                </div>"
                } else var n = ['<a class="js-advertisement" href="javascript:;" data-adver-id="', e[i][0].id, '" data-jump-url="', e[i][0].links, '"><img src="//img.mukewang.com/', e[i][0].pic, '.jpg" alt="', e[i][0].name, '" style="display:inline-block;', w_or_h, '">'],
                t = n.join("");
                $("#" + i).append(t),
                $(".swiper-container-banner").size() > 0 && s()
            }
        })
    },
    n = function() {
        var a = {};
        a.adv_id = $(this).data("adver-id");
        var e = $(this).data("jump-url");
        $.ajax({
            type: "get",
            url: "//www.imooc.com/apiw/click",
            data: a,
            dataType: "jsonp",
            success: function() {},
            error: function(a) {
                console.log(a)
            }
        }),
        window.location.href = e
    },
    s = function() {
        new Swiper(".swiper-container-banner", {
            autoplay: 3e3,
            speed: 500,
            loop: !0,
            centeredSlides: !0,
            slidesPerView: "auto"
        })
    };
    $(document).on("click", ".js-advertisement",
    function() {
        n.call(this)
    }),
    e()
} ();