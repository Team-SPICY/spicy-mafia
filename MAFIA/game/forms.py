from django import forms

class JoinGameForm(forms.Form):
    game_pin = forms.CharField(label='Enter game pin', max_length=5)
    username = forms.CharField(label='Your name', max_length=10)