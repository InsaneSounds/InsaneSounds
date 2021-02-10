window.addEventListener("load", () => {
  // <!-- TODO: Add SDKs for Firebase products that you want to use
  //  https://firebase.google.com/docs/web/setup#available-libraries -->

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // const firebaseConfig = {
  //   apiKey: "AIzaSyCsTzPtx0VvsyDbjJDsQJD4KFnZCkdbvSM",
  //   authDomain: "insanesounds-a6a16.firebaseapp.com",
  //   databaseURL: "https://insanesounds-a6a16-default-rtdb.firebaseio.com",
  //   projectId: "insanesounds-a6a16",
  //   storageBucket: "insanesounds-a6a16.appspot.com",
  //   messagingSenderId: "454795866463",
  //   appId: "1:454795866463:web:b779b0cc60ad20a50786ea",
  //   measurementId: "G-0H3S34FM2G"
  // };
  // // Initialize Firebase
  // firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

  const GoogleProvider = new firebase.auth.GoogleAuthProvider();
  googleSignInBtn.addEventListener('click', () => {
    // const provider = new firebase.auth.GoogleAuthProvider();
    // const promise = firebase.auth().signInWithPopup(provider);

    firebase.auth().signInWithPopup(GoogleProvider).then(() => {
      // window.location.assign('./useres');
    }).catch(error => {
      console.log(error);
    })
  });

  googleSignUpBtn.addEventListener('click', () => {
    firebase.auth().signInWithPopup(GoogleProvider).then(() => {
      firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`).set({
        email: firebase.auth().currentUser.email
      });
    }).catch(error => {
      console.log(error);
    })
    
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
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`).set({
          email: firebase.auth().currentUser.email
      });
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
        // sessionStorage.setItem('choseGoogle', true);
        // firebase.auth().signInWithEmailAndPassword(email, password);
      })
    }

    
  })

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
      const storage = firebase.storage();
      const storageRef = storage.ref().child('basicSounds');

      const sounds = [];
      storageRef.listAll().then(res => {
        res.items.forEach(itemRef => {
          storage.ref(itemRef.fullPath).getDownloadURL().then(url => {
            sounds.push({
              name: itemRef.fullPath.split('/')[1].split('_')[1].split('.')[0],
              soundURL: url,
              fullPath: itemRef.fullPath,
              id: itemRef.fullPath.split('sound')[1].split('_')[0]
            });
          }).catch(err => {
              console.error(err);
          });
        });
      })

      loadSounds.addEventListener('click', () => {
        loadSounds.style.display = 'none';
        representSounds(sounds);
      })

      
    } else {
      console.log('signed Out');
    }
  });

  signOut.addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
    }).catch((error) => {
    });
  })

  
});

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

function representSounds(sounds) {
  const sortSounds = [];
  const representSounds = document.getElementById('representSounds');
  representSounds.textContent = "";
  for (const index in sounds) {
    sortSounds.push(sounds[index]);
  }

  function GetSortOrder(sortetArr) {    
    return function(a, b) {    
        if (a[sortetArr] > b[sortetArr]) {    
            return 1;    
        } else if (a[sortetArr] < b[sortetArr]) {    
            return -1;    
        }    
        return 0;    
    }    
  }

  function getRandomColor() {
    const randomColors = ['#42b983', '#f66', '#e7ecf3', '#486491', '#ffe88c', '#dc5656', '#00a0d2', '#76c3bd', '#fdc162', '#10a296', '#485b6e', '#10bf9d'];
    return randomColors[Math.floor(Math.random() * Math.floor(randomColors.length))];
  }

  sortSounds.sort(GetSortOrder('id'));

  if (sortSounds.length === 0) {
    representSounds.textContent = 'Keine Sounds verfügbar';
  } else {
    for (let i = 0; i < sortSounds.length; i++) {
      if (sortSounds[i] != null) {
        const newSound = document.createElement("p");
        newSound.textContent = sortSounds[i].name;
        const color = getRandomColor();
        newSound.setAttribute("class", "soundsToPlay"); 
        newSound.style.backgroundColor = color;
        newSound.style.border = `2px solid ${color}`;
        newSound.addEventListener('click', () => {
          const audioSound = new Audio(sortSounds[i].soundURL);
          audioSound.play();

          navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
          if (navigator.vibrate) {
            navigator.vibrate([50]);
          }
        })
        representSounds.appendChild(newSound);
      }
    }
  }
}