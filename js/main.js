

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

  function addClickListeners() {
    $('#favouriteButton').click(function () {

      isTodayFavourite = !isTodayFavourite;

      if (isTodayFavourite) {
        $('#favouriteButton').text("favorite")
        generateMessage("Added to favourites")
      } else {
        $('#favouriteButton').text("favorite_border")
        generateMessage("Removed from favourites")
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
});
