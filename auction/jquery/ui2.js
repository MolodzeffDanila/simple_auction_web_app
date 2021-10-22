$(document).ready(function (){

    $('#change_settings').submit(function (){
        $.post(
            "/change_settings",
            {
                date: $('#input1').val(),
                num_of_att: $('#input2').val()
            },
        )
    });

});