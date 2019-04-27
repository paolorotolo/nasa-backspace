

$(document).ready(function () {
  addClickListeners();

  function loadFavourites() {
    getFavourites().then(function (images) {
      console.log(images)
      images.forEach(function (image) {
        $('#photoArchive').append('<div class="row center ">\n' +
          '    <div class="col offset-s4 s4">\n' +
          '      <div class="card">\n' +
          '        <div class="card-image">\n' +
          '          <img src="' +
          image.url +
          '">\n' +
          '          <span class="card-title">' +
          image.title +
          '</span>\n' +
          '          <a class="btn-floating btn-large halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>\n' +
          '        </div>\n' +
          '        <div class="card-content">\n' +
          '          <p>' +
          image.desc +
          '</p>\n' +
          '        </div>\n' +
          '      </div>\n' +
          '    </div>\n' +
          '  </div>');
      })
    })
  }

  function addClickListeners() {
    loadFavourites();
    $('#favouriteButton').click(function () {
    });
  }

  function generateMessage(text){
      // Make sure there are no other messages first
      M.Toast.dismissAll();

      // Show current message
      M.toast({html: text, classes: 'rounded'})

    }

    function getTodayImageId(){
      let currentDay = new Date();
      currentDay.setUTCHours(0,0,0,0);
      return +currentDay;
    }
});
