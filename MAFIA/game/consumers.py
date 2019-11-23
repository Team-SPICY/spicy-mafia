# chat/consumers.py
from channels.generic.websocket import AsyncWebsocketConsumer
import json
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

        #put a pyrebase function to insert new player into room

        #send to group(broadcast)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'new_user',
                'username': username
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
        voter = event['voter']
        voted = event['voted']
        print(f'new vote recvd: {event}')
        # Send username to WebSocket
        await self.send(text_data=json.dumps({
            'command': 'vote',
            'voter': voter,
            'voted': voted
        }))

    # Receive message from room group
    async def chat_message(self, event):
        print('recieving mssg!')
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))

    #key-values so receiveing function knows what to do
    commands = {
        'new_message': chat_message,
        'leaving': leaving,
        'joining': joining,
        'set_user': set_user,
        'send_vote':send_vote,
    }
