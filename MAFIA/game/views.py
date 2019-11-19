# game/views.py
from django.core.exceptions import PermissionDenied
from django.shortcuts import render, redirect
from django.utils.safestring import mark_safe
import json
from .forms import JoinGameForm

def index(request):
    if request.method == 'POST':
        form = JoinGameForm(request.POST)
        if form.is_valid():
            #check if game is valid
            print(form.cleaned_data)
            username = form.cleaned_data['username']
            pin = form.cleaned_data['game_pin']
            return redirect(f'{pin}/{username}')
    form = JoinGameForm()

    return render(request, 'game/lobby.html', {'Title':'MAFIA', 'form':form})

def room(request, room_name, username):
    print('request: ', request)
    return render(request, 'game/game.html', {
            'room_name_json': mark_safe(json.dumps(room_name)),
            'username_json': mark_safe(json.dumps(username))
        })

#this should be hit by a ajax request to fetch the users that are present in the 
#game room
def fetchUsers(request, room_name):
    #hit pyrebase api
    data = {
        'users':['user1','user1','bob']
    }
    return data