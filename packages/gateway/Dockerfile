FROM python:3.10.4-slim

ENV PYTHONBUFFERED 1
EXPOSE 8080
WORKDIR /code
RUN mkdir server

COPY ./requirements.txt .

COPY ./server ./server

RUN pip install -r requirements.txt

ENV BAAS_SERVICE_URL=https://baas-core-6gjtlllbna-uc.a.run.app
CMD ["uvicorn", "--host", "0.0.0.0", "--port", "8080", "server.main:server"]