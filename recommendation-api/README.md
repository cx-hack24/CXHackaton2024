# Recommendations API in K8s

This API will be use to get data from AWS personalize recommendation. Use `npm install` then `npm run dev` to test locally.

## Available endpoint
| Method | Endpoint | Response |
|---|---|---|
| GET | /recommendation?userId={} | {"recommendations": [{"itemId": "string"}]} |
