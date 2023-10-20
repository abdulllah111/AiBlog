from httpx import HTTPError
import g4f
import json
import openai
import requests



from g4f.Provider import (

    Acytoo,
    AiAsk,
    Ails,
    AItianhuSpace,
    ChatBase,
    Chatgpt4Online,
    Phind, #good
)

from g4f.models import (
    gpt_35_long,
    gpt_35_turbo,
)
# 1087968824

def Generate(context):
    g4f.logging = True # enable logging
    g4f.check_version = False # Disable automatic version checking
    print(g4f.Provider.Ails.params) 
    try:
        response = g4f.ChatCompletion.create(
            # model="gpt-3.5-turbo",
            model = gpt_35_turbo,
            messages=context,
            provider=Phind
        )

    except Exception as e:
        print('Request error')
        # return
        response = "Error...  \nИсключение: " + str(e)
    print(response)
    return response