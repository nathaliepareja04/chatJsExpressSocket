import { Server } from "socket.io";

// const messages=["que mas ps"]   si se agregan con push se puede colocar el const
let messages=[{message:"que mas ps",hour:1676133498585}]

export const chatSocket=(server)=>{
    const io=new Server(server)

    io.on("connection",(socket)=>{
        console.log("user conectado",socket.id
        )

        const sendMsj=()=>{
            io.emit("server:getMsj",messages)
        }

        sendMsj()

        socket.on("client:addMsj",(message)=>{
            // messages=[...messages,message]   cuando se mandan datos de agregar
            messages.push(message)
            sendMsj()
        })

        socket.on("disconnect",()=>{
            console.log("user desconectado",socket.id)
        })
    })
}