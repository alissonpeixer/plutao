import { Socket } from "socket.io";

export const socketModule = (socket : Socket) => {

    if(!socket.handshake.xdomain) return;

    console.log("=====");
    console.log(" + user_connection", socket.id);
    console.log(new Date());



    socket.on("disconnect", ()=>{
        console.log("=====");
        console.log(" - user_disconnected", socket.id);
        console.log(new Date());
    })


}