var browser = {
    versions: function() {
        var e = navigator.userAgent;
        navigator.appVersion;
        return {
            trident: e.indexOf("Trident") > -1,
            presto: e.indexOf("Presto") > -1,
            webKit: e.indexOf("AppleWebKit") > -1,
            gecko: e.indexOf("Gecko") > -1 && -1 == e.indexOf("KHTML"),
            mobile: !!e.match(/AppleWebKit.*Mobile.*/),
            ios: !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: e.indexOf("Android") > -1 || e.indexOf("Linux") > -1,
            iPhone: e.indexOf("iPhone") > -1,
            iPad: e.indexOf("iPad") > -1,
            webApp: -1 == e.indexOf("Safari")
        }
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

function post_video() {
    if (browser.versions.mobile)
        return !1;
    $(document).on("mouseenter mouseleave", ".post-video", function(t) {
        var e = $(this).find(".show-image")
          , i = $(this).find("video");
        i.hide();
        if ("mouseenter" == t.type) {
            $(this).find(".play-icon").css('opacity', 0);
            if (i.trigger("pause"),
            i.length <= 0)
                return;
            e.hide(),
            i.show()
            var a = i.attr("data-src");
            i.attr("src", a)
        } else
            "mouseleave" == t.type && i.trigger("pause"),
            i.hide(),
            e.show(),
            $(this).find(".play-icon").css('opacity', '1')
    })
}

function post_music() {
    if (browser.versions.mobile)
        return !1;

    var url1 = window.location.href;
    var url2 = document.domain;
    var xyt = window.location.protocol + '//';
    var url = xyt + url2;

    $(document).on("mouseenter mouseleave", ".post-audio", function(t) {
        var i = $(this).find("video");
        if ("mouseenter" == t.type) {
            var id = $(this).attr('.audio-play');
            var src = $(this).attr('video-data');
            $(this).find('.play-icon').attr('src', url + '/wp-content/themes/ceomax/static/images/pause.png');
            $(this).find('.play-pan').css({
                "-webkit-animation": "z 5s linear 0s infinite",
                "-moz-animation": "z 5s linear 0s infinite",
                "-ms-animation": "z 5s linear 0s infinite",
                "animation": "z 5s linear 0s infinite",
            })
            $(this).find('.play-zhen').css({
                "transform": "rotate(15deg)"
            })
            $(this).find('.audio-play').attr('src', src);

            if (i.trigger("pause"),
            i.length <= 0)
                return;
            e.hide(),
            i.show();
            var a = i.attr("data-src");
            i.attr("src", a)
        } else
            "mouseleave" == t.type && i.trigger("pause"),
            i.hide();
        var id = $(this).attr('post-id');
        var src = $(this).attr('video-data');
        $(this).find('.play-icon').attr('src', url + '/wp-content/themes/ceomax/static/images/play.png');
        $(this).find('.play-zhen').css({
            "transform": "rotate(-9deg)"
        })
        $(this).find('.play-pan').css({
            "animation": "none"
        })
        $(this).find('#player-' + id).attr('src', '');
    })
}

$(function() {
    post_video()
    post_music()
})
