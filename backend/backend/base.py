import pyrebase

config = {
    "apiKey": "AIzaSyBeYE_UDmmz-k3_EuQJu2y5MQab4J2-13E",
    "authDomain": "spicy-mafia.firebaseapp.com",
    "databaseURL": "https://spicy-mafia.firebaseio.com",
    "storageBucket": "spicy-mafia.appspot.com"
}

firebase = pyrebase.initialize_app(config)
