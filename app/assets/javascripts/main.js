$(document).on('turbolinks:load', function() {
    //Bind dimmer
    $('#dimmer').click(() => {
        $('#dimmer').addClass('invisible');
        $('.popup').addClass('invisible');
    });

    //Bind button links
    bindButtons();

    //Hack min width to nav bar -- lazy
    document.body.style.minWidth = `${$('#title').width() + $('#button-dashboard').width() + 40}px`
});

function bindButtons() {
    $('.button').each((i , b) => {
        //Remove any lingering event listeners
        $(b).off();

        //Display user panel
        $('#user-panel').click(function() {
            $('#user-data').toggleClass('hidden')
        });

        //If button has a data-target bind click event
        if($(b).data('target') !== undefined) {
            $(b).click((e) => {
                //Show target
                $('.popup').addClass('invisible');
                $(`#${$(b).data('target')}`).removeClass('invisible');
                $('#dimmer').removeClass('invisible');

                //Run requested function if present
                if($(e.target).data('function') !== undefined) {
                    window[$(e.target).data('function')]()
                }
            })
        } else if($(b).data('function') !== undefined) {
            $(b).click((e) => {
                //Run requested function if present
                window[$(e.target).data('function')]()
            })
        } else if($(b).data('link') !== undefined) {
            $(b).click(() => {
                //Visit link if present
                Turbolinks.visit(window.location.origin + $(b).data('link'))
            })
        }
    });
}