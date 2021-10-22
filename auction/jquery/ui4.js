$(document).ready(function () {
    $('#modal').click(function () {
        $('.main').css('filter', 'blur(10px)');
        $('#add_participant').fadeIn();
    });

    $('.x-btn').click(function () {
        $('.main').css('filter', 'none');
        $('.overlay').fadeOut();
    });

    $('#addP').submit(function () {
        $.post(
            "/addparticipant",
            {
                name: $('#nameP').val(),
                budget: $('#budgetP').val()
            },
            function (message) {
                $('#main').append("<div class='painting'></div>").append('<h2></h2>').text("Имя:" + message.name);
                $('.painting').last().append('<h3></h3>').text("Бюджет:" + message.budget);
                $('.overlay').fadeOut();
            }
        )
    });
});


function save_id(id){
    $('.main').css('filter', 'blur(10px)');
    $('#redact_participant').fadeIn();
    localStorage.setItem("id",id);
}

function redact_part(){
    let id = localStorage.getItem("id")
    $.ajax({
            url: "/redact_participant/" + id,
            type: "POST",
            data: {name: $('#new_name').val(),budget: $('#new_budget').val()}
        }
    )
        .done(function (message){
            $('#setka').empty();
            let participants = JSON.parse(message);
            for(let key of participants){
                let new_data = `<div class='remove'><div class='painting remove-item'>` +
                    `<h2>Имя: ${key.name}</h2>` +
                    `<h3>Бюджет: ${key.budget}руб.</h3>` +
                    `<button id="0${key.id}" class="btn redact" onclick='save_id(${key.id})'>Редактирование</button>`+
                    `</div>` +
                    `<div class='remove-item'>` +
                    `<button id=key.id class='btn delete' style='margin-top: 90%;background-color: red' onclick='delete_part(${key.id})'>X</button>` +
                    `</div>` +
                    `</div>`
                $('#setka').append(new_data);
            }
        })
}

function delete_part(id_){
    $.ajax({
            url: "/delete_participant",
            type: "POST",
            data: {id: id_}
        }
    )
        .done(function (message){
            $('#setka').empty();
            let participants = JSON.parse(message);
            for(let key of participants){
                let new_data = `<div class='remove'><div class='painting remove-item'>` +
                    `<h2>Имя: ${key.name}</h2>` +
                    `<h3>Бюджет: ${key.budget}руб.</h3>` +
                    `<button id="0${key.id}" class="btn redact" onclick='save_id(${key.id})'>Редактирование</button>`+
                        `</div>` +
                    `<div class='remove-item'>` +
                    `<button id=key.id class='btn delete' style='margin-top: 90%;background-color: red' onclick='delete_part(${key.id})'>X</button>` +
                    `</div>` +
                    `</div>`
                $('#setka').append(new_data);
            }
        })
}