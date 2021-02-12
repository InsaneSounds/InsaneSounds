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

  

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);


      const storage = firebase.storage();
      let sounds = []
      let allSounds = {};
      let audios = {};
      let representSounds = document.getElementById('representSounds');

      let allFolders = {};
      let nameOfStorage = {};
      let storageReference = storage.ref();

      storageReference.listAll().then(res => {
        res.prefixes.forEach(element => {
          nameOfStorage[element.fullPath] = element;
          let storageRef = storage.ref().child(element.fullPath)
          getItemsFromDatabase(storage, storageRef, sounds, element.fullPath);
          allFolders[element.fullPath] = element.fullPath;
          // loadSounds(representSounds,)
        });
        // console.log(allFolders);
        createButtonToLoad(representSounds, allFolders, sounds, allSounds, audios)
      });
      
      // let sounds = getItemsFromDatabase(storageRef);
      // console.log(storage.ref().child().fullPath());
      // const storageRef = storage.ref().child('basicSounds');
      
      
      // console.log(nameOfStorage.length)
      
      // nameOfStorage.forEach(element => {
        //   var storageRef = storage.ref().child(element)
        //   getItemsFromDatabase(storage, storageRef, sounds);
        // });
        
        
        // loadSounds.addEventListener('click', () => {
          // pleasePlay(sounds, allSounds, audios, representSounds);
          // loadSounds.style.display = 'none';
        // for (let [title, url] of Object.entries(nameOfStorage)) {
        //   storageRefForAll[title] = storage.ref().child(url.fullPath)
        //   getItemsFromDatabase(storage, storageRef, sounds);
        //   console.log("hi")
        // }
        // console.log(storageRefForAll)
        
        
        
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
      // }) 
      
      representSounds.addEventListener('click', (event) => {
        playSound(audios, event);
        
      })
    } else {
      console.log('signed Out');
    }
  });
});
  
  
function getItemsFromDatabase(storage, storageRef, sounds, path) {
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
          id: itemRef.fullPath.split('sound')[1].split('_')[0],
          path: path
        });
      }).catch(err => {
          console.error(err);
      });
    });
  })
}
function pleasePlay(sounds, allSounds, audios, divAfter, title, audios2) {
  allSounds = {};
  divAfter.textContent = '';
  sounds = sounds.sort(GetSortOrder('id'));

  
  for (let i = 0; i < sounds.length; i++) {
    if (sounds[i].path === title) 
      allSounds[sounds[i].name] = sounds[i].soundURL; 
  }

  for (let [title, url] of Object.entries(allSounds)) {
    audios[title] = new Audio(url);
    audios2[title] = new Audio(url);
  }

  for (let title of Object.keys(audios2)) {
    var newSound = document.createElement("p");
    newSound.setAttribute("class", "soundsToPlay");
    const color = getRandomColor();
    newSound.style.backgroundColor = color;
    newSound.style.border = `2px solid ${color}`;
    newSound.textContent = title;
    newSound.dataset["audio"] = title;
    divAfter.appendChild(newSound);
  }
}

function createButtonToLoad(representSounds, allFolders, sounds, allSounds, audios) {
  representSounds.textContent = '';
  for (let title of Object.keys(allFolders)) {
    let loadSound = document.createElement("p");
    let removeSound = document.createElement("p");
    let divAfter = document.createElement("div");

    loadSound.textContent = `Load ${title}`;
    removeSound.textContent = `Undisplay ${title}`;

    // vll ein Attribut vergeben --> aber selber name für alle
    loadSound.setAttribute("class", "loadButton"); 
    loadSound.setAttribute("id", `${title}Btn`); 
    // removeSound.setAttribute("class", "loadButton"); 
    removeSound.setAttribute("class", "undisplayBtn"); 
    divAfter.setAttribute("class", title);

    representSounds.appendChild(loadSound);
    representSounds.appendChild(removeSound);
    representSounds.appendChild(divAfter)

    loadSound.addEventListener('click', () => {
      let audios2 = {}; 
      pleasePlay(sounds, allSounds, audios, divAfter, title, audios2)
      divAfter.style.display = 'flex';
      loadSound.style.display = 'none';
      removeSound.style.display = 'flex';
    })

    removeSound.addEventListener('click', () => {
      divAfter.style.display = 'none';
      loadSound.style.display = 'flex';
      removeSound.style.display = 'none';
    })
  }
  
}


function playSound(audios, event) {
  let audio = audios[event.target.dataset["audio"]];
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