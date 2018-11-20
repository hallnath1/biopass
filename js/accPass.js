$(document).ready(function(){
    $("#new").toggle();
    $("#hidden").toggle(); 
    $(".eye").each(function(){
        var text = $(this).parent().parent().find(".passCont").text();
        var replace = "";
            
        for ( var i = 0; i < text.length; i++ ){
            replace += "● "
        }
        
        $(this).parent().parent().find(".passCont").text(replace);
    });
    
    
    function copyToClipboard(element) {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(element).select();
        document.execCommand("copy");
        $temp.remove();
    }

    $(".copy").click(function(){
        var lock = false;
        if ($(this).parent().parent().find(".passCont").text().charAt(0) == '●'){
            
            var cont = '';
            $.ajaxSetup({async: false});
            $.post( "getPass.php", { id: $(this).parent().parent().attr("id")}, function( data ) {
                cont = data;
            });
            $(this).parent().parent().find(".passCont").text(cont);
            lock = true;
            
        }
        copyToClipboard($(this).parent().parent().find(".passCont").html());
        if (lock == true){
            var text = $(this).parent().parent().find(".passCont").text();
            var replace = "";
            
            for ( var i = 0; i < text.length; i++ ){
                replace += "● "
            }
            
            $(this).parent().parent().find(".passCont").text(replace);
        }
    })
    
     $(".remove").click(function(){
        $.post( "deletePassAcc.php", { id: $(this).parent().parent().attr("id")}, function( data ) {
                
            });
        location.reload();
    });
    
    $(".eye").click(function(){
        $(this).find('i').toggleClass('fa fa-eye fa fa-eye-slash');
        
        if ($(this).find('i').attr('class') == 'fa fa-eye-slash'){
            var cont = '';
            $.ajaxSetup({async: false});
            $.post( "getPass.php", { id: $(this).parent().parent().attr("id")}, function( data ) {
                cont = data;
            });
            $(this).parent().parent().find(".passCont").text(cont);
        }
        else{
            var text = $(this).parent().parent().find(".passCont").text();
            var replace = "";
            
            for ( var i = 0; i < text.length; i++ ){
                replace += "● "
            }
            
            $(this).parent().parent().find(".passCont").text(replace);
        }
    });
    
    $("#newAcc").click(function(){
        if((this).className == "fa fa-check"){
            $("#cancel").css("display", "none");
            $accName = $('.accNameNew').val();
            $uName = $('.uNameNew').val();
            $password = $('.passContNew').val();
            $.post( "newPass.php", { site: $accName, userName: $uName, password: $password}, function(data){
                if(data == " "){
                    alert("Error");
                }
            } );
            location.reload();
        }
        else{
            $("#cancel").css("display", "inline-block");
            $size = $("#sizePass").text();
            if($size>0){
                $.post( "getIndex.php", {size: $size}, function( data ) {
                    $('.passContNew').val(data);
                });
            }
            if($size < 10){
                $('.passContNew').css("color","red");
            }
            else{
                $('.passContNew').css("color","black");
            }
        }
        
        $("#new").toggle();
        $("#hidden").toggle();    
        $(this).toggleClass('fa fa-plus fa fa-check');
    });
    
    $("#refresh").click(function(){
        $size = $("#sizePass").text();
        if($size>0){
            $.post( "getIndex.php", {size: $size}, function( data ) {
                $('.passContNew').val(data);
            });
        }
        if($size < 10){
            $('.passContNew').css("color","red");
        }
        else{
            $('.passContNew').css("color","black");
        }
        
    });
    
    $("#cancel").click(function(){
        $("#new").toggle();
        $("#hidden").toggle();
        $("#newAcc").toggleClass('fa fa-plus fa fa-check');$("#cancel").css("display", "none");
        $('.passContNew').val("");
        $('.accNameNew').val("");
        $('.uNameNew').val("");
    });
    
    $('#up').click(function(){
        $size = $("#sizePass").text();
        $size = parseInt($size) + 1;
        if($size < 25){
             $("#sizePass").text($size);
        }
        
        if($size < 10){
            $('#sizePass').css("color","red");
        }
        else{
            $('#sizePass').css("color","black");
        }
        
    });
    
    $('#down').click(function(){
        $size = $("#sizePass").text();
        $size = $size - 1;
        if($size > 0){
            $("#sizePass").text($size);
        }
        
        if($size < 10){
            $('#sizePass').css("color","red");
        }
        else{
            $('#sizePass').css("color","black");
        }
    });
    
    $( ".passContNew" ).change(function() {
        $text = $(this).val();
        $size = $text.length;
        if($size < 10){
            $('.passContNew').css("color","red");
        }
        else{
            $('.passContNew').css("color","black");
        }
    });
});