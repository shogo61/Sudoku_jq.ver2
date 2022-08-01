$(function(){
    // スタート画面
    $("#task").hide();
    $("#rule").hide();
    $("#cong").hide();
    $("#diff").hide();

    $(".rule").click(function(){
        $("#rule").fadeIn(300);
        var left=$(window).width()/2-300;
        // ↑中央寄せするための計算
        // ウィンドウサイズの半分から#ruleの半分を引いた値をleftに
        $("#rule").css("left",left); 
    })
    $(".tojiru").click(function(){
        $("#rule").fadeOut(300);
    })
    var array = [
        [0,1,4,6,0,8,2,7,0],
        [7,0,2,4,0,9,1,0,8],
        [6,8,0,2,0,1,0,3,5],
        [9,5,3,0,0,0,7,4,2],
        [0,0,0,0,0,0,0,0,0],
        [1,2,8,0,0,0,6,5,3],
        [8,7,0,9,0,2,0,1,6],
        [2,0,1,5,0,3,9,0,7],
        [0,9,6,1,0,7,5,2,0]
    ];

    //test
    // var array = [
    //     [5,1,4,6,3,8,2,7,9],
    //     [7,3,2,4,5,9,1,6,8],
    //     [6,8,9,2,7,1,4,3,5],
    //     [9,5,3,8,1,6,7,4,2],
    //     [4,6,7,3,0,5,8,9,1],
    //     [1,2,8,7,9,4,6,5,3],
    //     [8,7,5,9,4,2,3,1,6],
    //     [2,4,1,5,6,3,9,8,7],
    //     [3,9,6,1,8,7,5,2,4],
    // ]

    // 正解の配列
    var collect_array = [
        [5,1,4,6,3,8,2,7,9],
        [7,3,2,4,5,9,1,6,8],
        [6,8,9,2,7,1,4,3,5],
        [9,5,3,8,1,6,7,4,2],
        [4,6,7,3,2,5,8,9,1],
        [1,2,8,7,9,4,6,5,3],
        [8,7,5,9,4,2,3,1,6],
        [2,4,1,5,6,3,9,8,7],
        [3,9,6,1,8,7,5,2,4],
    ]
    
    // tableに問題を書き込む
    for(var i=0;i<9;i++){
        for(var j=0;j<9;j++){
            if((array[i][j])!=0){
                $("td").eq(i*9+j).text(array[i][j])
            }
        }
    }

    $("#start button:first-child").click(function(){
        $("#start").hide();
        $("#task").show();

        // 問題が上書きされないようにクラス付与
        for(var i=0;i<81;i++){
            if(!$("td").eq(i).text()==""){
                $("table td").eq(i).addClass("done");
            }
        }
    });
    $("td").click(function(){
        
        //クリックされた地点の背景を変更
        $("td").removeClass("target");
        $("td").css("background-color","#fff")  //checkボタンの後挙動が変わるからjsで指定
        if(!$(this).hasClass("done")){// doneが上書きできないように
            $(this).addClass("target");
            $(this).css("background-color","#ffb3b3") //checkボタンの後挙動が変わるからjsで指定
        }

        $("html").keyup(function(e){
            switch(e.which){
                case 49:
                case 97:
                    $(".target").html(1)
                break;
                case 50:
                case 98:
                    $(".target").html(2)
                break;
                case 51:
                case 99:
                    $(".target").html(3)
                break;
                case 52:
                case 100:
                    $(".target").html(4)
                break;
                case 53:
                case 101:
                    $(".target").html(5)
                break;
                case 54:
                case 102:
                    $(".target").html(6)
                break;
                case 55:
                case 103:
                    $(".target").html(7)
                break;
                case 56:
                case 104:
                    $(".target").html(8)
                break;
                case 57:
                case 105:
                    $(".target").html(9)
                break;
                case 48:
                case 96:
                case 8:
                    $(".target").html(" ")
                break;
            }            
        })
        
    })
    
    //grayボタン(問題のマスをわかるように)
    //gray中に問題がクリックされたら解除
    var gray_flag=1
    $("#gray").click(function(){
        if(gray_flag == 1){
            $(".done").css("background","lightgray")
        }else{
            $(".done").css("background","#fff")
        }
        gray_flag *= -1
    })

    // チェックボタン
    // ・間違っているマスを赤く表示
    // ・表示中はマスに書き込みができない
    // ・もう一度ボタンを押せば選択解除
    // ・ボタンを押せるのは一度だけ
    var check_cnt = 0;
    $("#check").click(function(){
        if(check_cnt == 0){
            for(var i=0;i<9;i++){
                for(var j=0;j<9;j++){
                    if(Number($("td").eq(i*9+j).text())!=collect_array[i][j]){
                        $("td").eq(i*9+j).css("background-color","#ff3636");
                    }
                }
            }
            $("table").addClass("check"); //tableを選択できないように
            $("td").removeClass("target");
            check_cnt += 1;
            $(this).text("OK")
        }else if(check_cnt == 1 ){
            $("table").removeClass("check");
            $("td").css("background-color","#fff");
            check_cnt += 1;
            $(this).addClass("checked");
            $(this).text("Check");
        }
    })

    //完了したかの判定
    $("#judge").click(function(){
        $("td").addClass("done");
        var cnt=0;
        for(var i=0;i<9;i++){
            for(var j=0;j<9;j++){
                if(Number($("td").eq(i*9+j).text())==collect_array[i][j]){
                    cnt+=1;
                }
            }
        }
        if(cnt==81){
            $("#cong").show();
            var left=$(window).width()/2-325;
            $("#cong").css("left",left);
        }else{
            $("#diff").show();
            var left=$(window).width()/2-325;
            $("#diff").css("left",left);
        }
        e.stopPropagation();
    })

    // 押したらリロード
    $(".quit").click(function(){
        window.location.reload();
    })
    
});