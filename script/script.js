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

  const provider = new firebase.auth.GoogleAuthProvider();
  googleSignInBtn.addEventListener('click', () => {
    // sessionStorage.setItem('choseGoogle', true);
    // const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().signInWithPopup(GoogleProvider).then(() => {
      // console.log(firebase.auth().currentUser.uid);
      // console.log(firebase.database(`/users/${firebase.auth().currentUser.uid}`).textContent);
      // if (firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`) === firebase.auth().currentUser.uid) {
      //   console.log("sucsess");
      // } else {
        
      // }
    }).catch(error => {
      console.log(error);
    })
  });

  const appleProvider = new firebase.auth.OAuthProvider('apple.com');
  appleSignUpBtn.addEventListener('click', () => {
    firebase
    .auth()
    .currentUser
    .reauthenticateWithPopup(appleProvider)
    .then((result) => {
      // User is re-authenticated with fresh tokens minted and can perform
      // sensitive operations like account deletion, or updating their email
      // address or password.
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
  
      // The signed-in user info.
      var user = result.user;
       // You can also get the Apple OAuth Access and ID Tokens.
      var accessToken = credential.accessToken;
      var idToken = credential.idToken;
  
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
  
      // ...
    });
  })

  // console.log(user.providerData);
  googleSignUpBtn.addEventListener('click', () => {
    // sessionStorage.setItem('choseGoogle', true);
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().signInWithPopup(GoogleProvider).then(() => {
      // if (firebase.auth().currentUser.email) {
      //   console.log("sucsess");
      // } else {
        
      // }
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
      })
    }
  })

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);


      const storage = firebase.storage();
    
      // let sounds = getItemsFromDatabase(storageRef);
      // console.log(storageRef.listAll());

      let sounds = []
      let allSounds = {};
      let audios = {};
      let representSounds = document.getElementById('representSounds');
      loadSounds.addEventListener('click', () => {
        // loadSounds.style.display = 'none';
        
          const storageRef = storage.ref().child('basicSounds');
          getItemsFromDatabase(storage, storageRef, sounds);
          
          pleasePlay(sounds, allSounds, audios, representSounds);
          // console.log(sounds.length);
          // createbutton(audios, representSounds);
        // }
        // console.log(representSounds);
        
        
        // loadAudio(allSounds, );
        // console.log(audios);
        // if (sounds.length === 0) {
        //   pleasePlay(sounds, allSounds, audios, representSounds);
        //   createbutton(audios, representSounds);
        // }
        
        // console.log(representSounds)
      }) 
      
      representSounds.addEventListener('click', (event) => {
        playSound(audios, event);
        
      })
      // console.log(user.providerData[0].providerId);
      

      // loadSounds.addEventListener('click', () => {
      //   loadSounds.style.display = 'none';
      //   representSounds(sounds);
      // })  
    } else {
      console.log('signed Out');
      // console.log(user.providerData[0].providerId);
    }
  });

  
  signOut.addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
    }).catch((error) => {
    });
  })


  
  // console.log(numberOfItems);
  // sounds.forEach(item => {
  //   console.log(item);
  // })
  

  
  // console.log(sounds[5]);
  // let sortSounds = [];
  // representSounds.textContent = "";
  // for (const index in sounds) {
  //   sortSounds.push(sounds[index]);
  // }
  // sortSounds

  

  

  // console.log(sortSounds)
  
  // sortSounds = sortSounds.sort(GetSortOrder('id'));
  // console.log(sortSounds)
  
  // console.log(sortSounds[1].name)
  // console.log(allSounds);
  
  
  // console.log(sortSounds);


  // if (sounds.length === 0) {
  //   representSounds.textContent = 'Keine Sounds verfügbar';
  // } else {

  //   let allSounds = getAllSounds(sounds);
  //   console.log(allSounds.id)
    
  //   console.log(sounds);
  //   console.log(audios)
  
  //   let representSounds = document.getElementById("representSounds");
    
  //   console.log(representSounds)


    
  // }
  
});

function getItemsFromDatabase(storage, storageRef, sounds) {
  // let sounds = [];
  storageRef.listAll().then(res => {
    res.items.forEach(itemRef => {
      storage.ref(itemRef.fullPath).getDownloadURL().then(url => {
        let name = itemRef.fullPath.split('/')[1].split('_')[1].split('.')[0];
        if (name.includes('WWM-')) {
          name = name.split('WWM-')[1];
        }
        sounds.push({
          name: name,
          soundURL: url,
          fullPath: itemRef.fullPath,
          id: itemRef.fullPath.split('sound')[1].split('_')[0]
        });
        // console.log(res);
      }).catch(err => {
          console.error(err);
      });
    });
  })
  // return sounds;
  // console.log(sounds.length);
  // console.log("hi");
}

function pleasePlay(sounds, allSounds, audios, representSounds) {
  // sounds.forEach(element => {
  //   console.log(element);
  // });
  // let allSounds = {};
  sounds = sounds.sort(GetSortOrder('id'));
    
  // console.log(sounds);
  for (let i = 0; i < sounds.length; i++) {
    allSounds[sounds[i].name] = sounds[i].soundURL;
    // console.log(allSounds);
  }

  // console.log(allSounds);
  for (let [title, url] of Object.entries(allSounds)) {
    audios[title] = new Audio(url);
  }

  representSounds.textContent = '';
  for (let title of Object.keys(audios)) {
    let newSound = document.createElement("p");
    newSound.setAttribute("class", "soundsToPlay"); 
    newSound.textContent = title;
    const color = getRandomColor();
    newSound.style.backgroundColor = color;
    newSound.style.border = `2px solid ${color}`;
    newSound.dataset["audio"] = title;
    representSounds.appendChild(newSound);
  }
  
}

// function loadAudio(allSounds, audios) {
//   // let audios = {};
  
//   // console.log(audios)
//   // return audios;
  
// }

// function createbutton(audios, representSounds) {
//   console.log(audios);
  
//   console.log(Object.keys(audios));
//   // return representSounds;
//   console.log("hi4");
// }

function playSound(audios, event) {
  let audio = audios[event.target.dataset["audio"]];
  // console.log(audio);
  // console.log(audios)
  if (audio) {
    for (let audio of Object.values(audios)) {
      audio.pause();
      audio.currentTime = 0;
    }
    audio.play();
    
    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
    if (navigator.vibrate) {
      navigator.vibrate([50]);
    }
  }
  // console.log("hi5");
}

// function getAllSounds(sounds) {
//   sounds.forEach(element => {
//     console.log(element);
//   });
//   let allSounds = {};
    
//   for (let i = 0; i < sounds.length; i++) {
//     allSounds[sounds[i].name] = sounds[i].soundURL;
//     console.log(allSounds);
//   }
//   console.log(sounds);
  
//   return allSounds;
// }
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

// function representSounds(sounds) {
//   let sortSounds = [];
//   const representSounds = document.getElementById('representSounds');
//   representSounds.textContent = "";
//   for (const index in sounds) {
//     sortSounds.push(sounds[index]);
//   }

  

//   function getRandomColor() {
//     const randomColors = ['#42b983', '#f66', '#e7ecf3', '#486491', '#ffe88c', '#dc5656', '#00a0d2', '#76c3bd', '#fdc162', '#10a296', '#485b6e', '#10bf9d'];
//     return randomColors[Math.floor(Math.random() * Math.floor(randomColors.length))];
//   }

//   // console.log(sortSounds)
  
//   sortSounds = sortSounds.sort(GetSortOrder('id'));
//   console.log(sortSounds)
  
//   // console.log(sortSounds[1].name)
//   // console.log(allSounds);
  
  
//   // console.log(sortSounds);


//   if (sortSounds.length === 0) {
//     representSounds.textContent = 'Keine Sounds verfügbar';
//   } else {
//     let allSounds = {};
    
//     for (let i = 0; i < sortSounds.length; i++) {
//       allSounds[sortSounds[i].name] = sortSounds[i].soundURL;
//     }

//     let audios = {};
//     for (let [title, url] of Object.entries(allSounds)) {
//         audios[title] = new Audio(url);
        
//     }
//     console.log(sortSounds);
//     console.log(audios)
  
//     let representSounds = document.getElementById("representSounds");
//     for (let title of Object.keys(audios)) {
//       let newSound = document.createElement("p");
//       newSound.setAttribute("class", "soundsToPlay"); 
//       newSound.textContent = title;
//       const color = getRandomColor();
//       newSound.style.backgroundColor = color;
//       newSound.style.border = `2px solid ${color}`;
//       newSound.dataset["audio"] = title;
//       representSounds.appendChild(newSound);
//       // console.log('dajbfnds')
//     }
    

//     // for (let i = 0; i < sortSounds.length; i++) {
//     //   sortSounds[i].title = new Audio(sortSounds[i].soundURL)
//     // }

//     // console.log(sortSounds);

//     representSounds.addEventListener('click', (event) => {
//       let audio = sortSounds[event.target.dataset["audio"]];
//       if (audio) {
//         for (let audio of Object.values(audios)) {
//           audio.pause();
//           audio.currentTime = 0;
//         }
//         audio.play();
        
//         navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
//         if (navigator.vibrate) {
//           navigator.vibrate([50]);
//         }
//       }
//     })
//     // var playOneSound = -1;
//     // for (let i = 0; i < sortSounds.length; i++) {
//     //   if (sortSounds[i] != null) {
        



//         // const color = getRandomColor();

//         // const newAudio = document.createElement("audio");
//         // const startNewAudio = document.createElement("p");
//         // startNewAudio.textContent = sortSounds[i].name;
//         // newAudio.setAttribute('src', sortSounds[i].soundURL);

//         // startNewAudio.setAttribute("class", "soundsToPlay"); 
//         // startNewAudio.style.backgroundColor = color;
//         // startNewAudio.style.border = `2px solid ${color}`;
//         // startNewAudio.addEventListener('click', () => {
//         //   stopAll();
//         //   newAudiostart();
//         // });
//         // representSounds.appendChild(newAudio);
//         // representSounds.appendChild(startNewAudio);
//         // console.log("hallo");

//         // const newSound = document.createElement("p");
//         // newSound.textContent = sortSounds[i].name;
//         // const color = getRandomColor();
//         // newSound.setAttribute("class", "soundsToPlay"); 
//         // newSound.setAttribute('id', i);
//         // // const soundsToPlay = document.getElementsByName("soundsToPlay");
//         // newSound.style.backgroundColor = color;
//         // newSound.style.border = `2px solid ${color}`;
//         // newSound.addEventListener('click', () => {
//         //   playOneSound = i;
//         //   console.log(playOneSound);
//         //   // play(playOneSound, sortSounds[i].soundURL);
//         //   new Audio(sortSounds[i].soundURL).play();
//         //   // if (sounds) {
//         //   //   audioSound.stop();
//         //   // }
//         //   // audioSound.play();
          
//         //   navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
//         //   if (navigator.vibrate) {
//         //     navigator.vibrate([50]);
//         //   }
//         // })
//         // representSounds.appendChild(newSound);
//     //   }
//     // }
//   }
// }