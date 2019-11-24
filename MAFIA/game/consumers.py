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
        db.child("lobbies").child(self.room_name).child("players").child(self.username).remove()
        await self.channel_layer.group_send(
            #broadcast that you have left
            self.room_group_name,
            {
                'type': 'leaving',
                'message': self.username,
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

        #put a pyrebase function to remove self.username into room
        print('pyrebase do something')

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'command': 'leaving',
            'user': message
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
        await self.send(text_data=json.dumps({
            'command': 'set_roles',
            'role': users[self.username],
            'roles': users
        }))

    async def set_roles(self, event):
        host_name = event['host_name']
        print(host_name)
        players = db.child("lobbies").child(self.room_name).child("players").get().val()
        player_list = list(players) #first index is host so we wont set that
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
        

    #key-values so receiveing function knows what to do
    commands = {
        'new_message': chat_message,
        'leaving': leaving,
        'joining': joining,
        'set_user': set_user,
        'send_vote':send_vote,
        'change_cycle': change_cycle,
        'set_roles': set_roles,
        'new_vote': new_vote,
    }
