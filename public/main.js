$(document).ready(function () {
    $('.toggleFilter').click(function () {
        $('#main_filter').slideToggle('slow');
    });

    document.getElementById('btttn').addEventListener("click", function () {
        var markedCheckbox = document.querySelectorAll('input.urlz[type="checkbox"]:checked');
        for (var checkbox of markedCheckbox) {
            checkbox.parentNode.parentNode.querySelector("a.affLink").click();
        }
    });



});


$(document).ready(function () {
    (function ($) {


 
    })(jQuery);
    $('body').on('click', '#btttnn', function () {
        var markedCheckbox = document.querySelectorAll('input.urlz[type="checkbox"]:checked');
        for (var checkbox of markedCheckbox) {
            checkbox.parentNode.parentNode.querySelector("a.affLink").click();
        }
    })

});
// $('body').ready(document, function () {
//     // $('.parabdr').on('click', function () {
//     //     $("input.urlz:checked").each(function () {
//     //         $(this).parents(".maincoupon").find(".affLink").trigger('click');
//     //     });
//     // });

//     $('.parabdr').on('click', function () {
//         $("input.urlz:checked").each(function () {
//             $(this).parents(".coupon-code-card").find(".affLink").trigger("click");
//         });
//     });
// });





