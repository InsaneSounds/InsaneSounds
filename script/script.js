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
      const uploadFiles = document.getElementById('uploadFiles');
      const existingFolders = document.getElementById('existingFolders');

      let allFolders = {};
      let nameOfStorage = {};
      let storageReference = storage.ref();
      let storageRef;
      storageReference.listAll().then(res => {
        // console.log('storageReference');
        res.prefixes.forEach(element => {
          nameOfStorage[element.fullPath] = element;
          storageRef = storageReference.child(element.fullPath)
          getItemsFromDatabase(storage, storageRef, sounds, element.fullPath);
          allFolders[element.fullPath] = element.fullPath;
          // loadSounds(representSounds,)
        });
        // console.log(storageRef);
        createButtonToLoad(representSounds, allFolders, sounds, allSounds, audios, storageReference);
        selectFolder(existingFolders, allFolders);
        // console.log(sounds.length);
      });

      // console.log(sounds.length);
      
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
        // let checkbox = document.getElementsByTagName('input');
        // let isValid = false;
        // console.log(checkbox[0].style.display);
        // for (let i = 0; i <= checkbox.length; i++) {
        //   console.log(checkbox[i].style.display);
        //   if (checkbox[i].style.display === 'flex') {
        //     isValid = false;
        //   } else if (checkbox[i].style.display === 'none') {
        //     isValid = true;
        //   } 
        // }
        // // checkbox.forEach(element => {
        // //   if (element.type === 'checkbox' && element.style.display === 'flex') {
        // //     isValid = false;
        // //   } else if (element.style.display === 'none') {
        // //     isValid = true;
        // //   } 
          
        // // });
        // if (isValid) 
          playSound(audios, event);
      })
      
      uploadFiles.addEventListener('click', () => {
        const files = document.getElementById('files').files;
        const fileFeedback = document.getElementById('fileFeedback');
        const choosedFolder = document.getElementById('choosedFolder');
        const folderNameFeedback = document.getElementById('folderNameFeedback');
        let isValid = true;

        // let choosedFol
        if (choosedFolder.value === '' || choosedFolder.value === ' ') {
          folderNameFeedback.textContent = "Bitte geben sie einen Ordnernamen ein.";
          isValid = false;
        } 
        let fragmente = {};
        for (let i = 0, f; f = files[i]; i++) {
          fragmente[i] = f;
        }
        // console.log(files.length);
        // console.log(fragmente);
        
        if (files.length === 0) {
          fileFeedback.textContent = "Es wurden keine File zum hochladen gefunden";
          // console.log('hallo')
          isValid = false;
        }

        if(isValid) {
          // let selectUploadFolder = document.querySelector("#selectUploadFolder").value
          // let storageFolder = firebase.storage().ref(choosedFolder.value);
          // console.log(fragmente[0]);
          
          uploadImageAsPromise(fragmente, choosedFolder.value);
        }
        //  else
        //   console.log('test')
        
      })

      closePopUpBox.addEventListener('click', () => {
        document.getElementById('chooseFolderBox').style.opacity = 0;
        document.getElementById('chooseFolderBox').style.zIndex = 1;
        document.getElementById('chooseFolderBox').style.pointerEvents = 'none';
        document.getElementById('chooseFolderBox').style.display = 'none';
        document.getElementById('chooseFolderBox').style.position = 'none';
      })
      const choosedFolder = document.getElementById('choosedFolder');
      choosedFolder.addEventListener('click', () => {
        document.getElementById('chooseFolderBox').style.opacity = 1;
        document.getElementById('chooseFolderBox').style.zIndex = 1;
        document.getElementById('chooseFolderBox').style.pointerEvents = 'auto';
        document.getElementById('chooseFolderBox').style.display = 'flex';
        // document.getElementById('chooseFolderBox'). = 'flex';
        document.getElementById('newFolderNameFeedback').textContent = '';
      })

      choseNewFolder.addEventListener('click', () => {
        const newFolderName = document.getElementById('newFolderName');
        const newFolderNameFeedback = document.getElementById("newFolderNameFeedback");
        const choosedFolder = document.getElementById('choosedFolder');
        if (newFolderName.value === '' || newFolderName.value === ' ') {
          newFolderNameFeedback.textContent = "Bitte geben sie einen Ordnernamen ein.";
        } else {
          choosedFolder.value = newFolderName.value;
          newFolderName.value = '';
          document.getElementById('chooseFolderBox').style.opacity = 0;
          document.getElementById('chooseFolderBox').style.zIndex = 1;
          document.getElementById('chooseFolderBox').style.pointerEvents = 'none';
          document.getElementById('chooseFolderBox').style.display = 'none';
          document.getElementById('chooseFolderBox').style.position = 'none';
        }
      })

      // deleteSoundsBtn.addEventListener('click', () => {
      //   const goToDeleteBtn = document.getElementsByTagName('i');
      //   console.log(goToDeleteBtn.length);
      //   for (let i = 0; i < goToDeleteBtn.length; i++) {
      //     goToDeleteBtn[i].style.display = 'flex';
      //   }
      //   // goToDeleteBtn.forEach(element => {
      //   //   element.style.display = 'flex';
      //   // });
      // })

      // uploadFiles.addEventListener('click', () => {
        
      // })

      // choosedFolder.addEventListener('click', () => {
      //   let chooseFolderBox = document.getElementById('chooseFolderBox');
      //   chooseFolderBox.style.display = 'flex';
      //   // chooseFolderBox.style.display = 'none'
      // })
    } else {
      console.log('signed Out');
    }
  });
});
  
function uploadImageAsPromise(fragmente, selectUploadFolder) {
  let task;
  for (let i = 0, f; f = fragmente[i]; i++) {
    let storageRef =  firebase.storage().ref(`${selectUploadFolder}/${f.name}`)
    task = storageRef.put(f);  
  }
  console.log(document.getElementsByTagName('body'));
  console.log(document.getElementsByClassName('lds-ellipsis'));
  document.getElementsByClassName('lds-ellipsis')[0].style.display = 'inline-block';
  // load.style.display = 'inline-block';
  document.getElementsByTagName('body')[0].style.pointerEvents = 'none';
  task.on('state_changed', function progress(snapshot) {
    var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
    console.log(percentage);
    // let load = document.getElementsByClassName('lds-ellipsis');
    

  }, function error(err) {


  },function complete() {
    console.log('complete')
    // let load = document.getElementsByClassName('lds-ellipsis');
    // load.style.display = 'flex';
    document.getElementsByClassName('lds-ellipsis')[0].style.display = 'none';
    // document.style.pointerEvents = 'auto';
    document.getElementsByTagName('body')[0].style.pointerEvents = 'auto';
  });
    

}
function selectFolder(existingFolders, allFolders) {
  console.log(allFolders);
  // let select = document.createElement("select");
  // select.setAttribute("class", "select")
  // select.setAttribute("id", "selectUploadFolder")
  // existingFolders.appendChild(select);
  for (let title of Object.keys(allFolders)) {
    let option = document.createElement("p");
    // newSound.setAttribute("class", "soundsToPlay");
    // const color = getRandomColor();
    // newSound.style.backgroundColor = color;
    // newSound.style.border = `2px solid ${color}`;
    // option.value = title;
    option.textContent = title;
    option.addEventListener('click', () => {
      choosedFolder.value = title;
      document.getElementById('chooseFolderBox').style.opacity = 0;
      document.getElementById('chooseFolderBox').style.opacity = 0;
     document.getElementById('chooseFolderBox').style.zIndex = 1;
    //  document.getElementById('chooseFolderBox').style.pointerEvents = 'none';
     document.getElementById('chooseFolderBox').style.display = 'none';
    //  document.getElementById('chooseFolderBox').style.position = 'none';
    })
    // newSound.dataset["audio"] = title;
    existingFolders.appendChild(option);
    // existingFolders.appendChild(optionText)
  }
  // let option = document.createElement
  
}
  
function getItemsFromDatabase(storage, storageRef, sounds, path) {
  
  storageRef.listAll().then(res => {
    res.items.forEach(itemRef => {
      storage.ref(itemRef.fullPath).getDownloadURL().then(url => {
        let name = itemRef.fullPath.split('/')[1];
        // .split('.')[0];
        // .split('_')[1]
        // if (name.includes('WWM-')) {
        //   name = name.split('WWM-')[1];
        // }
        sounds.push({
          name: name,
          soundURL: url,
          fullPath: itemRef.fullPath,
          // id: itemRef.fullPath.split('sound')[1].split('_')[0],
          path: path
        });
      }).catch(err => {
          console.error(err);
      });
    });
  });
}

function pleasePlay(sounds, allSounds, audios, divAfter, title, audios2, storageRef) {
  console.log(sounds.length);
  allSounds = {};
  divAfter.textContent = '';
  // sounds = sounds.sort(GetSortOrder('id'));
  // console.log(title); 
  for (let i = 0; i < sounds.length; i++) {
    if (sounds[i].path === title) 
      allSounds[sounds[i].name] = sounds[i].soundURL; 
  }

  for (let [title, url] of Object.entries(allSounds)) {
    audios[title] = new Audio(url);
    audios2[title] = new Audio(url);
  }
  // console.log(title); 
  for (let soundTitle of Object.keys(audios2)) {
    let newSound = document.createElement("p");
    let newSoundName = document.createElement("label")
    let soundToDelete = document.createElement("input");

    newSound.setAttribute("class", "soundsToPlay");
    newSoundName.setAttribute("for", soundTitle)
    soundToDelete.setAttribute("type", "checkbox");
    soundToDelete.setAttribute("name", soundTitle);
    soundToDelete.setAttribute("id", soundTitle);
    soundToDelete.setAttribute("class", "checkboxToDelete");
    // newSoundName.style.zIndex = "1";
    // newSound.style.zIndex = "99";
    soundToDelete.style.display = 'none';
    const color = getRandomColor();
    newSound.style.backgroundColor = color;
    newSound.style.border = `2px solid ${color}`;
    newSoundName.textContent = soundTitle;
    newSoundName.dataset["audio"] = soundTitle;

    // console.log(newSoundName);
    newSound.appendChild(soundToDelete);
    newSound.appendChild(newSoundName)
    divAfter.appendChild(newSound);
    // console.log(title); 

    soundToDelete.addEventListener('click', () => {
      // storageRef.child(title).delete();
      // console.log(title); 
      // console.log(storageRef);

      

      // // Delete the file
      // pathToDelete.delete().then(() => {
      //   console.log('Sucess');
      //   location.reload();  
      //   // getItemsFromDatabase()
      //   // File deleted successfully
      // }).catch((error) => {
      //   // console.log("hallo");
      //   console.log(error);
      //   // Uh-oh, an error occurred!
      // });
    })

    // let whichCheck;
    var whichCheck;
    newSound.addEventListener("touchstart", () => {
      touchstart();
      // , false
      // whichCheck = newSound.getElementsByTagName('input')[0];
      // let id = whichCheck.id
      // console.log(id);
    });
    newSound.addEventListener("touchend", () => {
      
      touchend();
      // whichCheck.checked;
      // , false
    });
    var onlongtouch; 
    var timer;
    var touchduration = 1000; //length of time we want the user to touch before we do something
    
    function touchstart(e) {
        // e.preventDefault();
        whichCheck = newSound.getElementsByTagName('input')[0];
        // console.log(whichCheck);
        // console.log(newSound.getElementsByTagName('input')[0]);
        if (!timer) {
            timer = setTimeout(onlongtouch, touchduration);
        }
    }
    
    function touchend() {
      //stops short touches from firing the event
      // console.log(newSound.getElementsByTagName('input')[0]);
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    }
    onlongtouch = function() { 
        timer = null;
        // soundToDelete
        // document.getElementById('ping').innerText+='ping\n';
        // console.log(newSound.getElementsByTagName('input')[0]);

        // soundToDelete.checked = true
        const goToDeleteBtn = document.getElementsByClassName('checkboxToDelete');
        // getElementsByTagName('input');
        // console.log(goToDeleteBtn);
        for (let i = 0; i < goToDeleteBtn.length; i++) {
          goToDeleteBtn[i].checked = false;
          goToDeleteBtn[i].style.display = 'flex';
        }
        // console.log(whichCheck);
        whichCheck.checked = true;
        

        // console.log(newSoundName); 
        // soundToDelete.checked = true;
    };

    // let clickstart = 1000;
    // let holdStarter = null;
    // let holdActive = false;
    // let clickstop;
    // newSound.addEventListener('touchstart', (event) => {
    //   console.log(event.touches);
    //   holdStarter = setTimeout(function() {
    //     holdStarter = null;
    //     holdActive = true;
    //     console.log("hold asdfas")
    //   }, clickstart);
    //   // console.log(event.touches.length);
    //   // console.log(event)
    //   // clickstart = event.timeStamp;
    //   // console.log (event)
    //   // if (event.timeStamp === 10000) {
    //   //   alert(event.timeStamp);
    //   // }
    //   // if (!flag) {
    //   //   flag = true;
    //   //   setTimeout(function() {
    //   //     flag = false;
    //   //   }, 1000);
    //   //   alert('Test');
    //   // }
    //   // setTimeout('1000');
      
    //   // console.log('test123');
    // })

    // newSound.addEventListener('touchend', (event) => {
    //   console.log('asfdaaaaaaaa sfaaas');
    // })
  //   // newSound.addEventListener('touchstop', () => {
  //   //   clickstop = e.timeStamp - clickstart;
  //   //   if (clickstop >= 2000) 
  //   //     console.log('test32');
  //   //   else
  //   //     console.log('false');
  //   // })
  }
}

function createButtonToLoad(representSounds, allFolders, sounds, allSounds, audios, storageRef) {
  representSounds.textContent = '';
  for (let title of Object.keys(allFolders)) {
    let loadSound = document.createElement("p");
    let removeSound = document.createElement("p");
    let divAfter = document.createElement("div");
    // let folderToDelete = document.createElement("i");
    // let folderAndSoundsToDelete = document.createElement("i");

    loadSound.textContent = `Load ${title}`;
    removeSound.textContent = `Undisplay ${title}`;

    // vll ein Attribut vergeben --> aber selber name für alle
    loadSound.setAttribute("class", "loadButton"); 
    loadSound.setAttribute("id", `${title}Btn`); 
    // removeSound.setAttribute("class", "loadButton"); 
    removeSound.setAttribute("class", "undisplayBtn"); 
    divAfter.setAttribute("class", title);
    // folderToDelete.setAttribute("class", "fas fa-times");
    // folderAndSoundsToDelete.setAttribute("class", "fas fa-times");
    // folderToDelete.style.display = 'none';
    // folderAndSoundsToDelete.style.display = 'none';
    // folderToDelete.setAttribute("class", "deleteSounds");
    // folderAndSoundsToDelete.setAttribute("class", "deleteSounds");

    // loadSound.appendChild(folderToDelete);
    // removeSound.appendChild(folderAndSoundsToDelete);
    representSounds.appendChild(loadSound);
    representSounds.appendChild(removeSound);
    representSounds.appendChild(divAfter)

    loadSound.addEventListener('click', () => {
      let audios2 = {}; 
      pleasePlay(sounds, allSounds, audios, divAfter, title, audios2, storageRef)
      divAfter.style.display = 'flex';
      loadSound.style.display = 'none';
      removeSound.style.display = 'flex';
    })

    removeSound.addEventListener('click', () => {
      divAfter.style.display = 'none';
      loadSound.style.display = 'flex';
      removeSound.style.display = 'none';
    })
    // console.log(title);

    // folderToDelete.addEventListener('click', () => {
    //   storageRef.child(title).delete();
      
      

    //   let desertRef = storageRef.child('sd/Culcha Candela - Von allein.mp3');

    //   // Delete the file
    //   desertRef.delete().then(() => {
    //     console.log('Sucess');
    //     // File deleted successfully
    //   }).catch((error) => {
    //     console.log("error");
    //     // Uh-oh, an error occurred!
    //   });
    // })
  }
  
}


function playSound(audios, event) {
  let checkbox = document.getElementsByTagName('input');
  let isValid = false;
  // console.log(checkbox[0].style.display);
  // logcheckbox[1].style.display === 'none'
  // console.log(checkbox.length);
  // console.log(checkbox[1].type === 'checkbox');
  // console.table(checkbox);
  for (let i = 0; i <= checkbox.length; i++) {
    // console.log(checkbox[i].style.display);
    // console.log(checkbox[i].type);
    if (checkbox[i].type === 'checkbox' && checkbox[i].style.display === 'none') {
      // console.log(checkbox[i]);

      /**
       * Für das man einen neuen Ordner lädt die gecheckten checkboxen erhalten bleiben.
       */
      // const goToDeleteBtn = document.getElementsByClassName('checkboxToDelete');
      // for (let i = 0; i < goToDeleteBtn.length; i++) {
      //   goToDeleteBtn[i].checked = false;
      //   // goToDeleteBtn[i].style.display = 'flex';
      // }
      isValid = true;
      break;
    } else {
      isValid = false;
    }
    break;
    // if (checkbox[i].style.display === 'flex') {
    //   isValid = false;
    // } else if (checkbox[i].style.display === 'none') {
    //   isValid = true;
    // } 
  }

  if (isValid) {
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
  // console.log(document.getElementsByTagName('input')[0].style.display);
  
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