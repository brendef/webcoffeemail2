const {PythonShell} = require('python-shell')

const options = {
  pythonPath: 'python',
  mode: 'text',
  pythonOptions: ['-u'],
  scriptPath: './'
}

const card = (from, header, body, sentiment) => {
  return `
    <details>
      <summary>
        <span class="from">${from}</span>
        <br>
        ${header}
      </summary>

      <p class="body">${body}</p>
      <p class="sentiment">${sentiment}</p>
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

  document.getElementById('mail').innerHTML += card(
    emailjson.email.from,
    emailjson.email.header,
    emailjson.email.body,
    emailjson.email.sentiment
  )
}
