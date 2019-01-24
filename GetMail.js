const {PythonShell} = require('python-shell')

const options = {
  pythonPath: 'python',
  mode: 'text',
  pythonOptions: ['-u'],
  scriptPath: './'
}

const card = (header, body) => {
  return `
    <details>
      <summary>${header}</summary>
      <p>${body}</p>
    </details>
    `
}

const get = new PythonShell('mail.py', options)
get.on('message',(message) => {
  processMail(message)
})

const processMail = (message) => {
  let emailstring = message
  emailjson = JSON.parse(emailstring)

  document.getElementById('mail').innerHTML += card(emailjson.email.header, emailjson.email.body)
}
