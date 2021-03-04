window.addEventListener('load', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
  googleSignInBtn.addEventListener('click', () => {
    // sessionStorage.setItem('choseGoogle', true);
    // const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithRedirect(provider);
    // firebase.auth().signInWithPopup(GoogleProvider).then(() => {
      // console.log(firebase.auth().currentUser.uid);
      // console.log(firebase.database(`/users/${firebase.auth().currentUser.uid}`).textContent);
      // if (firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`) === firebase.auth().currentUser.uid) {
      //   console.log("sucsess");
      // } else {
        
      // }
    // }).catch(error => {
    //   console.log(error);
    // })
  });

  // console.log(user.providerData);
  googleSignUpBtn.addEventListener('click', () => {
    // sessionStorage.setItem('choseGoogle', true);
    // const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithRedirect(provider);
    // firebase.auth().signInWithPopup(GoogleProvider).then(() => {
      // if (firebase.auth().currentUser.email) {
      //   console.log("sucsess");
      // } else {
        
      // }
    // }).catch(error => {
    //   console.log(error);
    // })
  })


  signUpBtn.addEventListener('click', () => {
    const email = document.getElementById("emailUp").value;
    const password = document.getElementById("passwordUp").value;
    const emUpFeedback = document.getElementById("emUpFeedback");
    const pwUpFeedback = document.getElementById("pwUpFeedback");
    let isValid = true;

    if (email === '' || email === ' ') {
      emUpFeedback.textContent = 'Bitte geben Sie eine E-Mail Adresse ein.'
      isValid = false;
    } else if (validateEmail(email)) {
      emUpFeedback.textContent = '';
    } else {
      // email is invalid
      emUpFeedback.textContent = "Ungültige E-Mail Adresse.";
      isValid = false;
    }

    if (password === '' || password === ' ') {
      pwUpFeedback.textContent = "Bitte geben Sie ein Passwort ein.";
      isValid = false;
    } else if (validatePassword(password)) {
      pwUpFeedback.textContent = '';
    } else {
      if (!/[a-z]/.test(password)) {
        // no lower case letters
        pwUpFeedback.textContent =
          "Bitte geben Sie auch kleine Buchstaben ein.";
      } else if (!/[A-Z]/.test(password)) {
        // no higer case letters
        pwUpFeedback.textContent = "Bitte geben Sie auch große Buchstaben ein.";
      } else if (!/[0-9]/.test(password)) {
        // no numbers
        pwUpFeedback.textContent = "Bitte geben Sie auch Ziffern ein.";
      } else if (password.length <= 5) {
        // to short
        pwUpFeedback.textContent = "Das Passwort ist zu kurz.";
      } else {
        // unknown error
        pwUpFeedback.textContent =
          "Es ist ein unbekannter Fehler aufgetreten, versuchen Sie es später erneut.";
      }
      isValid = false;
    }

    if (isValid) {
      const promise = firebase.auth().createUserWithEmailAndPassword(email, password);

      promise.catch((error) => {
        const errorMsg = error.message;
        const messages = [
          { message: 'The password is invalid or the user does not have a password.', feedback: 'Das eingegebene Passwort ist ungültig.', affected: 'pw' },
          { message: 'Too many unsuccessful login attempts.  Please include reCaptcha verification or try again later', feedback: 'Der Anmelde Vorgang ist zu oft fehlgeschlagen, versuchen Sie es später ernuet.', affected: '' },
          { message: 'There is no user record corresponding to this identifier. The user may have been deleted.', feedback: 'Es wurde keine Account mit der eingegebenen E-Mail Adresse gefunden.', affected: 'em' },
          { message: 'A network error (such as timeout, interrupted connection or unreachable host) has occurred.', feedback: 'Zeitüberschreitung beim Anmelden. Versuche Sie es später erneut.', affected: '' },
          { message: 'The email address is already in use by another account.', feedback: 'Die angebene E-Mail Adresse wird bereits verwendet.', affected: 'em' },
        ];

        for (const msg of messages) {
          if (msg.message === errorMsg) {
            if (msg.affected === 'em') {
              emUpFeedback.textContent = msg.feedback;
            } else if (msg.affected === 'pw') {
              pwUpFeedback.textContent = msg.feedback;
            }
          }
        }
      })

      promise.then(() => {
        // firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`).set({
        //   email: firebase.auth().currentUser.email
      // });
        location.reload();
      })
    }
  })

  signInBtn.addEventListener('click', () => {
    const email = document.getElementById("emailIn").value;
    const password = document.getElementById("passwordIn").value;
    const emInFeedback = document.getElementById("emInFeedback");
    const pwInFeedback = document.getElementById("pwInFeedback");
    let isValid = true;

    if (email === "" || email === " ") {
      // email value is empty
      emInFeedback.textContent = "Bitte geben Sie eine E-Mail Adresse ein.";
      isValid = false;
    } else if (validateEmail(email)) {
      // email is valid
      emInFeedback.textContent = "";
    } else {
      // email is invalid
      emInFeedback.textContent = "Ungültige E-Mail Adresse.";
      isValid = false;
    }

    if (password === "" || password === " ") {
      // password value is empty
      pwInFeedback.textContent = "Bitte geben Sie ein Passwort ein.";
      isValid = false;
    } else {
      // password is valid
      pwInFeedback.textContent = "";
    }

    if (isValid) {
      const promise = firebase.auth().signInWithEmailAndPassword(email, password);

      promise.catch((error) => {
        const errorMsg = error.message;
        const messages = [
          {message: 'There is no user record corresponding to this identifier. The user may have been deleted.', feedback: 'Die eingegebene Email-Adresse wurde nicht gefunden', affected: 'em'},
          {message: 'The password is invalid or the user does not have a password.', feedback: 'Das eingegebene Passwort ist ungültig.', affected: 'pw'},
          {message: 'Too many unsuccessful login attempts.  Please include reCaptcha verification or try again later', feedback: 'Der Anmelde Vorgang ist zu oft fehlgeschlagen, versuchen Sie es später ernuet.', affected: ''},
          {message: 'There is no user record corresponding to this identifier. The user may have been deleted.', feedback: 'Es wurde keine Account mit der eingegebenen E-Mail Adresse gefunden.', affected: 'em'},
          {message: 'A network error (such as timeout, interrupted connection or unreachable host) has occurred.', feedback: 'Zeitüberschreitung beim Anmelden. Versuche Sie es später erneut.', affected: ''},
          {message: 'The email address is already in use by another account.', feedback: 'Die angebene E-Mail Adresse wird bereits verwendet.', affected: 'em'},
      ];
      for (const msg of messages) {
        if (msg.message === errorMsg) {
            if (msg.affected === 'em') {
                emInFeedback.textContent = msg.feedback;
            } else if (msg.affected === 'pw') {
                pwInFeedback.textContent = msg.feedback;
            }
        }
    }
      });

      promise.then(() => {
        location.reload();
      })
    }
  })

  signOut.addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
      location.reload();
    }).catch((error) => {
    });
  })
})

function validatePassword(password) {
  return (
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    password.length > 5
  );
}
  
function validateEmail(email) {
  if (email.includes("@")) {
    const splitEmail = email.split("@");
    return (
      splitEmail.length === 2 &&
      splitEmail[1].split(".").length === 2 &&
      splitEmail[1].split(".")[1].length >= 2 &&
      splitEmail[1].split(".")[0].length >= 3
    );
  } else {
    return false;
  }
}