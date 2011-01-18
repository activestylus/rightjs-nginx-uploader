// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

'button#upload'.on('click', function() {
  console.log('hey');
  var form = $('new_upload');
  RR.remotize_form(form);
  form.uploader = new Uploader(form);
  form.send();
});


