const { data } = require("jquery")

function add_service(){
    var addItem = $('#addItem').val(),
        addPrice = $('#addPrice').val(),
        data = {
            add_item: addItem,
            add_price: addPrice
        }
    $.ajax({
        url: '/post/json/addService',
        type: 'post',
        cache: false,
        data: data,
        success: function(html){
            if(html == "invalid input"){
                alert("Invalid Input!")
                console.log("Invalid Input!")
            }
            else{
                alert("Service added success!")
                console.log("valid Input!")
            }
            window.location.href = "/"
        }
    })
}
function remove_service(){
    var rmItem = $('#rmItem').val(),
        data = {
            rm_item: rmItem
        }
    $.ajax({
        url: '/post/json/rmService',
        type: 'post',
        cache: false,
        data: data,
        success: function(html){
            if(html == "invalid input"){
                alert("Invalid Input!")
            }
            else{
                alert("Service removed success!")
            }
            window.location.href = "/"
        }
    })
}

function editService(){
    $.ajax({
        url: 'post/json/editService',
        type: 'post',
        cache: false,
        data: data,
        success: function(html){
            if(html == "invalid input"){

            }
            else{
                
            }
        }
    })
}

$(document).ready(function(){
    $('#btn-add').on("click", function(){
        add_service()
    })
    $('#btn-rm').on("click", function(){
        remove_service()
    })
})