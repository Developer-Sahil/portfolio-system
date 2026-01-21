from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.models.content import System, SystemCreate
from app.core.firebase import db
from app.dependencies import get_current_user

router = APIRouter()

@router.post("/", response_model=System)
def create_system(system: SystemCreate, user=Depends(get_current_user)):
    doc_ref = db.collection(u'systems').document()
    system_dict = system.dict()
    system_dict['id'] = doc_ref.id
    doc_ref.set(system_dict)
    return system_dict

@router.get("/", response_model=List[System])
def read_systems():
    docs = db.collection(u'systems').stream()
    return [doc.to_dict() for doc in docs]

@router.get("/{system_id}", response_model=System)
def read_system(system_id: str):
    doc_ref = db.collection(u'systems').document(system_id)
    doc = doc_ref.get()
    if doc.exists:
        return doc.to_dict()
    else:
        raise HTTPException(status_code=404, detail="System not found")

@router.put("/{system_id}", response_model=System)
def update_system(system_id: str, system: SystemCreate, user=Depends(get_current_user)):
    doc_ref = db.collection(u'systems').document(system_id)
    doc = doc_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="System not found")
    
    system_dict = system.dict()
    system_dict['id'] = system_id
    doc_ref.set(system_dict, merge=True)
    return system_dict

@router.delete("/{system_id}")
def delete_system(system_id: str, user=Depends(get_current_user)):
    doc_ref = db.collection(u'systems').document(system_id)
    doc = doc_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="System not found")
    
    doc_ref.delete()
    return {"message": "System deleted successfully"}
