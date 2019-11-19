Websocket has been integrated, try it out!

# Introduction
Hello
# Requirements
- Make sure you have: `django, django channels, django rest frame work, django-cors-headers, redis` and `pip install channels_redis` 
 and have redis running. For react make sure you `npm install react-bootstrap bootstrap` and 
  `npm install --save @kennethormandy/react flipcard`

Requirements
Make sure you have django channels, django, django rest frame work, pip install django-webpack-loader ,pip install redis and have it running, pip install django-cors-headers.

- If you are NOT running django on 127.0.0.1:8000 that needs to be reflected in the config file that gives the react app the API route of 
  const API_PATH = 'ws://127.0.0.1:8000/ws/game';
- If you are running react app not on localhost:3000 that must be reflected in the django settings.py file where CORS_ORIGIN_WHITELIST =    ["http://localhost:3000",] modify it accordingly so that axios from react is authenticated and works with Django.

# Let's Get Started

## How to Run it?
  - in MAFIA/ `python manage.py runserver`
  -in front-end `npm start`
  Navigate on your web beowser to where you have your react app(proboably localhost:3000) and you should see our web app!
  You should have react app and django running. Any problems or errors with Django or React? Slack Brandon!

## Technologies Used
- React - Axios and websockets
- Django - Django channels, Django rest framework, django cors headers
- Styling - react-Bootstrap 
