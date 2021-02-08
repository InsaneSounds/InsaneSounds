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
  const storageRef = storage.ref();

  const musicRef = storageRef.child('basicSounds');
  const spaceRef = storageRef.child('basicSounds/sound1.mp3')

 
  
  // console.log(spaceRef.toURL())

  // spaceRef.getDownloadURL().then(function(url) {
  //   console.log(url)
  // }
let introURL = null;

  spaceRef.getDownloadURL().then(url => {
    // document.getElementById(`image${getIdOfPath(itemRef.fullPath)}`).src = url;
    introURL = url;
    // console.log(url);
}).catch(err => {
    console.error(err.message);
}); 
  
  
  
  // const djMiko = new Audio("https://firebasestorage.googleapis.com/v0/b/insanesounds-a6a16.appspot.com/o/basicSounds%2FDJMiko.mp3?alt=media&token=8c8994fc-981e-4785-a3d1-ff804058d035");
  // const djChrisinator = new Audio("https://firebasestorage.googleapis.com/v0/b/insanesounds-a6a16.appspot.com/o/basicSounds%2FDJChrisinator.mp3?alt=media&token=d0a00006-1a23-403f-b5ef-eea70c234a6d");

  intro.addEventListener("click", () => {
    const Soundintro = new Audio(introURL);
    Soundintro.play();
  });

  miko.addEventListener("click", () => {
    djMiko.play();
  });

  chrisi.addEventListener("click", () => {
    djChrisinator.play();
  });

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
});
