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
})