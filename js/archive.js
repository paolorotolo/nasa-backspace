

$(document).ready(function () {
  let provider = new firebase.auth.GoogleAuthProvider();
  let isLoggedIn = false;
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
      loadFavourites()

    } else {
      isLoggedIn = false;

      // No user is signed in.
      $("#infoLoginButton").removeClass("hide");
      $("#archiveButton").addClass("hide");
    }
  });

  addClickListeners();

  function loadFavourites() {
    getFavourites(userId).then(function (images) {
      console.log(images)

      if (images.length === 0) {
        // ADD EMPTY LAYOUT IF THERE ARE NO IMAGES
        $('#photoArchive').append('  <div class="row center-align center">\n' +
          '    <h1><br></h1>\n' +
          '    <div class="col s12 center-align center">\n' +
          '    <i class="medium material-icons">favorite_border</i>\n' +
          '    <h4>No favourites added (yet)</h4>\n' +
          '    </div>\n' +
          '  </div>');
      } else {
        // INFLATE CARDS
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
      }
    })
  }

  function addClickListeners() {
    $('#infoLoginButton').click(function () {
      firebase.auth().signInWithPopup(provider);
    });

    $('#logoutButton').click(function () {
      firebase.auth().signOut();
      window.location.href = 'index.html';
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
