# Cardiovascular Risk Predictor

A simple ML assignment for predicting cardiovascular risk using FastAPI backend and Next.js frontend.

## Setup

### Backend (FastAPI)

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create `.env` file in the root directory:
```
FRONTEND_URL=http://localhost:3000
```

3. Run the server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

### Frontend (Next.js)

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file in the frontend directory:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## API Endpoint

### POST `/predict`

Predicts cardiovascular risk based on health metrics.

**Request Body:**
```json
{
  "age": 18393,
  "height": 168,
  "weight": 62.0,
  "ap_hi": 110,
  "ap_lo": 80,
  "cholesterol": 1,
  "gluc": 1,
  "smoke": 0,
  "alco": 0,
  "active": 1,
  "gender": 1
}
```

**Response:**
```json
{
  "risk_probability": 0.234,
  "risk_label": "Low Risk"
}
```

