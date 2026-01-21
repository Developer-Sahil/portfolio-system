import firebase_admin
from firebase_admin import credentials, firestore
import os

# Initialize Firebase Admin
cred_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "serviceAccountKey.json")

if not firebase_admin._apps:
    try:
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
        print("Firebase Admin initialized successfully")
    except Exception as e:
        print(f"Error initializing Firebase Admin: {e}")
        # For development/testing without key, we might want to skip or raise
        pass

db = firestore.client()
