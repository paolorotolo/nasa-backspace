

$(document).ready(function () {
  let isLoggedIn = false;
  let isTodayFavourite = false;
  let currentImage = null;

  let provider = new firebase.auth.GoogleAuthProvider();
  let userId = "";

  // OBSERVE AUTH
  firebase.auth().onAuthStateChanged(function(user) {
    console.log(user);
    if (user) {
      userId = user.uid;
      isLoggedIn = true;

      // User is signed in.
      $("#archiveButton").removeClass("hide");
      $("#logoutButton").removeClass("hide");
    } else {
      isLoggedIn = false;

      // No user is signed in.
      $("#infoLoginButton").removeClass("hide");
      $("#archiveButton").addClass("hide");
    }
  });

  // GET TODAY IMAGE
  getTodayImage();

  addClickListeners();

  async function getTodayImage() {
    currentImage = await getCurrentImage();

    popolateUi();

    // DISMISS LOADER
    $("#loadingImage").remove();
  }

  function loginWithGoogle(){
    firebase.auth().signInWithPopup(provider);
  }

  function logout() {
    firebase.auth().signOut();
  }

  function popolateUi() {
    $("#mainImage").css("background-image", "url(" + currentImage.hdUrl + "");
    $("#imageTitle").text(currentImage.title);
    $("#imageExplanation").text(currentImage.desc);
  }

  function addClickListeners() {
    $('#infoLoginButton').click(function () {
      loginWithGoogle()
    });

    $('#logoutButton').click(function () {
      logout()
    });
    $('#favouriteButton').click(function () {
      // Check if logged in first
      if (isLoggedIn) {
        isTodayFavourite = !isTodayFavourite;

        if (isTodayFavourite) {
          $('#favouriteButton').text("favorite");
          generateMessage("Added to favourites");
          editFavourites(userId, getTodayImageId(), currentImage, true);
        } else {
          $('#favouriteButton').text("favorite_border");
          generateMessage("Removed from favourites");
          editFavourites(userId, getTodayImageId(), currentImage, false);
        }
      } else {
        generateMessage("Please log in first")
      }
    });

    $('#dismissInfo').click(function () {
      $('#infoImage').removeClass("scale-in");
    });

    $('#infoImageButton').click(function () {
      $('#infoImage').addClass("scale-in");
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
