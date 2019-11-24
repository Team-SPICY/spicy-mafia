import config from '../../../frontend/src/config';

class WebSocketService {
    static instance = null;
    callbacks = {};

    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    constructor() {
        this.socketRef = null;
    }

    connect(username, roomID) {
        console.log(username, roomID)
        // This is important, this is how websockets connects with django channels
        const path = `${config.API_PATH}/${roomID}/`;
        console.log('path:', path)
        this.socketRef = new WebSocket(path);
        this.socketRef.onopen = () => {
            console.log(`WebSocket open for ${username} in room ${roomID}`);
            //set username
            this.sendMessage({
                'command': 'set_user',
                'username': username
            });
        };
        //recieve message from websocket
        this.socketRef.onmessage = e => {
            this.socketNewMessage(e.data);
        };

        this.socketRef.onerror = e => {
            console.log(e.message);
        };

        this.socketRef.onclose = () => {
            console.log("WebSocket closed let's reopen");
            this.connect(username, roomID);
        };
    }

    socketNewMessage(data) {
        const parsedData = JSON.parse(data);
        const command = parsedData.command;
        console.log('new websocket mssg from self: ', parsedData);

        console.log(command, parsedData)
        if (Object.keys(this.callbacks).length === 0) {
            return;
        }
        if (command === 'new_user') {
            this.callbacks[command](parsedData.username);
        }
        if (command === 'vote') {
            console.log('vote recieved: ', parsedData);
            this.callbacks[command](parsedData);
        }
        if (command === 'cycle_change') {
            this.callbacks[command](parsedData.cycle);
        }
        if (command === 'set_roles') {
            this.callbacks[command](parsedData.role, parsedData.roles)
        }
        if (command === 'leaving') {
            this.callbacks[command](parsedData.user);
        }
    }

    //should only be called in the begining when websocket first opened with new user
    joining(username) {
        console.log('sending message to websokcet to broadcast')
        this.sendMessage({ command: 'joining', 'username': username });
    }

    sendVote(data) {
        this.sendMessage(data);
        console.log('websokcet sending vote: ', data);
    }

    newChatMessage(message) {
        this.sendMessage({ command: 'new_message', from: message.from, text: message.text });
    }

    addCallbacks(voteCallBack, cycleChangeCallBack, newUserCallBack, disconnectCallBack, roleCallBack) {
        this.callbacks['cycle_change'] = cycleChangeCallBack;
        this.callbacks['vote'] = voteCallBack;
        this.callbacks['new_user'] = newUserCallBack;
        this.callbacks['leaving'] = disconnectCallBack;
        this.callbacks['set_roles'] = roleCallBack;
    }
    //send data to websocket in consumers.py
    sendMessage(data) {
        console.log('sending message: ', data)
        try {
            this.socketRef.send(JSON.stringify({ ...data }));
        }
        catch (err) {
            console.log(err.message);
        }
    }

    state() {
        return this.socketRef.readyState;
    }


    waitForSocketConnection(callback) {
        const socket = this.socketRef;
        const recursion = this.waitForSocketConnection;
        setTimeout(
            function () {
                if (socket.readyState === 1) {
                    console.log("Connection is made")
                    if (callback != null) {
                        callback();
                    }
                    return;

                } else {
                    console.log("wait for connection...")
                    recursion(callback);
                }
            }, 1); // wait 5 milisecond for the connection...
    }

}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;