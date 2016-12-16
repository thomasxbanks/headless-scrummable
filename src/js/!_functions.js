"use strict"
//console.log('functions loaded')
// Trigger resize on completion of event
function debouncer(func, timeout) {
    if (timeout === "") {
        timeout = 200;
    }
    var timeoutID;
    return function() {
        var scope = this,
            args = arguments;
        clearTimeout(timeoutID);
        timeoutID = setTimeout(function() {
            func.apply(scope, Array.prototype.slice.call(args));
        }, timeout);
    };
}

// Scroll to anchor
function scrollToAnchor(aid) {
    var aTag = $("a[name='" + aid + "']");
    $('html,body').animate({
        scrollTop: (aTag.offset().top - ((heightMasthead + heightSubnav) - 20))
    }, 900);
}

// Nudge
function nudge(distance) {
    $("html body").animate({
        scrollTop: distance + "px"
    }, 800);
    return false;
}

// Make a button enabled
function enableButton(target) {
    jQuery(target).prop('disabled', false)
}

// Make a button disabled
function disableButton(target) {
    jQuery(target).prop('disabled', true)
}

// These are the functions that run when each page is loaded
function loadFunc() {
    browserSize() // Work out browser width and browser height and store as global variables for use later
    screenSize() // Work out screen width and screen height and store as global variables for use later
    jQuery('html').toggleClass('not-jquery is-jquery') // Once jQuery has been detected, switch the flag
    if (isMobile()) {
        jQuery('html').toggleClass('not-mobile is-mobile')
    } // Once mobile status has been detected, switch the flag
    if (isIE()) {
        jQuery('html').toggleClass('not-ie is-ie')
    } // Once Internet Explorer has been detected, switch the flag

    // Using WURFL to detect devices
    var device_type = WURFL.form_factor.toLowerCase()
    var device_name = WURFL.complete_device_name.toLowerCase()
    var device_name = device_name.replace(/\ /g, "-")

    jQuery('html').addClass(" " + device_type)
    jQuery('html').addClass(" " + device_name)

    // @TODO: Remove the below line for production
    jQuery('#masthead h1').html(WURFL.complete_device_name)

}


function loadingButton(target){
  $(target).html('Loading&hellip;')
}

function returnButtons(){
  $('#load-prev').text('Previous')
  $('#load-next').text('Next')
}
