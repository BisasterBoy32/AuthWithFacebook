from django.core.exceptions import ObjectDoesNotExist
from .models import Profile

def create_profile(backend, user, response, *args, **kwargs):
    # check if there is a profile for this user
    try :
        profile = user.profile
    # if there is no profile create one for this user
    except ObjectDoesNotExist :
        if backend.name == "facebook":
            profile = Profile.objects.create(
                user = user,
                icon = response['picture']['data']['url'],
                # since i cant access the birthday of the facebook user
                # i generate a random one
                born_date = "2000-12-05T12:30"
            )
            profile.save()