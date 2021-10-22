$(document).ready(function () {
    $('#modal').click(function () {
        $('.main').css('filter', 'blur(10px)');
        $('.overlay').fadeIn();
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

    $('#addPaint').submit(function () {
        $.post(
            "/addpaint",
            {
                title: $('#title').val(),
                author: $('#author').val(),
                year: $('#year').val(),
                price: $('#price').val()
            },
            function (message) {
                $('#main').append("<div class='painting'></div>").append('<h2></h2>').text("Название картины:" + message.title);
                $('.painting').last().append('<h3></h3>').text("Автор:" + message.author);
                $('.painting').last().append('<h3></h3>').text("Автор:" + message.year);
                $('.painting').last().append('<p></p>').text("Цена:" + message.price + "руб.");
                $('.overlay').fadeOut();
            }
        )
    });
});

function delete_painting(id){
    $.ajax({
            url: "/delete_painting",
            type: "DELETE",
            data: {id: id}
        }
    )
        .done(function (message){
            $('#setka').empty();
            let paintings = JSON.parse(message);
            for(let key of paintings){
                let new_data =`<a class="remove" href='/lot/${key.id}'>` +
                `<div class="painting remove-item"><h2>Название картины: ${key.title}</h2>` +
                    `<h3>Автор: ${key.author}</h3>` +
                    `<p>Цена: ${key.price}</p>` +
                    `<img src="${key.img}" width="auto" height="300px">` +
                 `</div>` +
                `</a>`+
                    `<div class="remove-item">` +
                    `<button class="btn" id="1" style="margin-top: 90%; background-color:red" onClick="delete_painting(${key.id})">X</button>` +
                    `</div>`
                $('#setka').append(new_data);
            }
        })
}