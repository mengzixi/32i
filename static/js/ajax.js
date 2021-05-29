// 验证邮箱邮件 重新发送
var t = 60;
function showTime(item){
    item ? item : item = '#re_send_mail';
    t -= 1;
    $(item).text('重新发送（'+t+'）');
    $('#re_send_mail').css("pointer-events","none")
    var f = setTimeout("showTime('"+item+"')",1000);

    if(t==0){
       $(item).text('重新发送');
       $('#re_send_mail').css("pointer-events","auto")
       window.clearTimeout(f);
       t=60;
    }

}


(function($) {

// 重新发送邮件
$(document).on('click', '#re_send_mail', function(event) {
    event.preventDefault();
    $.ajax({
        url: zongcai.ajaxurl,
        type: 'POST',
        dataType: 'json',
        data: {action: 're_send_mail'},
    })
    .done(function( data ) {
        if( data.state == 200 ){
            showTime('#re_send_mail');
        }else{
            alert(data.tips)
        }
    })
    .fail(function() {
        alert('网络错误，请稍候再试！');
    });


});

// 账号登录
$('#login-form').submit(function(event) {
    event.preventDefault();

    $.ajax({
        url: zongcai.ajaxurl,
        type: 'POST',
        dataType: 'json',
        data: $('#login-form').serializeArray(),
    })
    .done(function( data ) {
        if( data != 0 ){
            if( data.state == 200 ){
                if( data.url ){
                    window.location.href = data.url;
                }
            }else if( data.state == 201 ){
                $('.zongcai-tips').removeClass('success').addClass('error').text(data.tips);
            }
        }else{
            $('.zongcai-tips').removeClass('success').addClass('error').text('请求错误！');
        }
    })
    .fail(function() {
        alert('网络错误！');
    });

});

//注册账号
$('#register-form').submit(function(event) {
    event.preventDefault();

    $.ajax({
        url: zongcai.ajaxurl,
        type: 'POST',
        dataType: 'json',
        data: $('#register-form').serializeArray(),
    })
    .done(function( data ) {
        if( data != 0 ){
            if( data.state == 200 ){
                if( data.url ){
                    window.location.href = data.url;
                }
            }else if( data.state == 201 ){
                $('.zongcai-tips').removeClass('success').addClass('error').text(data.tips);
            }
        }else{
            $('.zongcai-tips').removeClass('success').addClass('error').text('请求错误！');
        }
    })
    .fail(function() {
        alert('网络错误！');
    });

});

//收藏
jQuery(document).on("click", ".add-collection", function() {

    var post_id = $(this).data("id");
    var $this = $(this);

    jQuery.ajax({
        url: zongcai.ajaxurl,
        data: {
            action:"do_collection",
            post_id:post_id
        },
        type: 'post',
        dataType: 'json',
        success:function(data){

            if(data.state == 1){
            	UIkit.notification({
					message: '感谢收藏！',
					status: 'success',
				});
                $this.addClass("cancel-collection").removeClass("add-collection").html("<i class='fa fa-star'></i> 已收藏 "+data.num+"");
            }else{

                if( data.state == 300 ){
                    alert(data.tips);
                    window.location.href = data.url;
                } else{
                    alert(data.tips);
                }

            }

        },

    });
    return false;
});

//取消收藏
jQuery(document).on("click", ".cancel-collection", function() {

    var post_id = $(this).data("id");
    var $this = $(this);

    jQuery.ajax({
        url: zongcai.ajaxurl,
        data: {
            action:"cancel_collection",
            post_id:post_id
        },
        type: 'post',
        dataType: 'json',
        success:function(data){

            if(data.state == 1){
            	UIkit.notification({
					message: '取消收藏！',
					status: 'warning',
				});
                $this.addClass("add-collection").removeClass("cancel-collection").html("<i class='fa fa-star-o'></i> 收藏 "+data.num+"");
            }else{
                alert(data.tips);
            }

        },

    });
    return false;
});

//文章页面，刷新页面后取消收藏
$(document).on('click', '.single-del-collection', function() {

    var post_id = $(this).data('id');
    var $this = $(this);

    jQuery.ajax({
        url: zongcai.ajaxurl,
        data: {
            action:"cancel_collection",
            post_id:post_id
        },
        type: 'post',
        dataType: 'json',
        success:function(data){

            if(data.state == 1){
                $this.addClass("add-collection").removeClass("single-del-collection").html("<i class='fa fa-star-o'></i> 收藏 "+data.num+"");
            }else{
                alert(data.tips);
            }

        },

    });

});

//用户中心取消收藏文章
$(document).on('click', '.del-collection', function(event) {
    event.preventDefault();
    var id = $(this).data('id');

    jQuery.ajax({
        url: zongcai.ajaxurl,
        data: {
            action:"cancel_collection",
            post_id:id
        },
        type: 'post',
        dataType: 'json',
        success:function(data){

            if(data.state == 1){
                $('.collection-post-'+id).remove();
            }else{
                alert(data.tips);
            }

        },
    });

});


// 用户中心 我的收藏  移除收藏
(function($){
    var $dp_handle = $('.dropdown-handle');

    $dp_handle.on('click', toggleSettings);

    function toggleSettings() {
        var $this = $(this),
            $dp = $this.siblings('.dropdown');

        if($dp.hasClass('closed')) {
            $dp.removeClass('closed');
            $this.addClass('active');
        } else {
            $dp.addClass('closed');
            $this.removeClass('active');
        }
    }
})(jQuery);

// 修改资料
$('#updata_accounts').submit(function(event) {
    event.preventDefault();

    $.ajax({
        url: zongcai.ajaxurl,
        type: 'POST',
        dataType: 'json',
        data: $('#updata_accounts').serializeArray(),
    })
    .done(function( data ) {
        alert(data.tips);
        location.reload();
    })
    .fail(function() {
        alert('网络错误！');
    });

});


//用户中心修改密码
$(document).on('click', '#change_password_button', function(event) {
    event.preventDefault();

    var oldpwd = $('#oldpassword').val();
    var pwd1 = $('#newpassword').val();
    var pwd2 = $('#newpassword2').val();

    var err = 0;

    if( oldpwd == '' ){
        $('.oldpassword').removeClass('success').addClass('error');
        $('.oldpassword .zongcai-tips').text('请输入旧密码');
        $('.oldpassword .zongcai-tips').show();
        err = 1;
    }else{
        $('.oldpassword .zongcai-tips').hide();
    }

    if( pwd1 == '' ){
        $('.newpassword').removeClass('success').addClass('error');
        $('.newpassword .zongcai-tips').text('请输入密码');
        $('.newpassword .zongcai-tips').show();
        err = 1;
    }else{
        $('.newpassword .zongcai-tips').hide();
    }

    if( pwd2 == '' ){
        $('.newpassword2').removeClass('success').addClass('error');
        $('.newpassword2 .zongcai-tips').text('请输入密码');
        $('.newpassword2 .zongcai-tips').show();
        err = 1;
    }else{
        $('.newpassword2 .zongcai-tips').hide()
    }

    if( pwd1 && pwd2 ){

        if( pwd1 != pwd2 ){
            $('.newpassword2,.newpassword').removeClass('success').addClass('error');
            $('.newpassword2 .zongcai-tips,.newpassword .zongcai-tips').text('密码不一致');
            $('.newpassword2 .zongcai-tips,.newpassword .zongcai-tips').show();
            err = 1;
        }else if( pwd1.length < 6 ){
            $('.newpassword2,.newpassword').removeClass('success').addClass('error');
            $('.newpassword2 .zongcai-tips,.newpassword .zongcai-tips').text('密码不能少于六位');
            $('.newpassword2 .zongcai-tips,.newpassword .zongcai-tips').show();
            err = 1;
        }

    }

    if( err != 1 ){

        $.ajax({
            url: zongcai.ajaxurl,
            type: 'POST',
            dataType: 'json',
            data: $('#change_password').serializeArray(),
        })
        .done(function(data) {

            if( data.state ){
                alert(data.tips);
                window.location.href =  window.location.href;
            }else{
                alert(data.tips);
            }

        })
        .fail(function() {
            alert('网络错误，请稍候再试！');
        });

    }

});

//QQ登录
jQuery(document).on("click", ".qq_login_button",
    function() {
        //var w = window.open("","QQ授权登录",["toolbar=0,status=0,resizable=1,width=640,height=560,left=", (screen.width - 640) / 2, ",top=", (screen.height - 560) / 2].join(""));
        jQuery.ajax({
            url: zongcai.ajaxurl,
            type: "POST",
            data: {action:"ajax_qq",ref:location.href},
            success: function(data) {
                window.location = data;
				//console.log(data);
            }
        });
    return false;
});

//第三方账号首次登录需绑定本站账号
$('#login_binding').submit(function(event) {
    /* Act on the event */
    event.preventDefault();

        $.ajax({
            url: zongcai.ajaxurl,
            type: 'POST',
            dataType: 'json',
            data: $('#login_binding').serializeArray(),
        })
        .done(function( data ) {
            if( data != 0 ){
                if( data.state == 200 ){
                    if( data.url ){
                    	//alert(data.tips);
                        window.location.href = data.url;
                    }
                }else if( data.state == 201 ){
                    alert(data.tips);
                }
            }else{
                alert('请求错误！');
            }
        })
        .fail(function() {
            alert('网络错误！');
        });

});

//第三方账号首次登录，没有本站账号的情况下注册新账号并绑定
$('#reg_binding').submit(function(event) {
    event.preventDefault();

        $.ajax({
            url: zongcai.ajaxurl,
            type: 'POST',
            dataType: 'json',
            data: $('#reg_binding').serializeArray(),
        })
        .done(function( data ) {
            if( data != 0 ){
                if( data.state == 200 ){
                    if( data.url ){
	                    //alert(data.tips);
	                    //window.location.href = data.url;
                        window.location.reload()
                    }
                }else if( data.state == 201 ){
                    alert(data.tips);
                }
            }else{
                alert('请求错误！');
            }
        })
        .fail(function() {
            alert('网络错误！');
        });

});


//文章点赞
$.prototype.postLike = function () {
	if ($(this).hasClass('done')) {
		UIkit.notification({
			message: '<i class="iconfont icon-icon-test30"></i> 您已经点过赞了！！！',
			status: 'warning',
		});
		return false;
	} else {
		$(this).addClass('done');
		var id = $(this).data("id"),
			action = $(this).data('action'),
			rateHolder = $(this).children('.count');
		var ajax_data = {
			action: "dotGood",
			um_id: id,
			um_action: action
		};
		$.post("/wp-admin/admin-ajax.php", ajax_data,
			   function (data) {
			$(rateHolder).html(data);
		});
		return false;
	}
};
$(".dotGood").click(function () {
	$(this).postLike();
});



//点击加载更多
$('#pagination a').click(function() {
	$this = $(this);
	$this.addClass('loading').text("正在努力加载..."); //给a标签加载一个loading的class属性，可以用来添加一些加载效果
	var href = $this.attr("href"); //获取下一页的链接地址
	if (href != undefined) { //如果地址存在
		$.ajax({ //发起ajax请求
			url: href, //请求的地址就是下一页的链接
			type: "get", //请求类型是get
			error: function(request) {
				//如果发生错误怎么处理
			},
			success: function(data) { //请求成功
				setTimeout(function(){
					$this.removeClass('loading').text("点击查看更多"); //移除loading属性
					var $res = $(data).find(".ajax-item"); //从数据中挑出文章数据，请根据实际情况更改
					$('.ajax-main').append($res.fadeIn(500)); //将数据加载加进posts-loop的标签中。
					var newhref = $(data).find("#pagination a").attr("href"); //找出新的下一页链接
					if (newhref != undefined) {
						$("#pagination a").attr("href", newhref);
					} else {
						$("#pagination").html('我是有底线的！'); //如果没有下一页了，隐藏
					}
				},500);
			}
		});
	}
	return false;
});



})(jQuery);

/*注册获取邮箱验证码*/
function ValidateEmail(value)
    {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value))
        {
            return (true)
        }
        return (false)
    }

    $(function () {
        //hide or show password
        $('.send-verify-code').on('click', function(event){
            event.preventDefault();

            let email_address2 = $("#email_address2").val()
            if (!ValidateEmail(email_address2)) {
                alert("请输入正确邮箱")
                return false
            }

            var $this= $(this);
            let s60 = 60;
            let text=''

            let form_data={
                action:'send_email_verify_code',
                email:email_address2
            }
            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                dataType: 'json',
                data: form_data,
                type: 'post',
                success: function (data) {
                    if (data.success) {
                        alert(data.data.msg)

                        const inval = setInterval(() => {
                            if (s60 === 0) {
                                clearInterval(inval)
                                $this.attr('disabled', false);
                                $this.text('发送验证码')
                                return
                            } else {

                            }
                            s60 = s60 - 1
                            text = s60 + 's'
                            $this.disabled = true
                            $this.attr('disabled', true);
                            $this.text('')
                            $this.text(text);
                        }, 1000)
                    } else {
                        alert(data.data.msg)
                    }
                }
            })
        });
    });

//广告右上角js
(function($) {
	setInterval(function(){
		if($(".ceo-adgg-circles").hasClass("ceo-adgg")){
			$(".ceo-adgg-circles").removeClass("ceo-adgg");
		}else{
			$(".ceo-adgg-circles").addClass('ceo-adgg');
		}
	},3000);
	var wait = setInterval(function(){
		$(".hd-livechat-hint").removeClass("ad-show_hint").addClass("hide_hint");
		clearInterval(wait);
	},4500);
	$(".ceo-huodong").hover(function(){
		clearInterval(wait);
		$(".hd-livechat-hint").removeClass("hide_hint").addClass("ad-show_hint");
	},function(){
		$(".hd-livechat-hint").removeClass("ad-show_hint").addClass("hide_hint");
	}).click(function(){
		if(isMobile){
			 window.location.href = 'http://www.baidu.com';
		}else{
			var oWidth = 606,
				oHeight = 630,
				top = ($(window).height()/2)-(oHeight/2),
				left = ($(window).width()/2)-(oWidth/2);
			window.open('http://www.baidu.com','','width='+oWidth+',height='+oHeight+',scrollbars=yes,top='+top+',left='+left+',resizable=yes');
		}
	});
})(jQuery);

//内容展开/收缩
jQuery(document).ready(
    function(jQuery){
        jQuery('.collapseButton').click(function(){
        jQuery(this).parent().parent().find('.ceo-content').slideToggle('slow');
    });
});

//右下角跟随js
$(document).ready(function(){

	/* ----- 侧边悬浮 ---- */
	$(document).on("mouseenter", ".ceo-footer-sidebar .a", function(){
		var _this = $(this);
		var s = $(".ceo-footer-sidebar");
		var isService = _this.hasClass("a-service");
		var isServicePhone = _this.hasClass("a-service-phone");
		var isQrcode = _this.hasClass("a-qrcode");
		if(isService){ s.find(".d-service").show().siblings(".d").hide();}
		if(isServicePhone){ s.find(".d-service-phone").show().siblings(".d").hide();}
		if(isQrcode){ s.find(".d-qrcode").show().siblings(".d").hide();}
	});
	$(document).on("mouseleave", ".ceo-footer-sidebar, .ceo-footer-sidebar .a-top", function(){
		$(".ceo-footer-sidebar").find(".d").hide();
	});
	$(document).on("mouseenter", ".ceo-footer-sidebar .a-top", function(){
		$(".ceo-footer-sidebar").find(".d").hide();
	});
	$(document).on("click", ".ceo-footer-sidebar .a-top", function(){
		$("html,body").animate({scrollTop: 0});
	});
	$(window).scroll(function(){
		var st = $(document).scrollTop();
		var $top = $(".ceo-footer-sidebar .a-top");
		if(st > 400){
			$top.css({display: 'block'});
		}else{
			if ($top.is(":visible")) {
				$top.hide();
			}
		}
	});

});

//活动js
(function($) {
	setInterval(function(){
		if($(".animated-circles").hasClass("animated")){
			$(".animated-circles").removeClass("animated");
		}else{
			$(".animated-circles").addClass('animated');
		}
	},3000);
	var wait = setInterval(function(){
		$(".livechat-hint").removeClass("show_hint").addClass("hide_hint");
		clearInterval(wait);
	},4500);
	$(".ceo-footer-sidebar-girl").hover(function(){
		clearInterval(wait);
		$(".livechat-hint").removeClass("hide_hint").addClass("show_hint");
	},function(){
		$(".livechat-hint").removeClass("show_hint").addClass("hide_hint");
	}).click(function(){
		if(isMobile){
			 window.location.href = 'http://www.baidu.com';
		}else{
			var oWidth = 606,
				oHeight = 630,
				top = ($(window).height()/2)-(oHeight/2),
				left = ($(window).width()/2)-(oWidth/2);
			window.open('http://www.baidu.com','','width='+oWidth+',height='+oHeight+',scrollbars=yes,top='+top+',left='+left+',resizable=yes');
		}
	});

})(jQuery);

//客服验证
$(function () {
    $("#search-qq").on("click",function (event) {
        event.preventDefault()

        let form_data = {action: 'check_kefu_qq', fname: $("#fname").val()}
        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            dataType: 'json',
            data: form_data,
            type: 'post',
            success: function (data) {
                if (data.success) {
                    $("#modal_check_kefu_qq h3").html("<i class=\"iconfont icon-chenggong\"></i>")
                    $("#modal_check_kefu_qq h3").css("color",'green')
                } else {
                    $("#modal_check_kefu_qq h3").html("<i class=\"iconfont icon-shibai\"></i>")
                    $("#modal_check_kefu_qq h3").css("color",'red')
                }
                $("#kefu-modal-msg").text(data.data.msg)
                UIkit.modal('#modal_check_kefu_qq').show();
            }
        })
        return false
    })
});

//客服底部跟随
$(function () {
    var scrollPage = 0
    $('.ceo-kefu-cols').click(function () {
        scrollPage = 1
        $('.ceo-kefu-bot').fadeOut()
        $('.ceo-kefu-img').fadeIn()
    })
    $('.ceo-kefu-img').click(function () {
        scrollPage = 0
        $('.ceo-kefu-img').fadeOut()
        $('.ceo-kefu-bot').fadeIn()
    })
    $(window).scroll(function () {
        if(scrollPage == 0){
            if ($(this).scrollTop() > 150) {
                $(".ceo-kefu-img").fadeOut();
                $('.ceo-kefu-bot').fadeIn()
            } else {
                $(".ceo-kefu-img").fadeIn();
                $(".ceo-kefu-bot").fadeOut();
            }
        }
    });
});