from django.shortcuts import render
import string
import random
import pyrebase
from rest_framework import viewsets
from rest_framework.response import Response
import json
from rest_framework.decorators import action
from rest_framework.exceptions import APIException
from rest_framework.views import exception_handler

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
        # Quiz questions
        # quizQ = {0: 'Which player should take a shot?',
                #1: 'Which player should finish their drink?',
                #2: 'Which player is most likely to accidentaly give away their role?',
                #3: 'Which player has the highest GPA?',
                #4: 'Which player is most likely to get blacked out playing Mafia?',
                #5: 'Which player is most likely to get called out by Gary for talking in class',
                #6: 'Which player is most likely to sleep through their CSE110 final exam?',
                #7: 'Which player has a scret crush on Gary G.?',
                #8: 'Which player has the prettiest eyes?',
                #9: 'Which player has the best smile?',
                #10: 'Which player gets to choose another player to take a shot?',
                #11: 'Which player is most likely to fail CSE 3 because they forgot they were taking it?',
                #12: 'Which player is most likely to forget what a binary search tree is during an interview?',
                #13: 'Which player is most likely to get a job offer from Google?',
                #14: 'Which player should take two shots?',
                #15: 'Which player is most likely to move out of their apartment and into the CSE basement labs?',
                #16: 'Which player has the biggest meatballs?',
                #17: 'Which player is most likely to put a horse head in your bed?',
                #18: 'Which player is most likely to actually use bubble sort?',
                #19: 'Which player is most likely to push their code before testing it?'}

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
        data ={"lobbies/" + id: {"numMafia": 0, "numOther": 0, 'isActive': False}}
        #when a user presses create game, they are automatically assinged to be the host
        if request.data['user']:
            data["lobbies/" + id]['players'] = {request.data['user']: "host"}
        db.update(data)
        #we can change this line below, but keep it for now until we figure out
        # what out player objects are going to look like in the database
        #return a response of the created lobby id so the front end can start the game
        return Response({'lobby_id':id})

    def update(self, request, pk=None):
        lobby_keys = db.child('lobbies').shallow().get().val()
        if pk in lobby_keys:
            if 'user' in request.data:
                user = request.data['user']
                keys = db.child('lobbies/' + pk + '/players').get().val()
                if user in keys:
                    return Response({"is_valid_user":False})#username already present
                else:
                    #data = {"lobbies/" + pk + "/players": {user:"civilian"}}
                    data = {user:"civilian"}
                    db.child('lobbies').child(pk).child('players').update(data)
                    #db.update(data)
                    return Response({"is_valid_user": True})
            elif 'start_game' in request.data:
                game_bool = request.data['start_game']
                data = {'isActive': True}
                db.child('lobbies').child(pk).update(data)
                return Response({"game_activated": True})

    def delete(self, request, pk=None):
        if not pk:
            #raise/return some exception here, please just dont call this
            print("raise some error")
            return MethodNotAllowed()
        lobby_keys = db.child('lobbies').shallow().get().val()
        if pk in lobby_keys:
            db.child('lobbies').child(pk).remove()
            return Response({"deleted_lobby": pk})
        else:
            return MethodNotAllowed()
