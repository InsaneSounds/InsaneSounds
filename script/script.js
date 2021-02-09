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
});

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