from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from app.models.content import Project, ProjectCreate
from app.core.firebase import db
from app.dependencies import get_current_user
from datetime import datetime
from pydantic import BaseModel

router = APIRouter()

@router.post("/", response_model=Project)
def create_project(project: ProjectCreate, user=Depends(get_current_user)):
    doc_ref = db.collection(u'projects').document()
    project_dict = project.dict()
    project_dict['id'] = doc_ref.id
    # Ensure date fields are serialized if needed, but Pydantic handles datetimes well typically.
    # Firestore stores them as Timestamps.
    doc_ref.set(project_dict)
    return project_dict

@router.get("/", response_model=List[Project])
def read_projects():
    docs = db.collection(u'projects').stream()
    return [doc.to_dict() for doc in docs]

@router.get("/slug/{slug}", response_model=Project)
def read_project_by_slug(slug: str):
    docs = db.collection(u'projects').where(u'slug', u'==', slug).stream()
    for doc in docs:
        return doc.to_dict()
    raise HTTPException(status_code=404, detail="Project not found")

@router.get("/{project_id}", response_model=Project)
def read_project(project_id: str):
    doc_ref = db.collection(u'projects').document(project_id)
    doc = doc_ref.get()
    if doc.exists:
        return doc.to_dict()
    else:
        raise HTTPException(status_code=404, detail="Project not found")

class ExplainRequest(BaseModel):
    persona: str

@router.post("/slug/{slug}/explain")
async def explain_project(slug: str, request: ExplainRequest):
    """
    Generate an AI explanation for a project based on a persona.
    """
    # 1. Fetch Project Data (Reuse Firestore logic)
    project_data = None
    docs = db.collection(u'projects').where(u'slug', u'==', slug).stream()
    for doc in docs:
        project_data = doc.to_dict()
        break
    
    if not project_data:
         raise HTTPException(status_code=404, detail="Project not found")
    
    # 2. Call Gemini Service
    from app.services.gemini import generate_project_explanation
    explanation = generate_project_explanation(project_data, request.persona)
    
    return {"explanation": explanation}

@router.put("/{project_id}", response_model=Project)
def update_project(project_id: str, project: ProjectCreate, user=Depends(get_current_user)):
    doc_ref = db.collection(u'projects').document(project_id)
    doc = doc_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Project not found")
    
    project_dict = project.dict()
    project_dict['id'] = project_id
    doc_ref.set(project_dict, merge=True)
    return project_dict

@router.delete("/{project_id}")
def delete_project(project_id: str, user=Depends(get_current_user)):
    print(f"Attempting to delete project: {project_id} by user: {user['uid']}")
    doc_ref = db.collection(u'projects').document(project_id)
    doc = doc_ref.get()
    if not doc.exists:
        print(f"Project not found: {project_id}")
        raise HTTPException(status_code=404, detail="Project not found")
    
    doc_ref.delete()
    return {"message": "Project deleted successfully"}
