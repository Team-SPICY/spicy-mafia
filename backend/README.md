
***FOR DEVELOPERS ONLY***

Instructions to Add An App:

1. Type in django-admin startapp [name of app]
2. Go to backend/settings.py and update the INSTALLED_APPS section by adding the
   name of the app to the list in INSTALLED_APPS.

Instructions to update the model that will be stored in the database for Django

1. After updating models.py, run these commands: django-admin makemigrations [app name] and 
   django-admin migrate [app name]

Instructions to Add Additional API's

1. Install the api's first
2. Then add the api's associated titles to the INSTALLED_APPS list in settings.py


