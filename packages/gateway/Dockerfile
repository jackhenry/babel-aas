FROM python:3.10.4-slim

ENV PYTHONBUFFERED 1
EXPOSE 8000
WORKDIR /code
RUN mkdir server

COPY ./requirements.txt .

COPY ./server ./server

RUN pip install -r requirements.txt

ENV BAAS_SERVICE_URL=http://baas-core:8001
CMD ["uvicorn", "--host", "0.0.0.0", "--port", "8000", "server.main:server"]