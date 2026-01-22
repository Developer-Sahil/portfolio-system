import asyncio
import os
from app.core.email import email_service
from dotenv import load_dotenv

async def test():
    load_dotenv()
    print("Testing Email Configuration...")
    print(f"Username: {os.getenv('MAIL_USERNAME')}")
    print(f"Port: {os.getenv('MAIL_PORT')}")
    
    try:
        await email_service.send_email(
            "Test Email",
            [os.getenv("MAIL_USERNAME")],
            "<h1>This is a test email</h1>"
        )
        print("Email sent successfully!")
    except Exception as e:
        print(f"Error sending email: {e}")

if __name__ == "__main__":
    asyncio.run(test())
