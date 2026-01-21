from fastapi import APIRouter

router = APIRouter()

@router.get("/login")
def login():
    return {"message": "Auth implementation pending (Phase 2)"}
