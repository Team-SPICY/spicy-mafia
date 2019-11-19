# chat/routing.py
from django.urls import re_path

from . import consumers
#route your react api to this url path so it can be consumed, yum
websocket_urlpatterns = [
    re_path(r'ws/game/(?P<room_name>\w+)/$', consumers.GameConsumer),
]