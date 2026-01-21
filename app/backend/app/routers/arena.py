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
