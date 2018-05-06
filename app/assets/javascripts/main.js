$(document).on('turbolinks:load', function() {
    //Display user panel
    $('#user-panel').click(function() {
        $('#user-data').toggleClass('hidden')
    });

    //Bind dimmer
    $('#dimmer').click(() => {
        $('#dimmer').addClass('invisible');
        $('.popup').addClass('invisible');
    });

    //Bind button links
    $('.button').each((i , b) => {
        if($(b).data('target') !== undefined) {
            $(b).click(() => {
                $('.popup').addClass('invisible');
                $(`#${$(b).data('target')}`).removeClass('invisible');
                $('#dimmer').removeClass('invisible');
            })
        }
    });

    //Hack min width to nav bar -- lazy
    document.body.style.minWidth = `${$('#title').width() + $('#button-dashboard').width() + 40}px`
});