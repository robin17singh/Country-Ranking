$(document).ready(function() {
    $("#country").on("change", function() {
        $(".ladder-nav--results-countries").hide();
        $("#" + $(this).val()).fadeIn(700);
    }).change();
});

$(function(){
    console.log('Validation - Ready !');
    $('form[name="addCountryDetail"]').validate({
      rules: {
        nameCountry: {
          required: true,
          minlength: 3,
          maxlength: 20
        },
        nameContinent: {
          required: true,
          minlength: 3,
          maxlength: 20
        },
        rank: {
          required: true
        },
      },
      messages: {
        nameCountry: {
          required: 'Please enter Country Name',
          minlength: 'Your User Name must consist of at least 3 characters',
          maxlength: 'Your User Name must consist of at least 20 characters'
        },
        nameContinent: {
          required: 'Please enter Country Name',
          minlength: 'Your User Name must consist of at least 3 characters',
          maxlength: 'Your User Name must consist of at least 20 characters'
        },
        rank: 'Please enter Rank'
      },
      errorElement: 'em',
      errorPlacement: function (error, element) {
        error.addClass('invalid-feedback');
  
        if (element.prop('type') === 'checkbox') {
          error.insertAfter( element.next('label'));
        } else {
          error.insertAfter(element);
        }
      },
      highlight: function (element, errorClass, validClass) {
        $(element).addClass('is-invalid').removeClass('is-valid');
      },
      unhighlight: function (element, errorClass, validClass) {
        $(element).addClass('is-valid').removeClass('is-invalid');
      }
    });
  });