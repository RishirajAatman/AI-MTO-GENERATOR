from fastapi import FastAPI
from app.routes.extract import router as extract_router
from fastapi.middleware.cors import CORSMiddleware
from app.routes.export import router as export_router
app = FastAPI(
    title="Isometric MTO Generator API",
    description="Backend API for extracting Material Take-Off (MTO) from piping isometric drawings.",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def root():
    return {
        "message": "Welcome to the Isometric MTO Generator API!"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "message": "Backend is running successfully!"
    }

app.include_router(extract_router)
app.include_router(export_router)
