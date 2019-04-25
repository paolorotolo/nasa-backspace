requirejs(['./materialize']);

$(document).ready(function () {

    const NASA_ENDPOINT = "https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo";
    let isTodayFavourite = false;

    // GET TODAY IMAGE
    getTodayImage();

    addClickListeners();

    async function getTodayImage() {
      let endpointResult = await performGetRequest(NASA_ENDPOINT);

      $("#mainImage").css("background-image", "url(" + endpointResult.hdurl + "");
      $("#imageTitle").text(endpointResult.title);
      $("#imageExplanation").text(endpointResult.explanation);


      console.log(endpointResult)

      // DISMISS LOADER
      $("#loadingImage").remove();
    }

    function performGetRequest(requestUrl) {
      return new Promise(resolve => {
        $.ajax({
          url: requestUrl,
          success: function (result) {
            resolve(result)
          }
        });
      })
    }

    function addClickListeners() {
      $('#dismissInfo').click(function () {
        $('#infoImage').addClass("hide");
      });

      $('#infoImageButton').click(function () {
        $('#infoImage').removeClass("hide");
      });


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
