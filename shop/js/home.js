$(function () {
    $.banner = function () {
        var oMenu = document.getElementById("menu");

        function bannerLeft(obj) {
            var oUl = obj.getElementsByClassName("menu_list")[0];
            var aLi = oUl.getElementsByTagName("li");
            var oMenuCont = oMenu.getElementsByClassName("menu_content")[0];
            var aMenuItem = oMenuCont.getElementsByClassName("menu_item");

            function ali(num) {
                for (var j = 0; j < aLi.length; j++) {
                    aMenuItem[j].style.display = "none";
                    oMenuCont.zIndex = "";
                    var oA = aLi[j].getElementsByTagName("a")[0];
                    oA.className = "";
                    oA = aLi[num].getElementsByTagName("a")[0];
                    oA.className = "ac";

                }
                aMenuItem[num].style.display = "block";
                oMenuCont.zIndex = "5";

            }

            for (var i = 0; i < aLi.length; i++) {
                aLi[i].index = i;
                aLi[i].onmouseenter = function () {
                    ali(this.index);
                    oMenuCont.style.zIndex = "10";
                };
                oMenu.onmouseleave = function () {
                    oMenuCont.style.zIndex = "";
                    for (var i = 0; i < aLi.length; i++) {
                        var oA = aLi[i].getElementsByTagName("a")[0];
                        oA.className = "";
                        aMenuItem[i].style.display = "none";
                    }
                }
            }
        }

        bannerLeft(oMenu);

        var oBannerCen = document.getElementsByClassName("banner_center")[0];

        function bannerCen(obj) {
            var oCenUl = obj.getElementsByTagName("ul")[0];
            var aCenLi = oCenUl.getElementsByTagName("li");
            var oCenCont = oBannerCen.getElementsByClassName("center_pic")[0];
            var aCenItem = oCenCont.getElementsByTagName("a");

            function center(num) {
                for (var g = 0; g < aCenLi.length; g++) {
                    aCenLi[g].className = "";
                    aCenItem[g].style.display = "none";
                }
                aCenLi[num].className = "active";
                aCenItem[num].style.display = "block";
            }

            for (var c = 0; c < aCenLi.length; c++) {
                aCenLi[c].index = c;
                aCenLi[c].onclick = function () {
                    center(this.index);
                    n = this.index;
                }

            }

            var timer;
            timer = setInterval(run, 1000);
            var n = 0;

            function run() {
                n++;
                if (n >= aCenLi.length) {
                    n = 0;
                }
                center(n);
            }

            obj.onmouseenter = function () {
                clearInterval(timer);
            };

            obj.onmouseleave = function () {
                timer = setInterval(run, 1000);
            }

        }

        bannerCen(oBannerCen);
    };
    $.banner();

    $.floor = function () {
        var LocationFloorList = getByClass(document, 'LocationFloorList')[0];
        var aLi = LocationFloorList.getElementsByTagName('li');
        var aFloor = getByClass(document, 'floor');
        var arr = [];

        for (var i = 0; i < aFloor.length; i++) {
            var json = {};
            json.name = i;
            json.offsetTop = aFloor[i].offsetTop;
            arr.push(json);
        }

        window.onscroll = function () {
            //显示楼层编号-------------------------------------------------
            var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrolltop > 1750) {
                LocationFloorList.style.display = 'block';
            } else {
                LocationFloorList.style.display = 'none';
            }


            // 根据楼层滚动位置，定位编号------------------------------------------------
            var last_arr = [];
            for (var j = 0; j < arr.length; j++) {
                if (arr[j].offsetTop < scrolltop + 400) {//400为接近屏幕的敏感区
                    last_arr.push(arr[j].name);
                }
            }

            var li_index = last_arr[last_arr.length - 1];

            for (var l = 0; l < aFloor.length; l++) {
                aLi[l].className = '';
            }

            //页面上部如果有内容，没有楼层会放入新数组，产生错误
            last_arr.length == 0 ? aLi[0].className = 'ac' : aLi[li_index].className = 'ac';
        };

        //点击编号，跳转到相对楼层-----------------------------------------------
        for (var i = 0; i < aFloor.length; i++) {
            aLi[i].index = i;
            aLi[i].onclick = function () {
                var start = document.documentElement.scrollTop || document.body.scrollTop;
                var end = arr[this.index].offsetTop;
                move(start, end)
            }
        }
        //move-------------------------------------------------------
        var timer;

        function move(start, end) {
            var dis = end - start;
            var count = parseInt(1500 / 30);
            var n = 0;
            clearInterval(timer);
            timer = setInterval(function () {
                n++;
                var a = 1 - n / count;
                var step_dis = start + dis * (1 - a * a * a * a);
                //window.scrollTo(0,step_dis);
                document.body.scrollTop = step_dis;
                if (n == count) {
                    clearInterval(timer);
                }
            }, 30)
        }

        function getByClass(oParent, cls) {
            var arr = []; //容器
            if (document.getElementsByClassName) return oParent.getElementsByClassName(cls);
            else {
                var aEl = oParent.getElementsByTagName('*');//所有标签
                for (var i = 0; i < aEl.length; i++) {
                    if (aEl[i].className.indexOf(cls) != -1) arr.push(aEl[i]);//向数组中添加
                }
                return arr;
            }
        }
    };
    $.floor();

    $.service = function () {
        /*$('.service_list').mouseenter(
         function () {
         $('.service_list').siblings().hide();
         $('.service_list td').addClass("service_item");
         }
         );*/
        var show = true;
        $('.service_list td').mouseenter(
            function () {

                if (show) {
                    $(this).parent().siblings().hide();
                    $('.service_list td').addClass("service_item");
                    $(this).addClass('service_on').siblings().removeClass('service_on');
                    $('.service_content').show();
                    $('.service_pop').eq($(this).index()).show().siblings().hide();
                }
            }
        );
        $('.service_list td').mouseleave(function () {
            show = true;
        });
        $('.closeBtn').click(function () {
            $('.service_content').hide();
            $('.service_list td').removeClass('service_item service_on');
            $('.service tr').show();
            show = false;
        });

    };
    $.service();


    //返回顶部
    $('.back_top').mouseenter(function () {
        $(this).prepend("<em>顶部</em>");
        $(this).css({'backgroundColor': "#c81623"});
        $(this).animate({
            width: "70px"
        }, 500);
    }).mouseleave(function () {
        $(this).children('em').remove();
        $(this).css({'backgroundColor': "#7a6e6e"});
        $(this).animate({
            width: "24px"
        }, 500);
    }).click(function () {
        $(document).scrollTop(0);
    });


});