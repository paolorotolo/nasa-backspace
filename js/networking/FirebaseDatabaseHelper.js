var database = firebase.database();

function writeDb() {
  firebase.database().ref( + "test").set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}
