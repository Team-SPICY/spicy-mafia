# chat/consumers.py
from channels.generic.websocket import AsyncWebsocketConsumer
import json
import pyrebase
import random

#link to firebase
config = {
    'apiKey': "AIzaSyBeYE_UDmmz-k3_EuQJu2y5MQab4J2-13E",
    'authDomain': "spicy-mafia.firebaseapp.com",
    'databaseURL': "https://spicy-mafia.firebaseio.com",
    'storageBucket': "spicy-mafia.appspot.com",
}
firebase = pyrebase.initialize_app(config)
db = firebase.database()

'''
Things to do:
add voting receiving and broadcasting function for elimination
'''
class GameConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        print('connecting! ', self.scope)
        self.room_name = self.scope['url_route']['kwargs']['room_name']

        self.room_group_name = 'chat_%s' % self.room_name
        self.username = ''
        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
        print('accepted connection')

    async def disconnect(self, close_code):
        print('self: ',self.username)
        print(close_code)

        isHost = False
        newHost = self.username

        print(len(db.child("lobbies").child(self.room_name).child("players").get().val()))
        #check to see if there are any players left in the lobby
        if (len(db.child("lobbies").child(self.room_name).child("players").get().val()) == 1):
            #delete the entire lobby
            print("DELETING LOBBY")
            db.child("lobbies").child(self.room_name).remove()
        else:
            #save role of removed player
            role = db.child("lobbies").child(self.room_name).child("players").child(self.username).get().val()
            #remove player from db
            print("REMOVING PLAYER FROM DATABASE")
            db.child("lobbies").child(self.room_name).child("players").child(self.username).remove()
            print("THERE ARE MORE PLAYERS LEFT IN THE LOBBY")
            if (role == 'host'):
                print("PLAYER THAT LEFT WAS HOST")
                isHost = True
                newHost = random.choice(list(db.child("lobbies").child(self.room_name).child("players").get().val().keys()))
                print("THE NEW HOST IS " + newHost)
                db.child("lobbies").child(self.room_name).child("players").update({newHost:'host'})

        await self.channel_layer.group_send(
            #broadcast that you have left
            self.room_group_name,
            {
                'type': 'leaving',
                'message': self.username,
                'isHost': isHost,
                'newHost': newHost
            }
            )
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket(from client)
    async def receive(self, *, text_data):
        text_data_json = json.loads(text_data)
        print('received websocket mssg: ',text_data_json)
        #command is a key whose value will be a function(), this is just so that receive function isnt too big
        await self.commands[text_data_json['command']](self, text_data_json)

    #recieve message that player has disconnected
    async def leaving(self, event):
        message = event['message']
        print(f'ln51: user leaving: {message}')

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'command': 'leaving',
            'user': message,
            'isHost': event['isHost'],
            'newHost': event['newHost']
        }))

    #broadcast that new player joined
    async def joining(self, event):
        print('new user joining game')
        username = event['username']
        print('user joining: ',username)

        #send to group(broadcast)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'new_user',
                'username': username
            }
        )

    async def on_accusation(self, event):
        accused = event['accused']

        print(f'sending to layer: {accused}')

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'update_accused',
                'accused': accused,
            }
        )

    async def update_accused(self, event):
        accused = event['accused']

        await self.send(text_data=json.dumps({
            'command': 'update_accused',
            'accused': accused,
        }))

    async def on_trial_vote(self, event):

        playername = event['playername']
        vote = event['vote']

        print(f'sending to layer: {playername} says {vote}')

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'update_trial_votes',
                'playername': playername,
                'vote': vote,
            }
        )

    async def update_trial_votes(self, event):
        playername = event['playername']
        vote = event['vote']

        print(f'sending to users: {playername} says {vote}')

        await self.send(text_data=json.dumps({
            'command': 'update_trial_votes',
            'playername': playername,
            'vote': vote,
        }))

 #broadcast that new vote has been submitted
    async def new_vote(self, event):
        print('new vote :',event)
        voter = event['voter']
        voted = event['voted']
        prev_vote = event['prev_vote']

        #send to group(broadcast)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'send_vote',
                'voter': voter,
                'voted': voted,
                'prev_vote': prev_vote,
            }
        )

    async def set_user(self, event):
        print(f'setting user name! {event}')
        self.username = event['username']

    #receive new user from group(joining() was broadcasted)
    async def new_user(self, event):
        username = event['username']
        print(f'new user recvd: {username}')
        # Send username to WebSocket
        await self.send(text_data=json.dumps({
            'command': 'new_user',
            'username': username
        }))

    '''
    voter : user who voted
    voted : user who was voted to be
    receive : vote from group(send_vote(data) was broadcasted)
    '''
    async def send_vote(self, event):
        print('sending vote to self: ',event , self.username)
        voter = event['voter']
        voted = event['voted']
        prev_vote = event['prev_vote']
        print(f'new vote recvd: {event}')
        # Send username to WebSocket
        await self.send(text_data=json.dumps({
            'command': 'vote',
            'voter': voter,
            'voted': voted,
            'prev_voted': prev_vote,
        }))

    # Receive message from room group
    async def chat_message(self, event):
        print('recieving mssg!')
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))

    async def new_role(self, event):
        users = event['users']
        print('boradcasting role as: ',users[self.username])
        await self.send(text_data=json.dumps({
            'command': 'set_roles',
            'role': users[self.username],
            'roles': users
        }))

    async def set_roles(self, event):
        host_name = event['host_name']
        print(host_name)
        players = db.child("lobbies").child(self.room_name).child("players").get().val()
        player_list = list(players)
        player_list.remove(host_name) #don't reset host
        print("players exluding host: " + str(player_list))
        r_index = random.randint(0, len(player_list)-1)
        random_player = player_list[r_index]
        player_list.remove(random_player)
        db.child("lobbies").child(self.room_name).child("players").update({random_player:"sheriff"})
        r_index = random.randint(0, len(player_list)-1)
        random_player = player_list[r_index]
        player_list.remove(random_player)
        db.child("lobbies").child(self.room_name).child("players").update({random_player:"nurse"})
        length_players = len(players) - 1 #don't count host as a player to set
        num_mafia = 0
        while num_mafia < length_players//3: #just choose some ratio of mafia, can change later
            r_index = random.randint(0, len(player_list)-1)
            random_player = player_list[r_index]
            player_list.remove(random_player)
            db.child("lobbies").child(self.room_name).child("players").update({random_player:"mafia"})
            num_mafia += 1
        #set at least 1 mafia member
        if(num_mafia == 0):
            r_index = random.randint(0, len(player_list)-1)
            random_player = player_list[r_index]
            player_list.remove(random_player)
            db.child("lobbies").child(self.room_name).child("players").update({random_player:"mafia"})
            num_mafia += 1

        db.child("lobbies").child(self.room_name).update({"numMafia":num_mafia})
        db.child("lobbies").child(self.room_name).update({"numOther":length_players - num_mafia})
        players = db.child("lobbies").child(self.room_name).child("players").get().val()
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'new_role',
                'users': dict(players)
            }
        )

    async def new_cycle(self, event):
        cycle = event['cycle']
        print(f'new cycle: {cycle}')
        # Send cycle to cycle_change method on client side to distribute cycles
        await self.send(text_data=json.dumps({
            'command': 'cycle_change',
            'cycle': cycle
        }))

    async def change_cycle(self, event):
        print("change cycle")
        cycle = event['cycle']
        num_mafia = db.child("lobbies").child(self.room_name).child("numMafia").get().val()
        num_civilian = db.child("lobbies").child(self.room_name).child("numOther").get().val()
        print(cycle)
        if cycle == 'Nightime':
            cycle = "Daytime"
        else:
            cycle = "Nightime"
        if num_mafia >= num_civilian:
            cycle = "mafia_win"
        elif num_mafia == 0:
            cycle = "civilian_win"
        #self reference the new cycle method
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'new_cycle',
                'cycle': cycle
            }
        )

    async def resolve_votes(self, event):
        #use this to get the votes from the sheriff, nurse, mafia, civilian etc...
        if event['cycle'] == "Nightime":
            alive_users = event['alive_users']
            og_length = len(alive_users)
            mafia_votes = event['mafia_votes']
            sheriff_votes = event['sheriff_votes']
            sheriff_voted = True
            if len(sheriff_votes) == 0:
                sheriff_voted = False
            if sheriff_voted:
                sheriff_vote = {sheriff_votes[0]: alive_users[sheriff_votes[0]]} # store who the sheriff investigated in case they die
            nurse_votes = event['nurse_votes']
            nurse_voted = True
            if len(nurse_votes) == 0:
                nurse_voted = False
            player_votes = {}
            for m_v in mafia_votes:
                if m_v in player_votes:
                    player_votes[m_v] += 1
                else:
                    player_votes[m_v] = 1
            if len(player_votes) == 0: # mafia never voted, pick a random player to kill
                available_to_kill = []
                for k,v in alive_users.items():
                    if v != 'host' and v != 'mafia':
                        available_to_kill.append(k)
                r_index = random.randint(0, len(available_to_kill)-1)
                player_to_kill = available_to_kill[r_index]
            elif len(player_votes) > 1:
                mafia_votes = sorted(list(player_votes.items()))
                player_to_kill = mafia_votes[-1][0]
            else:
                player_to_kill = mafia_votes[0]
            num_civilian = db.child("lobbies").child(self.room_name).child("numOther").get().val()
            got_killed = {player_to_kill: alive_users[player_to_kill]}
            if len(nurse_votes) == 0 or nurse_votes[0] != player_to_kill:
                num_civilian -= 1
                alive_users.pop(player_to_kill,0)
                db.child("lobbies").child(self.room_name).update({"numOther":num_civilian})
            length_alive = len(alive_users)
            data = {'type': 'update_players', 'alive_players': alive_users}
            if nurse_voted and length_alive == og_length:
                data['mafia_kill'] = False
                data['nurse_saved'] = nurse_votes[0]
            else:
                data['mafia_kill'] = got_killed
                data['nurse_saved'] = False
            if sheriff_voted and list(sheriff_vote.values())[0] == 'mafia':
                data['successful_investigation'] = True
            else:
                data['successful_investigation'] = False
            await self.channel_layer.group_send(
                self.room_group_name,
                data
            )
        else:
            accused_player = event['accused_player']
            alive_users = event['alive_users']
            accused_role = alive_users[accused_player]

            if ( accused_role == 'mafia'):
                num_mafia = db.child("lobbies").child(self.room_name).child("numMafia").get().val()
                num_mafia -= 1
                db.child("lobbies").child(self.room_name).update({'numMafia': num_mafia})
            else:
                num_civilian = db.child("lobbies").child(self.room_name).child("numOther").get().val()
                num_civilian -= 1
                db.child("lobbies").child(self.room_name).update({'numOther': num_civilian})

            alive_users.pop(accused_player)

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'update_players_day',
                    'alive_players': alive_users,
                }
            )

    async def update_players_day(self, event):
        alive_users = event['alive_players']
        #send to client side
        await self.send(text_data=json.dumps({
            'command': 'update_alive_day',
            'alive_users': alive_users
        }))


    async def update_players(self, event):
        mafia_kill = event['mafia_kill']
        successful_investigation = event['successful_investigation']
        alive_users = event['alive_players']
        #send to client side
        await self.send(text_data=json.dumps({
            'command': 'update_alive',
            'mafia_kill': mafia_kill,
            'successful_investigation': successful_investigation,
            'alive_users': alive_users
        }))

    #key-values so receiveing function knows what to do, map a command to a function
    commands = {
        'new_message': chat_message,
        'leaving': leaving,
        'joining': joining,
        'set_user': set_user,
        'send_vote':send_vote,
        'change_cycle': change_cycle,
        'set_roles': set_roles,
        'new_vote': new_vote,
        'on_accusation': on_accusation,
        'on_trial_vote': on_trial_vote,
        'resolve_votes': resolve_votes
    }
