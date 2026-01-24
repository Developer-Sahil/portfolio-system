import firebase_admin
from firebase_admin import credentials, firestore
import os

# Initialize Firebase Admin
# Initialize Firebase Admin
cred_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "serviceAccountKey.json")

if not firebase_admin._apps:
    try:
        if os.path.exists(cred_path):
            print(f"Loading Firebase credentials from {cred_path}")
            cred = credentials.Certificate(cred_path)
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
