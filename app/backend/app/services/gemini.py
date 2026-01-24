from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

def get_gemini_client():
    if not GEMINI_API_KEY:
        return None
    return genai.Client(api_key=GEMINI_API_KEY)

def generate_project_explanation(project_data: dict, persona: str) -> str:
    client = get_gemini_client()
    if not client:
        return "Gemini API Key is missing. Please configure it in the backend."

    prompts = {
        "recruiter": f"""
        You are an expert Technical Recruiter. Explain the following project in a way that highlights its business value and technical complexity in under 30 seconds (maximum 100 words).
        Focus on: What it does, Key Tech Stack used, and the Impact/Result.
        Use professional, concise language.
        
        Project: {project_data.get('title')}
        Description: {project_data.get('oneLiner')}
        Tech Stack: {', '.join(project_data.get('techStack', []))}
        Overview: {project_data.get('overview')}
        """,
        
        "engineer": f"""
        You are a Senior Software Engineer. Provide a technical overview of this project (~5 minute read).
        Focus on: Architecture, Design Patterns, Challenging technical implementation details, and how the tech stack was leveraged.
        Structure with Markdown headers (##, ###).
        
        Project: {project_data.get('title')}
        Tech Stack: {', '.join(project_data.get('techStack', []))}
        HLD: {project_data.get('hld', 'N/A')}
        LLD: {project_data.get('lld', 'N/A')}
        Failure Points: {project_data.get('failurePoints', 'N/A')}
        """,
        
        "architect": f"""
        You are a Principal System Architect. Conduct a deep dive analysis of this project.
        Focus on: Scalability, Trade-offs, System Design choices, Data Flow, and Reliability.
        Critique the architecture if necessary and explain *why* certain decisions matter.
        Structure with Markdown headers (##, ###).
        
        Project: {project_data.get('title')}
        Tech Stack: {', '.join(project_data.get('techStack', []))}
        Architecture Decisions: {project_data.get('architectureDecisions', 'N/A')}
        HLD: {project_data.get('hld', 'N/A')}
        """
    }

    prompt = prompts.get(persona, prompts["recruiter"])
    
    # Try gemini-2.0-flash first
    try:
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=prompt
        )
        return response.text
    except Exception as e:
        print(f"Gemini 2.0 Flash failed: {e}. Falling back to 1.5 Flash.")
        # Fallback to gemini-1.5-flash
        try:
            response = client.models.generate_content(
                model='gemini-1.5-flash',
                contents=prompt
            )
            return response.text
        except Exception as e2:
             return f"Error generating explanation (after fallback): {str(e2)}"
