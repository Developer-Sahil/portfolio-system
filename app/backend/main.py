from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import projects, writings, systems, vault, arena
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from app.core.limiter import limiter

app = FastAPI(
    title="Portfolio System API",
    description="Backend API for Sahil Sharma's Portfolio System",
    version="1.0.0"
)

# Add Rate Limiting Middleware
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

# CORS Configuration
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(projects.router, prefix="/api/v1/projects", tags=["Projects"])
app.include_router(writings.router, prefix="/api/v1/writings", tags=["Writings"])
app.include_router(systems.router, prefix="/api/v1/systems", tags=["Systems"])
app.include_router(vault.router, prefix="/api/v1/vault", tags=["Vault"])
app.include_router(arena.router, prefix="/api/v1/arena", tags=["Arena"])
from app.routers import messages
app.include_router(messages.router, prefix="/api/v1/messages", tags=["Messages"])


@app.get("/")
def read_root():
    return {"message": "Portfolio System API is running"}
