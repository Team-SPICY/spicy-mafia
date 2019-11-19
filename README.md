Websocket has been integrated, try it out!

Introduction

Requirements
Make sure you have django channels, django, django rest frame work, pip install django-webpack-loader ,pip install redis and have it running, pip install django-cors-headers.

- If you are running django not on 127.0.0.1:8000 that needs to be reflected in the config file that gives the API route of 
  const API_PATH = 'ws://127.0.0.1:8000/ws/game';
- If you are running react app not on localhost:3000 that must be reflected in the django settings.py file where CORS_ORIGIN_WHITELIST =    ["http://localhost:3000",] modify it accordingly so that axios from react is authenticated.

Let's Get Started

How to Run it?
  python manage.py runserver
  npm start
  Navigate on your web beowser to where you have your react app(proboably localhost:3000) and you should see our web app!
  You should have react app and django running. Any problems? Slack Brandon!

Technologies Used
React - Axios and websockets
Django - Django channels, Django rest framework, django cors headers
Styling - react-Bootstrap 
