$(document).on('turbolinks:load', function() {
    //Display user panel
    $('#user-panel').click(function() {
        $('#user-data').toggleClass('hidden')
    });

    //Bind button links
    $('.button').each((i , b) => {
        if($(b).data('link') !== undefined) {
            $(b).click(() => {
                Turbolinks.visit(window.location.origin + $(b).data('link'))
            })
        }
    })

    //Hack min width to nav bar -- lazy
    document.body.style.minWidth = `${$('#title').width() + $('#button-dashboard').width() + 40}px`
});