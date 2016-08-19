$(function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      $('.autofirebasecontent').each(function() {
        var contentid = $(this).attr('firebasesave-contentid');
        if(!contentid) return;
        var textarea = $(this);

        var firebaseref = firebase.database().ref('/saveddata/' + user.uid + '/' + contentid);

        firebaseref.once('value', function(snapshot) {
          try {
            if(!snapshot.val()) return;
            textarea.val(snapshot.val().code);
            if(textarea.data('codemirror')) {
              textarea.data('codemirror').setValue(snapshot.val().code);
            }
          } finally {
            textarea.addClass('firebase-loaded');
            textarea.trigger('firebase-post-load');
          }
        });

        textarea.on('firebase-save', function() {
          //grava código no firebase
          try {
            if(textarea.data('codemirror')) {
              firebaseref.set( {code : textarea.data('codemirror').getValue() });
            } else {
              firebaseref.set ({ code: textarea.val() });
            }
          } catch(err) {
            console.log(err);
          }
        });
      });
    }
  });
});
