# Introduction
Spicy-Mafia is an online game developed by team SPICY. Like party games such as Werewolf and Mafia, Spicy-Mafia is basically about a group of people looking for the killer(s) before the number of killers matches that of themselves. That group of people include civilians, a sheriff, and a nurse. All of this is narrated by a narrator who uses their story-telling skills to weave an intriguing and hilarious story. However, its lobby system, game mechanics, and role distribution system addresses the issues found in those games such as keeping track of statistics and voting, managing time, and cheating.

# Requirements
- Make sure you have: `django, django channels, django restframework, django-cors-headers, django-webpack-loader, redis(https://redis.io/topics/quickstart), pyrebase` and `pip install channels_redis`
 and have redis running. For react make sure you `npm install react-bootstrap bootstrap` and
  `npm install --save @kennethormandy/react-flipcard`



- If you are NOT running django on 127.0.0.1:8000 that needs to be reflected in the config file that gives the react app the API route of
  const API_PATH = 'ws://127.0.0.1:8000/ws/game';
- If you are running react app not on localhost:3000 that must be reflected in the django settings.py file where CORS_ORIGIN_WHITELIST =    ["http://localhost:3000",] modify it accordingly so that axios from react is authenticated and works with Django.

# Let's Get Started

## How to Run it?
  - in MAFIA/ `python manage.py runserver`
  -in front-end `npm start`
  Navigate on your web browser to where you have your react app(probably localhost:3000) and you should see our web app!
  You should have react app and Django running. Any problems or errors with Django or React? Slack Brandon!

## Technologies Used
- React - Axios and websockets
- Django - Django channels, Django rest framework, django cors headers
- Styling - react-Bootstrap

# Contact

Charles Xiong- Project Manager (c5xiong@ucsd.edu)

Jacob Doering-Powell - Software Development Lead (jdoering@ucsd.edu)

Brandon Gonzalez - Software Architect (brg029@ucsd.edu)

Thuc Phan - User Interface Specialist (tcp004@ucsd.edu)
