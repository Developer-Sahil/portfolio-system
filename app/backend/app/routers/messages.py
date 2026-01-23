from fastapi import APIRouter, HTTPException, Request
from typing import List
from datetime import datetime
from app.models.content import Message, MessageCreate
from app.core.firebase import db
from app.core.limiter import limiter
import uuid

router = APIRouter()

from app.core.email import email_service
import os

@router.post("/", response_model=Message)
@limiter.limit("5/minute")
async def create_message(request: Request, message: MessageCreate):
    doc_ref = db.collection(u'messages').document()
    message_dict = message.dict()
    message_dict['id'] = doc_ref.id
    message_dict['createdAt'] = datetime.utcnow().isoformat() + "Z"
    message_dict['read'] = False
    
    doc_ref.set(message_dict)

    # Send Email Notification (Formspree)
    # We pass the visitor's email as the recipient so it's used as the Reply-To header
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
        
        await email_service.send_email(subject, [message.email], body)
    except Exception as e:
        print(f"Failed to trigger email notification: {e}")
        # Log error but don't fail the request
    
    return message_dict
