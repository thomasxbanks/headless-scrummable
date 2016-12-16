"use strict"

function isRequired(currentTarget) {
    if (jQuery(currentTarget).prop('required')) {
        return true
    } else {
        return false
    }
}

function isEmpty(currentTarget) {;
    if (jQuery(currentTarget).val() == '') {
        return true
    } else {
        return false
    }
}

function isEmail(currentTarget) {
    if (/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(jQuery(currentTarget).val())) {
        console.log('this is an email address')
        return true
    } else {
        console.log('this is not an email address')
        return false
    }
}

function isNumber(currentTarget) {
    if (isNaN(jQuery(currentTarget).val())) {
        return false
    } else {
        return true
    }
}

function isPhoneNumber(currentTarget) {
    var userValue = jQuery(currentTarget).val()
    if (/^[0-9 +()]+$/.test(userValue)) {
        return true
    } else {
        return false
    }
}

function isFile(currentTarget) {
    var file = jQuery(currentTarget).val()
    var ext = file.substr((file.lastIndexOf('.') + 1))
    switch (ext) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
            return true
            break;
        default:
            jQuery(currentTarget).val("")
            return false
    }
}

function isFormValid() {
    var invalidFields = []
    jQuery('.invalid').each(function(i, obj) {
        // Add each invalid field to the array
        invalidFields.push(obj)

        // log for debug
        console.log(invalidFields, invalidFields.length)

        // If there is one or more entry in the array, throw a fit
        if (invalidFields.length > 0) {
            return false
        } else {
            return true
        }
    })
}

function makeDirty(currentTarget) {
    jQuery(currentTarget)
        .removeClass('pristine')
        .addClass('dirty')
}

function makeValid(currentTarget) {
    jQuery(currentTarget)
        .removeClass('invalid')
        .addClass('valid')
}

function makeInvalid(currentTarget) {
    jQuery(currentTarget)
        .removeClass('valid')
        .addClass('invalid')
}

// Write given error message to current error message container
function printError(currentTarget, msg) {
    // Find the error message span following the current input
    var currentError = jQuery(currentTarget)[0].nextSibling.nextSibling

    // log for debug
    console.error(msg)

    jQuery(currentError).text(msg)
}

jQuery('form').on('submit', function(e) {
    e.preventDefault;
    if (isFormValid()) {
        jQuery('form').submit()
    } else {
        console.log('ERRORRRRR!!!')
    }

})

// Define all inputs as untouched and inherently invalid.
// Append inputs with status field & error message container.
jQuery('input, textarea, select').addClass('pristine invalid').after('<span class="status"><i class="fa fa-times"></i><i class="fa fa-check"></i></span>')

// Remove the messaging elements from buttons and that.
jQuery('input[type="submit"] ~ .status, input[type="submit"] ~ .message--error, input[type="button"] ~ .status, input[type="button"] ~ .message--error').remove()
jQuery('input[type="submit"], input[type="button"]').removeClass('pristine invalid')



// Do stuff when an input is touched - this is where the magic happens!
jQuery("input").on("keyup blur change", function(e) {
    if (e.keyCode == 9) {
        // keyCode 9 == 'tab'
        // This prevents tabbing between fields triggering the validation
        return
    }

    // check if a mandatory field has content
    if (isRequired(e.currentTarget) == true) {
        if (isEmpty(e.currentTarget) == true) {
            notValid(e.currentTarget)
        } else {
            isValid(e.currentTarget)
        }
    } else {
        isValid(e.currentTarget)
    }

    // if this is an email field
    if (jQuery(e.currentTarget).attr('type') == 'email') {
        if (isEmail(e.currentTarget) == true) {
            isValid(e.currentTarget)
        } else {
            notValid(e.currentTarget)
        }
    }

    // if this is a number field
    if (jQuery(e.currentTarget).attr('type') == 'tel') {
        if (isPhoneNumber(e.currentTarget)) {
            isValid(e.currentTarget)
        } else {
            notValid(e.currentTarget)
        }
    }


    if (jQuery(e.currentTarget).attr('type') == 'file') {
        if (isFile(e.currentTarget)) {
            isValid(e.currentTarget)
        } else {
            notValid(e.currentTarget)
        }
    }
})
