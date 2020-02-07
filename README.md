# django_project_boilerplate

A boilerplate Django and React project with user model
the user can create account or login with facebook or gmail

Steps:

1. Pull this repository
2. Create a virtualenv and install dependencies with `pip install -r requirements.txt`
4. Rename your project with `python manage.py rename yourprojectname`
5. install all dependencies for your frontend app with `npm install`

in this project I used React Facebook Login and Reacte Google Login
those libraries are using oauth2 to get an access token from the provider (Google , Facebook)
and then pass it to the backend to allow it to access his account
in the backend i used django-rest-framework-social-oauth2 to communicate with the 
the provider and get the user information and after that create a user instance
or update it if there is a one based on the information that i get from the provider finally 
i generate a token with django-knox and pass it to the frontend to authenticate this user
 