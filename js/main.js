

$(document).ready(function () {
  let isTodayFavourite = false;
  let currentImage = null;

  // GET TODAY IMAGE
  getTodayImage();

  addClickListeners();

  async function getTodayImage() {
    currentImage = await getCurrentImage();

    popolateUi();

    // DISMISS LOADER
    $("#loadingImage").remove();
  }

  function popolateUi() {
    $("#mainImage").css("background-image", "url(" + currentImage.hdUrl + "");
    $("#imageTitle").text(currentImage.title);
    $("#imageExplanation").text(currentImage.desc);
  }

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
          '          <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>\n' +
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

      isTodayFavourite = !isTodayFavourite;

      if (isTodayFavourite) {
        $('#favouriteButton').text("favorite");
        generateMessage("Added to favourites");
        editFavourites(getTodayImageId(), currentImage, true);
      } else {
        $('#favouriteButton').text("favorite_border");
        generateMessage("Removed from favourites");
        editFavourites(getTodayImageId(), currentImage, false);
      }
    });

    $('#dismissInfo').click(function () {
      $('#infoImage').addClass("hide");
    });

    $('#infoImageButton').click(function () {
      $('#infoImage').removeClass("hide");
    });


    $('#shareInfo').click(function () {
        window.open("https://www.facebook.com/sharer.php?u=" + "https://apod.nasa.gov/apod/astropix.html");
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
