from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.models.content import ArenaThread, ArenaThreadCreate
from app.core.firebase import db
from app.dependencies import get_current_user

router = APIRouter()

@router.post("/", response_model=ArenaThread)
def create_thread(thread: ArenaThreadCreate, user=Depends(get_current_user)):
    doc_ref = db.collection(u'arena').document()
    thread_dict = thread.dict()
    thread_dict['id'] = doc_ref.id
    if thread_dict.get('publishedAt'):
         thread_dict['publishedAt'] = thread_dict['publishedAt'].isoformat()
    doc_ref.set(thread_dict)
    return thread_dict

@router.get("/", response_model=List[ArenaThread])
def read_threads():
    docs = db.collection(u'arena').stream()
    return [doc.to_dict() for doc in docs]

@router.get("/{thread_id}", response_model=ArenaThread)
def read_thread(thread_id: str):
    doc_ref = db.collection(u'arena').document(thread_id)
    doc = doc_ref.get()
    if doc.exists:
        return doc.to_dict()
    else:
        raise HTTPException(status_code=404, detail="Thread not found")

@router.put("/{thread_id}", response_model=ArenaThread)
def update_thread(thread_id: str, thread: ArenaThreadCreate, user=Depends(get_current_user)):
    doc_ref = db.collection(u'arena').document(thread_id)
    doc = doc_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Thread not found")
    
    thread_dict = thread.dict()
    thread_dict['id'] = thread_id
    if thread_dict.get('publishedAt'):
         thread_dict['publishedAt'] = thread_dict['publishedAt'].isoformat()
    doc_ref.set(thread_dict, merge=True)
    return thread_dict

@router.delete("/{thread_id}")
def delete_thread(thread_id: str, user=Depends(get_current_user)):
    doc_ref = db.collection(u'arena').document(thread_id)
    doc = doc_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Thread not found")
    
    doc_ref.delete()
    return {"message": "Thread deleted successfully"}

@router.post("/{thread_id}/like")
def like_thread(thread_id: str):
    doc_ref = db.collection(u'arena').document(thread_id)
    doc = doc_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Thread not found")
    
    current_likes = doc.to_dict().get('likes', 0)
    doc_ref.update({'likes': current_likes + 1})
    return {"likes": current_likes + 1}

@router.post("/{thread_id}/dislike")
def dislike_thread(thread_id: str):
    doc_ref = db.collection(u'arena').document(thread_id)
    doc = doc_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Thread not found")
    
    current_dislikes = doc.to_dict().get('dislikes', 0)
    doc_ref.update({'dislikes': current_dislikes + 1})
    return {"dislikes": current_dislikes + 1}

from pydantic import BaseModel
class CommentCreate(BaseModel):
    content: str
    author: str = "Anonymous"

@router.post("/{thread_id}/comment")
def add_comment(thread_id: str, comment: CommentCreate):
    doc_ref = db.collection(u'arena').document(thread_id)
    doc = doc_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Thread not found")
    
    import uuid
    from datetime import datetime
    
    new_comment = {
        "id": str(uuid.uuid4()),
        "content": comment.content,
        "author": comment.author,
        "createdAt": datetime.utcnow().isoformat() + "Z"
    }
    
    # Atomically add to array if possible, or read-modify-write
    # Firestore array_union only works if elements are unique entriely, which they are due to ID
    # But read-modify-write is safer for order if we want to prepend/append specific logic
    
    current_responses = doc.to_dict().get('responses', [])
    current_responses.append(new_comment)
    
    doc_ref.update({'responses': current_responses})
    return new_comment
