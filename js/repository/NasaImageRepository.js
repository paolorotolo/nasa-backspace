const NASA_ENDPOINT = "https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo";

/**
 * Get today Nasa Image of the Day
 * @returns {Promise<NasaImage>}
 */
async function getCurrentImage() {
  let result = await performGetRequest(NASA_ENDPOINT);
  let videoId = "";
  let videoThumb = "";

  if (result.media_type === "video") {
    // VIDEO CASE
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = result.url.match(regExp);
    videoId = (match&&match[7].length==11)? match[7] : false;


    videoThumb = "https://img.youtube.com/vi/" + videoId + "/0.jpg";

    // Map json result to NasaImage
    return new NasaImage(
      getTodayImageId(),
      result.title,
      result.explanation,
      videoThumb,
      videoThumb);
  } else {
    // IMAGE CASE
    // Map json result to NasaImage
    return new NasaImage(
      getTodayImageId(),
      result.title,
      result.explanation,
      result.url,
      result.hdurl);
  }
}

/**
 * Given an image, adds it to
 * user favourites list on Firebase
 *
 * @param userId
 * @param nasaImage
 * @param favourite
 */
function editFavourites(userId, nasaImage, favourite){
  if (favourite) {
    firebase.database().ref('/').child(userId).child('favourites/').child(nasaImage.uid).set(nasaImage);
  } else {
    firebase.database().ref('/').child(userId).child('favourites/').child(nasaImage.uid).remove();
  }
}

/**
 * Given an image id and user id,
 * remove the image from user's collection
 *
 * @param imageId
 * @param userId
 * @returns {Promise<void>}
 */
async function removeFavourite(imageId, userId) {
  await firebase.database().ref('/').child(userId).child('favourites/').child(imageId).remove();
}

/**
 * Returns true or false if today image
 * is already favourite
 */
function checkIfIsFavourite(userId, imageId) {

  return new Promise(exists => {
    firebase.database().ref('/').child(userId).child('favourites/').child(imageId).once('value').then(
      function (snapshot) {
        exists(snapshot.exists());
      }
    );
  })
}

/**
 * Get a list of favourites NasaImages
 * @param userId
 * @returns {Promise<any>}
 */
function getFavourites(userId) {
  return new Promise(resolve => {
      let images = [];

      firebase.database().ref('/').child(userId).child('favourites/').once('value').then(
      // Get each image form db and att to array
      function (snapshot) {
        snapshot.forEach(function(item) {
          images.push(item.val());
        });

        images.reverse();
        // When done return the array
        resolve(images);
      });
  })
}

/**
 * Generate a unique id for today image
 * @returns {number}
 */
function getTodayImageId(){
  let currentDay = new Date();
  currentDay.setUTCHours(0,0,0,0);
  return +currentDay;
}
