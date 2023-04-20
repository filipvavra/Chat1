const express = require("express");
const WebSocket = require("ws")
const SocketServer = require("ws").Server;

console.log("Zapnuto")
const server = express().listen("3000");
const wss = new SocketServer({server})

wss.on("connection", (ws) => {
    console.log("[Server] Klient je připojen");

    ws.on("close", () => {console.log("[Server] Klient odpojen")});

    ws.on("message", (message) => {

        console.log("[Server]", message.toString('utf-8'));

        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState == WebSocket.OPEN){
                client.send(message);
            }
        })
    })
})