// Initialize Firebase
const config = {
  apiKey: "AIzaSyB5gHyVWGPEivtJicquZyq2mFM0eN-ZLLQ",
  authDomain: "watson-mail.firebaseapp.com",
  databaseURL: "https://watson-mail.firebaseio.com",
  projectId: "watson-mail",
  storageBucket: "",
  messagingSenderId: "674603498961"
};
firebase.initializeApp(config)

const signin = document.getElementById('signin')

signin.addEventListener('click', () => {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
    document.location.href = '../dashboard/dashboard.html';
  }).cath(error => {
    if(error != null) {
      console.log(error.message)
      return
    }
  })
})
