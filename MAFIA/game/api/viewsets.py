from django.shortcuts import render
import string
import random
import pyrebase
from rest_framework import viewsets
from rest_framework.response import Response
import json
from rest_framework.decorators import action
from rest_framework.exceptions import APIException
#link to firebase
config = {
    'apiKey': "AIzaSyBeYE_UDmmz-k3_EuQJu2y5MQab4J2-13E",
    'authDomain': "spicy-mafia.firebaseapp.com",
    'databaseURL': "https://spicy-mafia.firebaseio.com",
    'storageBucket': "spicy-mafia.appspot.com",
}
firebase = pyrebase.initialize_app(config)
db = firebase.database()

class LobbyViewSet(viewsets.ViewSet):
    def list(self, request):
        #query all lobbys
        #return Response(json response of database query)
        lobbies = db.child('lobbies').get().val()
        #return Response(json.dumps(['lobby', lobbies]))
        return Response(lobbies)
    
    def retrieve(self, request, pk=None):
        #lobby = db.child("lobby").order_by_child('code').equal_to('AAAA').get().val()
        lobby_keys = db.child('lobbies').shallow().get().val()
        if pk in lobby_keys:
            return Response(db.child('lobbies/' + pk).get().val())
        else:
            #decide on what the return value should be, for now just return empty
            return Response([{'empty':None}])

    def create(self, request):
        lobby_keys = db.child('lobbies').shallow().get().val()
        all_chars = string.ascii_letters + string.digits
        id = ''
        retry = 0
        while retry < 10:
            #create random ID
            for i in range(4):
                r_int = random.randint(0, len(all_chars)-1)
                id += all_chars[r_int]
            #check for existence here
            if id not in lobby_keys:
                break
            id = ''
            retry += 1
        data ={"lobbies/" + id: {"numMafia": 0, "numOther": 0, 'players': {0:None}}}
        db.update(data)
        #we can change this line below, but keep it for now until we figure out 
        # what out player objects are going to look like in the database
        data = {"lobbies/" + id + "/players": {0:""}}
        db.update(data)
        #return a response of the created lobby id so the front end can start the game
        return Response([{'lobby_id':id}])