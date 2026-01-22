from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import EmailStr
from typing import List
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

class EmailService:
    def __init__(self):
        self.enabled = False
        try:
            username = os.getenv("MAIL_USERNAME")
            password = os.getenv("MAIL_PASSWORD")
            
            # Prevent Pydantic validation error if password is missing/None
            if not password:
                print("WARNING: MAIL_PASSWORD not set. Email service disabled.")
                self.conf = None
                return

            self.conf = ConnectionConfig(
                MAIL_USERNAME = username,
                MAIL_PASSWORD = password,
                MAIL_FROM = os.getenv("MAIL_FROM"),
                MAIL_PORT = int(os.getenv("MAIL_PORT", 587)),
                MAIL_SERVER = os.getenv("MAIL_SERVER"),
                MAIL_STARTTLS = True,
                MAIL_SSL_TLS = False,
                USE_CREDENTIALS = True,
                VALIDATE_CERTS = True
            )
            self.enabled = True
        except Exception as e:
            print(f"WARNING: EmailService failed to initialize: {e}")
            self.conf = None

    async def send_email(self, subject: str, recipients: List[EmailStr], body: str):
        if not self.enabled or not self.conf:
            print("EmailService is disabled. Skipping email.")
            return

        message = MessageSchema(
            subject=subject,
            recipients=recipients,
            body=body,
            subtype=MessageType.html
        )

        fm = FastMail(self.conf)
        await fm.send_message(message)

email_service = EmailService()
