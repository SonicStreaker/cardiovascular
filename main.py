import joblib
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS configuration
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models and scaler
try:
    rf_model = joblib.load("cardio_rf_model.pkl")
    xgb_model = joblib.load("cardio_xgb_model.pkl")
    scaler = joblib.load("scaler.pkl")
except FileNotFoundError as e:
    raise RuntimeError(f"Model file not found: {e}")


class InputData(BaseModel):
    age: int
    height: int
    weight: float
    ap_hi: int
    ap_lo: int
    cholesterol: int
    gluc: int
    smoke: int
    alco: int
    active: int
    gender: int = 1  # optional
    obesity_flag: int = 0  # derived but allowed manually


@app.get("/")
def home():
    return {"message": "Cardiovascular Risk Prediction API is running!"}


@app.post("/predict")
def predict_risk(data: InputData):
    try:
        input_dict = data.dict()
        input_df = pd.DataFrame([input_dict])

        # Derived features
        input_df["age_years"] = input_df["age"]
        input_df["BMI"] = (
            input_df["weight"] / ((input_df["height"] / 100) ** 2)
        ).round(2)
        input_df["pulse_pressure"] = input_df["ap_hi"] - input_df["ap_lo"]
        input_df["bp_ratio"] = (input_df["ap_hi"] / input_df["ap_lo"]).round(2)
        input_df["obesity_flag"] = (input_df["BMI"] > 30).astype(int)

        # Match training order (critical)
        input_df = input_df[
            [
                "age",
                "gender",
                "height",
                "weight",
                "ap_hi",
                "ap_lo",
                "cholesterol",
                "gluc",
                "smoke",
                "alco",
                "active",
                "BMI",
                "pulse_pressure",
                "age_years",
                "bp_ratio",
                "obesity_flag",
            ]
        ]

        # Scale features
        features_scaled = scaler.transform(input_df)

        # Predict using both models
        rf_prob = rf_model.predict_proba(features_scaled)[0][1]
        xgb_prob = xgb_model.predict_proba(features_scaled)[0][1]
        avg_prob = (rf_prob + xgb_prob) / 2

        # Format output
        result = {
            "risk_probability": round(float(avg_prob), 3),
            "risk_label": "High Risk" if avg_prob > 0.5 else "Low Risk",
        }

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")
