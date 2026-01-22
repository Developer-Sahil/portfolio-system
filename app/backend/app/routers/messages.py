from fastapi import APIRouter, HTTPException
from typing import List
from datetime import datetime
from app.models.content import Message, MessageCreate
from app.core.firebase import db
import uuid

router = APIRouter()

from app.core.email import email_service
import os

@router.post("/", response_model=Message)
async def create_message(message: MessageCreate):
    doc_ref = db.collection(u'messages').document()
    message_dict = message.dict()
    message_dict['id'] = doc_ref.id
    message_dict['createdAt'] = datetime.utcnow().isoformat() + "Z"
    message_dict['read'] = False
    
    doc_ref.set(message_dict)

    # Send Email Notification
    try:
        subject = f"New Portfolio Inquiry: {message.type} from {message.name}"
        body = f"""
        <h2>New Message</h2>
        <p><strong>Name:</strong> {message.name}</p>
        <p><strong>Email:</strong> {message.email}</p>
        <p><strong>Company:</strong> {message.company}</p>
        <p><strong>Type:</strong> {message.type}</p>
        <p><strong>Message:</strong></p>
        <p>{message.message}</p>
        """
        dest_email = os.getenv("MAIL_USERNAME")
        if dest_email:
             await email_service.send_email(subject, [dest_email], body)
    except Exception as e:
        print(f"Failed to send email: {e}")
        # Log error but don't fail the request
    
    return message_dict
