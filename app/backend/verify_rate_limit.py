import httpx
import asyncio
import time

URL = "http://127.0.0.1:8000/api/v1/messages/"
PAYLOAD = {
    "name": "Rate Limit Tester",
    "email": "test@example.com",
    "company": "Spam Corp",
    "type": "Review",
    "message": "This is a spam message to test rate limits."
}

async def test_rate_limit():
    print(f"Testing Rate Limit on {URL}")
    print("Sending 7 requests (Limit is 5/minute)...")
    
    async with httpx.AsyncClient() as client:
        for i in range(1, 8):
            start = time.time()
            try:
                response = await client.post(URL, json=PAYLOAD)
                elapsed = time.time() - start
                status = response.status_code
                print(f"Request {i}: Status {status} ({elapsed:.2f}s)")
                
                if status == 429:
                    print("✅ Rate limit triggered successfully (429 Too Many Requests)")
                    return
            except Exception as e:
                print(f"Request {i} failed: {e}")
    
    print("❌ Rate limit NOT triggered. Check configuration.")

if __name__ == "__main__":
    asyncio.run(test_rate_limit())
