import httpx
import os
from typing import List
from pydantic import EmailStr
from dotenv import load_dotenv

load_dotenv()

class EmailService:
    def __init__(self):
        self.endpoint = os.getenv("FORMSPREE_ENDPOINT")
        if not self.endpoint:
            print("WARNING: FORMSPREE_ENDPOINT not set. Email service disabled.")

    async def send_email(self, subject: str, recipients: List[str], body: str):
        if not self.endpoint:
            print("EmailService is disabled. Skipping email.")
            return False

        # Formspree typically expects a flat dict of fields
        # adjusting payload to match common Formspree patterns
        payload = {
            "subject": subject,
            "message": body, # Or parse body if it's HTML, but Formspree handles basic text/html well enough
            "_replyto": recipients[0] if recipients else None
            # You can add more fields if your form expects them
        }

        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(self.endpoint, json=payload)
                if response.status_code >= 400:
                   print(f"Failed to send email via Formspree: {response.status_code} {response.text}")
                   return False
                return True
            except Exception as e:
                print(f"Error sending email via Formspree: {e}")
                return False

email_service = EmailService()
