$(function() {
    if(window.screen.availWidth>768){

        jQuery(".sidebar-column").theiaStickySidebar({
            additionalMarginTop:  0
        })
    }

    $(window).scroll(function(){
        var top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        var tags_top = $(".single-cop").offset().top;
        if(top >= $(".single .single-warp").offset().top && top<tags_top){
            var width=$(".single .single-warp").width()-35;
            $('.single-nav ').css({position:'fixed',top:'0','zIndex':'98','width':width,'background':'#fff','height':'42'})
        }else{
            $('.single-nav ').css({position:'relative','width':'auto','height':'auto'})
        }
    })
    $(".consultingshop li").on("click",function () {
        var indexs = $(this).index()
        $('.consultingshop .ceo-display-inline-block span').removeClass("current");
        $('.consultingshop .ceo-display-inline-block span').eq(indexs).addClass("current");
    })
})
