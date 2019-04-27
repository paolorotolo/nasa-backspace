const NASA_ENDPOINT = "https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo";

async function getCurrentImage() {
  let result = await performGetRequest(NASA_ENDPOINT);

  // Map json result to NasaImage
  return new NasaImage(
    result.title,
    result.explanation,
    result.url,
    result.hdurl);
}

function editFavourites(userId, imageId, nasaImage, favourite){
  if (favourite) {
    firebase.database().ref('/').child(userId).child('favourites/').child(imageId).set(nasaImage);
  } else {
    firebase.database().ref('/').child(userId).child('favourites/').child(imageId).remove();
  }
}

function getFavourites(userId) {
  return new Promise(resolve => {
      let images = [];

      firebase.database().ref('favourites/').child(userId).once('value').then(
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
