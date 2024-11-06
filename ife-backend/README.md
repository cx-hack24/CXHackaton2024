# IFE API in K8s

This API will be use to get data from AWS personalize recommendation. Use `npm install` then `npm run dev` to test locally.

## Available endpoint
| Method | Endpoint | Body | Response |
|---|---|---|---|
| GET | /ife/recommendation/{seatId} | | {"recommendations": [{"itemId": "string"}]} |
| POST | /ife/recommendation/{seatId} | {"recommendations": [{"itemId": "string"}]} | { "message": "Data stored successfully", "filename": "string } |