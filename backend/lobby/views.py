from django.shortcuts import render
import string
import random
import pyrebase

#link to firebase
config = {
    'apiKey': "AIzaSyBeYE_UDmmz-k3_EuQJu2y5MQab4J2-13E",
    'authDomain': "spicy-mafia.firebaseapp.com",
    'databaseURL': "https://spicy-mafia.firebaseio.com",
    'storageBucket': "spicy-mafia.appspot.com",
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()

def create_lobby(request):
    ''' Creates a new lobby entrance on firebase.

    Args:
        request (Enum): Type of request.

    Return:
        None

    '''
    if request.POST:
        all_chars = string.ascii_letters + string.ascii_digits
        id = ''
        retry = 0
        while retry < 10:
            #create random ID
            for i in range(4):
                r_int = random.randint(0, len(all_chars))
                id += all_chars[r_int]
            lobby = db.child("lobby_id").order_by_child("id").equal_to(id).get()
            #check for existence here
            if not lobby:
                data = {"lobby_id": id}
                db.child("lobby_id").push(data)
                break
            retry += 1

def get_lobby(request):
    ''' TODO: docstring '''
    if request.GET:
        id = request.GET.get('id')
        lobby = db.child("lobby_id").order_by_child("id").equal_to(id).get()
        #pass above to some template or return
