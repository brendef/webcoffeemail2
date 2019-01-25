const {PythonShell} = require('python-shell')

const options = {
  pythonPath: 'python',
  mode: 'text',
  pythonOptions: ['-u'],
  scriptPath: './'
}

const card = (from, header, body, sentiment, border) => {
  return `
      <details>
        <summary style="border: 1px solid ${color};>
          <span class="from">${from}</span>
          <br>
          ${header}
        </summary>
        <p class="body">${body}</p>
        <p class="sentiment">polarity: ${sentiment}</p>
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

  let border
  if (emailjson.email.sentiment > 0) {
    color = 'green'
  } else if (emailjson.email.sentiment < 0 ) {
    color = '#ff636b'
  } else {
    color = 'yellow'
  }

  theParent = document.getElementById("mail")
  theKid = document.createElement("div")
  theKid.innerHTML = card(
    emailjson.email.from,
    emailjson.email.header,
    emailjson.email.body,
    emailjson.email.sentiment,
    color
  )
  theParent.appendChild(theKid)
  theParent.insertBefore(theKid, theParent.firstChild)
}
