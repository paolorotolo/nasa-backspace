const NASA_ENDPOINT = "https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo";

async function getCurrentImage() {
  let result = await performGetRequest(NASA_ENDPOINT);

  // Map json result to NasaImage
  return new NasaImage(
    getTodayImageId(),
    result.title,
    result.explanation,
    result.url,
    result.hdurl);
}

function editFavourites(userId, nasaImage, favourite){
  if (favourite) {
    firebase.database().ref('/').child(userId).child('favourites/').child(nasaImage.uid).set(nasaImage);
  } else {
    firebase.database().ref('/').child(userId).child('favourites/').child(nasaImage.uid).remove();
  }
}

async function removeFavourite(imageId, userId) {
  await firebase.database().ref('/').child(userId).child('favourites/').child(imageId).remove();
}

function checkIfIsFavourite(userId, imageId) {
  console.log(userId);
  console.log(imageId);
  return new Promise(exists => {
    firebase.database().ref('/').child(userId).child('favourites/').child(imageId).once('value').then(
      function (snapshot) {
        exists(snapshot.exists());
      }
    );
  })
}

function getFavourites(userId) {
  return new Promise(resolve => {
      let images = [];

      firebase.database().ref('/').child(userId).child('favourites/').once('value').then(
      // Get each image form db and att to array
      function (snapshot) {
        snapshot.forEach(function(item) {
          images.push(item.val());
        });

        // When done return the array
        resolve(images);
      });
  })
}


function getTodayImageId(){
  let currentDay = new Date();
  currentDay.setUTCHours(0,0,0,0);
  return +currentDay;
}
