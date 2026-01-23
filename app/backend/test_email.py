import asyncio
import os
from app.core.email import email_service
from dotenv import load_dotenv

async def test():
    load_dotenv()
    print("Testing Formspree Email Service...")
    
    endpoint = os.getenv('FORMSPREE_ENDPOINT')
    print(f"Endpoint Configured: {'Yes' if endpoint else 'No'}")
    
    if not endpoint:
        print("Please set FORMSPREE_ENDPOINT in .env")
        return

    print("Sending test email...")
    success = await email_service.send_email(
        "Test Email from Portfolio",
        ["sahilsharmamrp@zohomail.com"], # This acts as reply-to in the new logic
        "<h1>This is a test message via Formspree</h1>"
    )
    
    if success:
        print("SUCCESS: Email sent to Formspree!")
    else:
        print("FAILURE: Could not send email.")

if __name__ == "__main__":
    asyncio.run(test())
