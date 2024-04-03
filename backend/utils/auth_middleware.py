from functools import wraps
import jwt
from flask import request, current_app
from config import app
import os

from utils.send_response import send_response

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]
        if not token:
            return send_response('Token Not Provided', 401)
        try:
            user_email=jwt.decode(token, options={"verify_signature": False})

            if not user_email:
                return send_response('Invalid Token', 402)

        except Exception as e:
            return send_response('Token Expired', 401)

        return f(user_email, *args, **kwargs)
    return decorated
