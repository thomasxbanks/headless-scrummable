"use strict"

// Events to trigger on window load
jQuery(document).ready(function($) {
    loadFunc() // Run the load page functions

    blogInfo()

    loadPosts()

    // Events to trigger on window scroll
    var CurrentScroll = 0;
    jQuery(window).scroll(function(event) {
        var scroll = jQuery(window).scrollTop();
        if (jQuery(window).scrollTop() == $(document).height() - $(window).height()) {
            // do foo
        } else {
            // do not foo
        }


        // Directional scroll
        var NextScroll = jQuery(this).scrollTop();
        if (NextScroll > CurrentScroll) {
            // Scroll down the page
            console.log('you are scrolling down')
        } else {
            // Scroll up the page
            console.log('you are scrolling up')
        }

        CurrentScroll = NextScroll; //Updates current scroll position
    })


    // end on load
})

// Events to trigger on window resize
jQuery(window).resize(debouncer(function(e) {
    browserSize() // Work out browser width and browser height and store as global variables for use later
}))
