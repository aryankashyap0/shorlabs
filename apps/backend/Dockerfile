FROM public.ecr.aws/docker/library/python:3.12-slim

# Add Lambda Web Adapter
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.9.1 /lambda-adapter /opt/extensions/lambda-adapter

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends git gcc g++ make curl && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Lambda Web Adapter configuration
ENV PORT=8080
ENV AWS_LWA_READINESS_CHECK_PATH=/health

# Start the FastAPI server
CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8080"]
