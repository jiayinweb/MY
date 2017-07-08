/**
 * Created by jiahongyu on 2017/5/14.
 */
$(function () {
    $.enlarge = function () {
        $('.cont_list li').mouseenter(function () {
            $(this).addClass("ac").siblings().removeClass("ac");
            $('.cont_item').eq($(this).index()).show().siblings().hide();

            $('.cont_pic .cont_item').mousemove(function (ev) {

                var l = ev.pageX - $(this).offset().left - $('.max_pic').width() / 2;
                var t = ev.pageY - $(this).offset().top - $('.max_pic').height() / 2;
                if (l <= 0) {
                    l = 0;
                } else if (l >= ($(this).width() - $('.max_pic').width())) {
                    l = $(this).width() - $('.max_pic').width();
                }
                if (t <= 0) {
                    t = 0;
                } else if (t >= ($(this).height() - $('.max_pic').height())) {
                    t = $(this).height() - $('.max_pic').height();
                }

                $('.max_pic').show().css({'left': l, 'top': t});
                $('.max_con').show();
                console.log($('.max_item').eq($(this).index()).html() );
                $('.max_item').eq($(this).index()).children("img").css({
                    'left': -l / (210 / 480),
                    'top': -t / (210 / 480)
                });
                $('.max_item').eq($(this).index()).show().siblings().hide();
            });
            $('.cont_pic').mouseleave(function () {
                $('.max_pic').hide();
                $('.max_con').hide();
            });
        });
    };
    $.enlarge();

    $('.size_list li').click(function () {
        var num=$(this).index();
        $(this).addClass('ac').siblings().removeClass('ac');
        if(num===0){
            $('.cont_list li').each(function (index) {
                $(this).children('img').attr('src',"../images/pic_"+(index+1)+".jpg");
                $('.cont_item').eq(index).children('img').attr('src',"../images/0"+(index+1)+".jpg");
                $('.max_item').eq(index).children('img').attr('src',"../images/00"+(index+1)+".jpg");
            });
        }else if(num===1){
            $('.cont_list li').each(function (index) {
                $(this).children('img').attr('src',"../images/2."+(index+1)+".jpg");
                $('.cont_item').eq(index).children('img').attr('src',"../images/2.0"+(index+1)+".jpg");
                $('.max_item').eq(index).children('img').attr('src',"../images/2.00"+(index+1)+".jpg");
            });
        }
    });

    //数量累计
    $('.num .btn1').click(function () {
        var num = $('.num .txt').val();
        num++;
        $('.num .txt').val(num);
    });
    $('.num .btn2').click(function () {
        var num = $('.num .txt').val();
        num--;
        if (num <= 0) {
            num = 0;
        }
        $('.num .txt').val(num);
    });

    //选项卡
    $('.tab_list li').click(function () {
        $(this).addClass("ac").siblings().removeClass('ac');
        $('.tab_cont .cont_item').eq($(this).index()).show().siblings().hide();
    }).mouseenter(function () {
        $(this).addClass("ac").siblings().removeClass('ac');
        $('.tab_cont .cont_item').eq($(this).index()).show().siblings().hide();
    });
    $('.tab').mouseleave(function () {
        $('.tab_list li:first').addClass("ac").siblings().removeClass('ac');
        $('.tab_cont .cont_item:first').show().siblings().hide();
    });


});
