from typing import List
import json

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles


app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

clients: List[WebSocket] = []
message_history: List[dict] = []


@app.get("/", response_class=HTMLResponse)
async def get(request: Request):
    return templates.TemplateResponse("chat.html", {"request": request})


@app.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    if message_history:
        await websocket.send_text(json.dumps({"type": "history",
                                              "messages": message_history}))

    clients.append(websocket)

    try:
        user_name = await websocket.receive_text()

        while True:
            data = await websocket.receive_text()
            data_json = json.loads(data)

            if data_json.get("type") == "message":
                message = {"user": user_name, "message": data_json["text"]}
                message_history.append(message)
                for client in clients:
                    await client.send_text(json.dumps({"type": "message",
                                                       "message": message}))

            elif data_json.get("type") == "change-username":
                new_user_name = data_json["newUserName"]
                old_user_name = user_name
                user_name = new_user_name
                for client in clients:
                    await client.send_text(
                        json.dumps({"type": "username-change",
                                    "oldUserName": old_user_name,
                                    "newUserName": new_user_name}))

    except WebSocketDisconnect:
        clients.remove(websocket)
    except Exception as e:
        print(f"An error occurred: {e}")
