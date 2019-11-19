from game.api.viewsets import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register('lobby', LobbyViewSet, base_name='lobby')