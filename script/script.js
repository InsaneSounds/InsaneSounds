window.addEventListener('load', () => {
    document.getElementById('userIcon').addEventListener('click', () => {
        hideAll();
        document.getElementById('signInWrapper').style.display = 'flex';
    })

    document.getElementById('goToSounds').addEventListener('click', () => {
        hideAll();
        document.getElementById('soundboardWrapper').style.display = 'flex';
    })

    document.getElementById('goToNewSounds').addEventListener('click', () => {
        hideAll();
        document.getElementById('uploadWrapper').style.display = 'flex';
    })

    document.getElementById('goToSignUp').addEventListener('click', () => {
        hideAll();
        document.getElementById('signUpWrapper').style.display = 'flex';
    })

    document.getElementById('goToSignIn').addEventListener('click', () => {
        hideAll();
        document.getElementById('signInWrapper').style.display = 'flex';
    })
})

function hideAll() {
    document.getElementById('signInWrapper').style.display = 'none';
    document.getElementById('signUpWrapper').style.display = 'none';
    document.getElementById('soundboardWrapper').style.display = 'none';
    document.getElementById('uploadWrapper').style.display = 'none';
}