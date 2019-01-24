import imaplib, email, os, time
from textblob import TextBlob

# sets up the authentication
def authenticate(user,password,imap_url):
    con = imaplib.IMAP4_SSL(imap_url)
    con.login(user,password)
    return con

# Analyse the text
def analyse_text(text):
    text = unicode(text, 'utf-8')
    analysis = TextBlob(text)
    polarity =  analysis.sentiment.polarity
    return polarity * 100
    #if analysis.sentiment[0]>0:
     #  return 'Positive'
    #elif analysis.sentiment[0]<0:
     #  return 'Negative'
    #else:
     #  return 'Neutral'

# extracts the body from the email
def get_body(message):
    if message.is_multipart():
        return get_body(message.get_payload(0))
    else:
        return message.get_payload(None,True)

# find the uid of the last email sent
def get_last_uid(con):
    typ, ids = con.uid('search', None, 'ALL')
    ids = ids[0].decode().split()
    heighest_uid = ids[0]
    for id in ids:
        if id > heighest_uid:
            heighest_uid = id
    return heighest_uid
