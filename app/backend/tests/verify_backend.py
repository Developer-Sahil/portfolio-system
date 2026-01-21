from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_public_and_protected_routes():
    print("Starting Backend Verification...")
    
    # List of resources to test
    resources = ["projects", "writings", "systems", "vault", "arena"]
    
    for resource in resources:
        print(f"\n--- Testing {resource} ---")
        
        # 1. Test Public List (GET /api/v1/{resource}/)
        response = client.get(f"/api/v1/{resource}/")
        if response.status_code == 200:
            print(f"[PASS] GET /{resource}: 200 OK")
        else:
            print(f"[FAIL] GET /{resource}: {response.status_code} - {response.text}")

        # 2. Test Protected Create (POST /api/v1/{resource}/) - No Token
        # We send a valid payload to ensure we get 401 (Auth) instead of 422 (Validation)
        dummy_payload = {}
        if resource == "projects":
             dummy_payload = {
                 "title": "Test Project",
                 "slug": "test-project",
                 "thumbnail": "http://example.com/img.jpg",
                 "oneLiner": "Test",
                 "techStack": ["Python"],
                 "overview": "Test implementation"
             }
        elif resource == "writings":
             dummy_payload = {
                 "title": "Test Writing",
                 "slug": "test-writing",
                 "thumbnail": "http://example.com/img.jpg",
                 "excerpt": "Test",
                 "content": "Test content",
                 "readingTime": 5,
                 "tags": ["Tech"],
                 "publishedAt": "2023-01-01T00:00:00"
             }
        elif resource == "systems":
             dummy_payload = {
                 "name": "Test System",
                 "category": "Test",
                 "logo": "logo.png",
                 "usage": "Test",
                 "whyChosen": "Test",
                 "whereItBreaks": "Test"
             }
        elif resource == "vault":
             dummy_payload = {
                 "title": "Test Vault",
                 "category": "Test",
                 "tags": ["Test"],
                 "content": "Test"
             }
        elif resource == "arena":
             dummy_payload = {
                 "title": "Test Thread",
                 "content": "Test content",
                 "publishedAt": "2023-01-01T00:00:00"
             }

        response = client.post(f"/api/v1/{resource}/", json=dummy_payload)
        
        if response.status_code == 401:
            print(f"[PASS] POST /{resource} (No Token): 401 Unauthorized")
        else:
            print(f"[FAIL] POST /{resource} (No Token): {response.status_code} - {response.text[:100]}...")
            
    print("\nVerification Complete.")

if __name__ == "__main__":
    test_public_and_protected_routes()
