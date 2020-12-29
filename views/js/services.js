function draw_services(){
    $.ajax({

        url: '/get/html',
        type: 'get',
        cache: false,
        success: function(html){
            $('#services').append(html)

        }
    })

}
$(document).ready(function(){
    draw_services()
    // var i = 0;
    // var prices = document.getElementsByTagName('price');
    // console.log(prices)
    // for (i = 0; i < prices.length; i++) {
        
    //     if (prices[i].getAttribute('specialoffer') == "true") {
    //         console.log("a")
    //         prices[i].style.backgroundColor = "pink";
                
    //     }
    //     else{
    //         prices[i].style.backgroundColor = "";
    //     }
    // };
})