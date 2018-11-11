if (typeof jQuery === 'undefined') {
  throw new Error('ThemeEngine\'s JavaScript requires jQuery');
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.');
  if ((version[0] < 2 && version[1] < 9) || (version[0] === 1 && version[1] === 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('ThemeEngine\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4');
  }
}(jQuery);

$(document).ready(function (){
"use strict";

document.createElement('bookmodal');//element declarartion

$(function themeengine() {

if(document.querySelector('bookmodal')){

$('bookmodal').each(function(){/*bookmodal start*/
var bookmodal = $(this);

bookmodal.find('.buttons > a[data-details]').click(function(e){
e.preventDefault();

bookmodal.find('.book').addClass('details-open');

});
bookmodal.find('span.close-details').click(function(){

bookmodal.find('.book').removeClass('details-open');

});

bookmodal.find('.buttons > a[data-detailsInside]').click(function(e){
e.preventDefault();

var bookmodal_target = $(this).attr('data-detailsInside');
$(bookmodal_target).removeClass('animated zoomOut').addClass('show animated fadeInLeft');
});

$('a[data-detailsclose]').click(function(e){
var bookmodal_close = $(this).attr('data-detailsclose');
$(bookmodal_close).removeClass('show animated fadeInLeft').addClass('animated zoomOut');
});

});/*bookmodal end*/

}

else{
throw new Error('Theme Engine Says : ' + 'Use Theme Engine Elements');
}
});//themeengine ends

});
