import { createServer } from "http";
import { Server, Socket } from "socket.io";

import { socketModule } from "./app";

export   let startServer = false;

const httpServer = createServer();


const io = new Server<any>(httpServer, {
    serveClient: false,
    //@ts-ignore
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }
});

io.on("connection", socketModule);

if(!startServer){
    httpServer.listen(3003,()=>{
        startServer = true;
        console.log("listening on port 3000");
    });
}



export const startSocket = () => (console.log("Server started"), startServer= true);