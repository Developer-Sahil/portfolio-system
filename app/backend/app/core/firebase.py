import firebase_admin
from firebase_admin import credentials, firestore
import os

# Initialize Firebase Admin
import json

# Initialize Firebase Admin
cred_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "serviceAccountKey.json")

if not firebase_admin._apps:
    try:
        if os.path.exists(cred_path):
            print(f"Loading Firebase credentials from {cred_path}")
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred)
        elif os.getenv("FIREBASE_CREDENTIALS"):
            print("Loading Firebase credentials from FIREBASE_CREDENTIALS env var")
            import json
            import base64
            import binascii

            creds_val = os.getenv("FIREBASE_CREDENTIALS")
            
            try:
                # Try parsing as JSON first
                cred_dict = json.loads(creds_val)
            except json.JSONDecodeError:
                try:
                    # If JSON fails, try Base64 decoding
                    decoded_val = base64.b64decode(creds_val).decode("utf-8")
                    cred_dict = json.loads(decoded_val)
                except (binascii.Error, json.JSONDecodeError) as e:
                    print(f"Failed to decode FIREBASE_CREDENTIALS: {e}")
                    raise e

            cred = credentials.Certificate(cred_dict)
            firebase_admin.initialize_app(cred)
        else:
            print("Loading Firebase credentials from Application Default Credentials")
            firebase_admin.initialize_app()
            
        print("Firebase Admin initialized successfully")
    except Exception as e:
        print(f"Error initializing Firebase Admin: {e}")
        # Critical error: App cannot run without Database
        raise e

db = firestore.client()
