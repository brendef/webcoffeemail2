// Initialize Firebase
// Insert Firebase Config Here 
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
