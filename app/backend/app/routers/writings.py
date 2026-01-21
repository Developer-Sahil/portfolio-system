from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.models.content import Writing, WritingCreate
from app.core.firebase import db
from app.dependencies import get_current_user

router = APIRouter()

@router.post("/", response_model=Writing)
def create_writing(writing: WritingCreate, user=Depends(get_current_user)):
    doc_ref = db.collection(u'writings').document()
    writing_dict = writing.dict()
    writing_dict['id'] = doc_ref.id
    # Ensure datetime is serializable
    if writing_dict.get('publishedAt'):
         writing_dict['publishedAt'] = writing_dict['publishedAt'].isoformat()
    doc_ref.set(writing_dict)
    return writing_dict

@router.get("/", response_model=List[Writing])
def read_writings():
    docs = db.collection(u'writings').stream()
    items = []
    for doc in docs:
        item = doc.to_dict()
        items.append(item)
    return items

@router.get("/id/{writing_id}", response_model=Writing)
def read_writing_by_id(writing_id: str):
    doc_ref = db.collection(u'writings').document(writing_id)
    doc = doc_ref.get()
    if doc.exists:
        return doc.to_dict()
    raise HTTPException(status_code=404, detail="Writing not found")

@router.get("/{slug}", response_model=Writing)
def read_writing_by_slug(slug: str):
    docs = db.collection(u'writings').where(u'slug', u'==', slug).stream()
    for doc in docs:
        return doc.to_dict()
    raise HTTPException(status_code=404, detail="Writing not found")

@router.put("/{writing_id}", response_model=Writing)
def update_writing(writing_id: str, writing: WritingCreate, user=Depends(get_current_user)):
    doc_ref = db.collection(u'writings').document(writing_id)
    doc = doc_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Writing not found")
    
    writing_dict = writing.dict()
    writing_dict['id'] = writing_id
    if writing_dict.get('publishedAt'):
         writing_dict['publishedAt'] = writing_dict['publishedAt'].isoformat()
         
    doc_ref.set(writing_dict, merge=True)
    return writing_dict

@router.delete("/{writing_id}")
def delete_writing(writing_id: str, user=Depends(get_current_user)):
    doc_ref = db.collection(u'writings').document(writing_id)
    doc = doc_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Writing not found")
    
    doc_ref.delete()
    return {"message": "Writing deleted successfully"}
