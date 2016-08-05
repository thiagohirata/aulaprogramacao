// Initialize Firebase
var config = {
  apiKey: "AIzaSyDC5WxwzI2hVBrAWHfWUgXBdQ9dYMQwF8Q",
  authDomain: "tpg2016-597c0.firebaseapp.com",
  databaseURL: "https://tpg2016-597c0.firebaseio.com",
  storageBucket: "tpg2016-597c0.appspot.com",
};
firebase.initializeApp(config);

//verifica autenticação
$(function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      $('.userdata .username').html(user.displayName);
      $('.userdata').removeClass('hidden');
    } else {
      // User is signed out.
      window.location="signin.html";
    }
  }, function(error) {
    console.log(error);
  });
});

$(document).on('click', '.onclick-logout', function(evt) {
  evt.preventDefault();
  try {
    var user = firebase.auth().currentUser;
    firebase.database().ref('/students/' + user.uid).remove();
  } catch (err) {}
  firebase.auth().signOut();
  window.location="signin.html";
});
