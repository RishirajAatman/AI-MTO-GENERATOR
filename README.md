# AI Material Take-Off (MTO) Generator

## 1. Project Overview

The AI Material Take-Off (MTO) Generator is a full-stack web application that automates the extraction of Material Take-Off information from piping isometric drawings.

The application accepts drawings in **PDF**, **PNG**, or **JPG** format, preprocesses the uploaded document, and uses **Google Gemini 2.5 Flash Vision** to identify piping components and drawing metadata. The extracted information is validated, summarized, and presented through an interactive web interface with an option to download the results as a CSV report.

The project is implemented using **Next.js** for the frontend and **FastAPI** for the backend. To ensure the application remains usable even when the AI service is unavailable, a predefined mock response is automatically returned and clearly indicated in the user interface.

### Architecture

```text
                           AI Material Take-Off Generator

        ┌──────────────────────────────┐
        │        Next.js Frontend      │
        │ Upload • View Results • CSV  │
        └───────────────┬──────────────┘
                        │
                  HTTP REST API
                        │
        ┌───────────────▼──────────────┐
        │       FastAPI Backend        │
        │ File Validation              │
        │ PDF → PNG (if required)      │
        │ AI Pipeline                  │
        └───────────────┬──────────────┘
                        │
          ┌─────────────▼─────────────┐
          │ Google Gemini 2.5 Flash   │
          │      Vision API           │
          └─────────────┬─────────────┘
                        │
        ┌───────────────▼──────────────┐
        │ Response Validation          │
        │ Summary Generation           │
        │ CSV Generation               │
        │ Mock Fallback (if needed)    │
        └───────────────┬──────────────┘
                        │
                        ▼
             Material Take-Off Results
```

## 2. Setup Instructions

### Prerequisites

Ensure the following software is installed:

- Python **3.13** or later
- Node.js **18** or later
- npm
- Git (if cloning repo)

---

### Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create and activate a virtual environment:

**Windows**

```bash
python -m venv venv
venv\Scripts\activate
```

**macOS / Linux**

```bash
python3 -m venv venv
source venv/bin/activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```
### Install Poppler (Required for PDF Processing)

The application uses **pdf2image** to convert PDF drawings into images. On Windows, this requires **Poppler**.
1. Download the latest Poppler for Windows:
   https://github.com/oschwartz10612/poppler-windows/releases
2. Extract the downloaded ZIP file.
3. Add the `Library/bin` folder to your system **PATH**.
Example:
```text
C:\poppler\Library\bin
```
4. Restart your terminal after updating the PATH.
> **Note:** Poppler is only required when processing PDF drawings. PNG and JPG images do not require it.

Create a `.env` file by copying `.env.example`:

```bash
cp .env.example .env
```

> **Windows (Command Prompt)**

```cmd
copy .env.example .env
```

Start the backend server:

```bash
uvicorn app.main:app --reload
```

The backend will be available at:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

---

### Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:3000
```

---

### Running the Application

Ensure both the frontend and backend servers are running.

Open:

```text
http://localhost:3000
```

Upload a supported piping isometric drawing (`PDF`, `PNG`, or `JPG`) to generate a Material Take-Off report.

## 3. Environment Variables

The backend uses environment variables to configure the AI service.

Create a `.env` file in the `backend` directory by copying the provided `.env.example` file.

Example:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
GEMINI_ENABLED=true
```

### Variable Description

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Google Gemini API key used for AI-powered Material Take-Off extraction. |
| `GEMINI_ENABLED` | Enables (`true`) or disables (`false`) AI extraction. When disabled, the application automatically returns the predefined mock response. |

## 4. AI Pipeline

The application follows a sequential AI pipeline to convert a piping isometric drawing into a structured Material Take-Off (MTO).

```text
Upload Drawing
      │
      ▼
Pre-processing
      │
      ▼
Google Gemini Vision
      │
      ▼
Response Validation
      │
      ▼
Summary Generation
      │
      ▼
CSV Export
      │
      ▼
Display Results
```

### 1. Pre-processing

- Accepts PDF, PNG, and JPG drawings.
- PDF files are converted to a high-resolution PNG image before AI processing.
- Uploaded files are validated and stored temporarily for processing.

### 2. Extraction

- The processed image is sent to **Google Gemini 2.5 Flash Vision**.
- Gemini analyzes the drawing and extracts Material Take-Off information as structured JSON.

### 3. Validation

- The AI response is validated using **Pydantic** models.
- The application computes engineering summary statistics before returning the final response.

### 4. Model / Provider

- **Provider:** Google AI
- **Model:** Gemini 2.5 Flash

### 5. Prompt Strategy

A structured prompt instructs the model to extract:

- Drawing metadata
- Pipes
- Fittings
- Flanges
- Valves
- Gaskets
- Bolt Sets
- Supports

The prompt also enforces a predefined JSON schema to ensure consistent output.

### 6. Mock Fallback

If the Gemini API is unavailable, exceeds quota limits, or returns an error, the backend automatically switches to a predefined mock response. The frontend clearly indicates whether the displayed result was generated by Gemini AI or the mock fallback.

## 5. Assumptions & Known Limitations

### Assumptions

- The uploaded drawing is a piping isometric in PDF, PNG, or JPG format.
- Drawings are clear, upright, and of sufficient resolution for AI analysis.
- Standard piping symbols and engineering notations are used throughout the drawing.
- Internet connectivity is available when using the Gemini AI service.

### Known Limitations

- Extraction accuracy depends on the quality and complexity of the uploaded drawing.
- Very dense drawings or overlapping annotations may reduce extraction accuracy.
- Hand-drawn or low-resolution drawings may produce incomplete or inaccurate results.
- The current implementation processes one drawing at a time using a synchronous request.
- When the Gemini API is unavailable or quota limits are exceeded, the application returns a predefined mock response instead of performing AI extraction.

## 6. Future Improvements

Given additional development time, the following enhancements would be considered:

- Improve extraction accuracy through prompt refinement and multi-stage AI validation.
- Support multi-page piping drawings and batch processing.
- Detect additional piping components such as instruments, nozzles, and specialty fittings.
- Implement asynchronous job processing for large drawings with progress tracking.
- Add user authentication and project history for managing previous extractions.
- Export Material Take-Off reports in additional formats such as Excel and PDF.