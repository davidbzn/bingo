
var isPaused = true;
var called_ball = "";
var balls = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90];
var array_latestes = [null, null, null, null, null]

var t = window.setInterval(function() {
    if(!isPaused) {

        if(balls.length === 0){
            clearInterval(t);
            $(".chosen_num").html("-"); 
            return false;
        }        

        called_ball = Math.floor(Math.random() * balls.length);

        var removed = balls.splice(called_ball, 1);   

        $(".item:nth-child("+removed+")").addClass("called_ball");         

        $(".last_item:nth-child(1)").html($(".last_item:nth-child(2)").html());
        $(".last_item:nth-child(2)").html($(".last_item:nth-child(3)").html());
        $(".last_item:nth-child(3)").html($(".last_item:nth-child(4)").html());
        $(".last_item:nth-child(4)").html($(".last_item:nth-child(5)").html());
        $(".last_item:nth-child(5)").html($(".chosen_num").html());               
        
        $(".chosen_num").html(removed.toString().padStart(2, '0'));
             
    }
}, 3000);

$( "#status_game" ).click(function() {

    if( isPaused ){   
        $( "#status_game i" ).removeClass("fas fa-play");
        $( "#status_game i" ).addClass("fas fa-pause");
        isPaused = false;
    }else{
        $( "#status_game i" ).removeClass("fas fa-pause");
        $( "#status_game i" ).addClass("fas fa-play");
        isPaused = true;
    }
});