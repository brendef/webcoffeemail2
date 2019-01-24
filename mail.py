# imports
import imaplib, email, os, time, sys, json
from textblob import TextBlob
from email.parser import HeaderParser
from py_functions import *

# email credidentials
user = 'brendan.defaria@gmail.com'
password = 'W0ch4_etppe#'
imap_url = 'imap.gmail.com'

# becomes true when the user presses start
program_running = True

# stores email in json format
emailjson = {}

# get email address of person who sent the email
def get_sender(id):
    result, data = con.uid("FETCH",id,"(BODY[HEADER.FIELDS (FROM)])")
    sender = data[0][1]
    return sender

# get the emails subject line
def get_header(id):
    result, data = con.uid("FETCH",id,"(BODY[HEADER.FIELDS (SUBJECT)])")
    header = data[0][1]
    return header

# get the email that has been requested by its uid
def get_mail(mail_uid):
    result, data = con.uid('fetch',mail_uid,'(RFC822)')
    raw = email.message_from_string(data[0][1])
    text = get_body(raw)
    emailjson['email'] = {
        'from': str(get_sender(mail_uid)),
        'header': str(get_header(mail_uid)),
        'body':  str(get_body(raw)),
        'sentiment': str(analyse_text(text))
    }
    fullmail = json.dumps(emailjson)
    print fullmail

#program starts here (technically)
con = authenticate(user,password,imap_url)
con.select('INBOX')
last_uid = get_last_uid(con)

while program_running:
    result, data = con.uid('fetch',last_uid,'(RFC822)')
    if data != [None]:
        get_mail(last_uid)
        last_uid = int(last_uid) + 1
