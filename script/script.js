window.addEventListener("load", () => {
  // <!-- TODO: Add SDKs for Firebase products that you want to use
  //  https://firebase.google.com/docs/web/setup#available-libraries -->

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCsTzPtx0VvsyDbjJDsQJD4KFnZCkdbvSM",
    authDomain: "insanesounds-a6a16.firebaseapp.com",
    projectId: "insanesounds-a6a16",
    storageBucket: "insanesounds-a6a16.appspot.com",
    messagingSenderId: "454795866463",
    appId: "1:454795866463:web:b779b0cc60ad20a50786ea",
    measurementId: "G-0H3S34FM2G",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const storage = firebase.storage();
  const storageRef = storage.ref().child('basicSounds');

  // const musicRef = storageRef.child('basicSounds');
  // const spaceRef = storageRef.child('basicSounds/sound1.mp3')

  const sounds = [];

  // console.log(storageRef.listAll())
  storageRef.listAll().then(res => {
    res.items.forEach(itemRef => {
      storage.ref(itemRef.fullPath).getDownloadURL().then(url => {
        // document.getElementById(`image${getIdOfPath(itemRef.fullPath)}`).src = url;
        sounds.push({
          name: itemRef.fullPath.split('/')[1].split('_')[1].split('.')[0],
          soundURL: url,
          fullPath: itemRef.fullPath
        });
        // console.log(sounds[1].name)
        // console.log(itemRef.fullPath);
        // console.log(sounds[0].fullPath)
        // introURL += url;
        // console.log(url);
        // console.log(sounds[0].name)
        
      }).catch(err => {
          // console.error(err.message);
      });
    });
  })
  
  // console.log(sounds.fullPath)
  // const obj = JSON.parse(sounds);
  // const arrLength = sounds[0].length;
  

  loadSounds.addEventListener('click', () => {
    representSounds(sounds);
    console.log(sounds.length)
    // const sortArr = [];
// console.log(sounds[0].fullPath.split('sound')[1].split('_')[0])
    // for (let i = 0; i != sounds.length; i++) {
    //   let soundNumber = sounds[0].fullPath.split('sound')[1].split('_')[0]
    //   if (soundNumber != i) {
    //     sortArr[soundNumber] = sounds[i].name + ' ' + sounds[i].soundURL;
    //     console.log(sortArr);
    //   } else {
    //     sortArr[i] = sounds[i].name + ' ' + sounds[i].soundURL;
    //   }
    // }
    // console.log(sortArr)
    const allButtons = document.querySelectorAll('.SoundsToPlay');
    for (let i = 0; i <= allButtons.length; i++) {
      
    }
    console.log(allButtons);
  })

  
// console.log(sounds[0].name);
  // console.log(sounds.name),
  // console.log(soundURL)
  // console.log(spaceRef.toURL())

  // spaceRef.getDownloadURL().then(function(url) {
  //   console.log(url)
  // }


//   spaceRef.getDownloadURL().then(url => {
//     // document.getElementById(`image${getIdOfPath(itemRef.fullPath)}`).src = url;
//     introURL = url;
//     // console.log(url);
// }).catch(err => {
//     console.error(err.message);
// }); 
  
  
  
  // const djMiko = new Audio("https://firebasestorage.googleapis.com/v0/b/insanesounds-a6a16.appspot.com/o/basicSounds%2FDJMiko.mp3?alt=media&token=8c8994fc-981e-4785-a3d1-ff804058d035");
  // const djChrisinator = new Audio("https://firebasestorage.googleapis.com/v0/b/insanesounds-a6a16.appspot.com/o/basicSounds%2FDJChrisinator.mp3?alt=media&token=d0a00006-1a23-403f-b5ef-eea70c234a6d");

  // intro.addEventListener("click", () => {
  //   const Soundintro = new Audio(sounds[0].soundURL);
  //   console.log(sounds[0].name)
  //   Soundintro.play();
  // });

  // miko.addEventListener("click", () => {
  //   const djMiko = new Audio(sounds[1].soundURL)
  //   console.log(sounds[1].name)
  //   djMiko.play();
  // });

  // chrisi.addEventListener("click", () => {
  //   djChrisinator.play();
  // });

  // function playSong() {
  //     audio.play();
  // }

  // var audio = new Audio(),
  // i = 0;
  // var playlist = new Array('http://www.w3schools.com/htmL/horse.mp3', 'http://demos.w3avenue.com/html5-unleashed-tips-tricks-and-techniques/demo-audio.mp3');

  // audio.addEventListener('ended', function () {
  //     i = ++i < playlist.length ? i : 0;
  //     console.log(i)
  //     audio.src = playlist[i];
  //     audio.play();
  // }, true);
  // audio.volume = 0.3;
  // audio.loop = false;
  // audio.src = playlist[0];
  // audio.play();
  // console.log(sounds.length);
  // console.log('hallo')
});


function representSounds(sounds) {
  const sortSounds = [];
  const representSounds = document.getElementById('representSounds');
// console.log(sounds[1].name)
  representSounds.textContent = "";
  for (const index in sounds) {
    sortSounds.push(sounds[index]);
  }
  console.table(sortSounds);

  if (sortSounds.length === 0) {
    representSounds.textContent = 'Keine Sounds verfügbar';
  } else {
    for (let i = 0; i < sortSounds.length; i++) {
      if (sortSounds[i] != null) {
        const newSound = document.createElement("button");
        // console.log(sortSounds.soundURL)
        newSound.textContent = sortSounds[i].name;
        newSound.setAttribute("class", "SoundsToPlay"); 
        // newSound.setAttribute("id", sortSounds[i].name); 
        // newSound.onclick( audioSound.play() = new Audio(sortSounds[i].soundURL));
        newSound.addEventListener('click', () => {
          const audioSound = new Audio(sortSounds[i].soundURL);
          console.log(sortSounds[i].soundURL);
          audioSound.play();
        })
        representSounds.appendChild(newSound);
      }
    }
  }
}

// function playSound(sound) {
//   const audioSound = new Audio(sound.soundURL);
//   //   console.log(sounds[1].name)
//     audioSound.play();
// }
