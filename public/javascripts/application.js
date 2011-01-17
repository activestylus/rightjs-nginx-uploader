// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
function init_uploader() {
  var form = $('new_upload');
  $('upload').on('click', function() {
    form.uploader = new Uploader(form);
    form.submit();
  });
}

$(document).onReady(init_uploader)