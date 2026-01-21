from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.models.content import VaultEntry, VaultEntryCreate
from app.core.firebase import db
from app.dependencies import get_current_user

router = APIRouter()

@router.post("/", response_model=VaultEntry)
def create_vault_entry(entry: VaultEntryCreate, user=Depends(get_current_user)):
    doc_ref = db.collection(u'vault').document()
    entry_dict = entry.dict()
    entry_dict['id'] = doc_ref.id
    doc_ref.set(entry_dict)
    return entry_dict

@router.get("/", response_model=List[VaultEntry])
def read_vault_entries():
    docs = db.collection(u'vault').stream()
    return [doc.to_dict() for doc in docs]

@router.get("/{entry_id}", response_model=VaultEntry)
def read_vault_entry(entry_id: str):
    doc_ref = db.collection(u'vault').document(entry_id)
    doc = doc_ref.get()
    if doc.exists:
        return doc.to_dict()
    else:
        raise HTTPException(status_code=404, detail="Vault entry not found")

@router.put("/{entry_id}", response_model=VaultEntry)
def update_vault_entry(entry_id: str, entry: VaultEntryCreate, user=Depends(get_current_user)):
    doc_ref = db.collection(u'vault').document(entry_id)
    doc = doc_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Vault entry not found")
    
    entry_dict = entry.dict()
    entry_dict['id'] = entry_id
    doc_ref.set(entry_dict, merge=True)
    return entry_dict

@router.delete("/{entry_id}")
def delete_vault_entry(entry_id: str, user=Depends(get_current_user)):
    doc_ref = db.collection(u'vault').document(entry_id)
    doc = doc_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Vault entry not found")
    
    doc_ref.delete()
    return {"message": "Vault entry deleted successfully"}
