import type { NextApiRequest, NextApiResponse } from 'next'
import { Server } from 'socket.io'

import type { Server as HTTPServer } from 'http'
import type { Socket as NetSocket } from 'net'
import type { Server as IOServer } from 'socket.io'

export interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

export interface SocketWithIO extends NetSocket {
  server: SocketServer
}

export interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}

export default async function socketHandler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  // It means that socket server was already initialised
  if (res.socket?.server.io) {
    console.log('Already set up')
    res.end()
    return
  }

  const io = new Server(res.socket.server)
  res.socket.server.io = io

  // Define actions inside
  io.on('connection', (socket) => {
    console.log('New client connected')

    socket.on('disconnect', () => {
      console.log('Client disconnected')
    })

    socket.on('remoteControl', (event: any) => {
      io.emit('remoteControl', event)
    })
  })

  console.log('Setting up socket')
  res.end()
}