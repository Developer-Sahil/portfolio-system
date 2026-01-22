from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ProjectBase(BaseModel):
    title: str
    slug: str
    thumbnail: str
    oneLiner: str
    techStack: List[str]
    featured: bool = False
    status: str = "published"
    overview: str
    liveDemo: Optional[str] = None
    github: Optional[str] = None
    hld: Optional[str] = None
    lld: Optional[str] = None
    architectureDecisions: Optional[str] = None
    failurePoints: Optional[str] = None
    motivation: Optional[str] = None
    
class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: str

class WritingBase(BaseModel):
    title: str
    slug: str
    thumbnail: str
    excerpt: str
    content: str
    readingTime: int
    tags: List[str]
    series: Optional[str] = None
    canonicalUrl: Optional[str] = None
    publishedAt: datetime

class WritingCreate(WritingBase):
    pass

class Writing(WritingBase):
    id: str

class SystemBase(BaseModel):
    name: str
    category: str
    logo: str
    usage: str
    whyChosen: str
    whereItBreaks: str

class SystemCreate(SystemBase):
    pass

class System(SystemBase):
    id: str

class VaultEntryBase(BaseModel):
    title: str
    category: str
    tags: List[str]
    content: str

class VaultEntryCreate(VaultEntryBase):
    pass

class VaultEntry(VaultEntryBase):
    id: str

class ArenaThreadBase(BaseModel):
    title: str
    content: str
    publishedAt: datetime
    likes: int = 0
    dislikes: int = 0
    
class ArenaThreadCreate(ArenaThreadBase):
    responses: List[dict] = []

class ArenaThread(ArenaThreadBase):
    id: str
    responses: List[dict] = []

class MessageBase(BaseModel):
    name: str
    email: str
    company: Optional[str] = None
    type: str # internship, mentoring, etc.
    message: str

class MessageCreate(MessageBase):
    pass

class Message(MessageBase):
    id: str
    createdAt: datetime
    read: bool = False



