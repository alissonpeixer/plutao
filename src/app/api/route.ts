import { NextResponse } from 'next/server'

import { startServer, startSocket } from '@/util/socket/server'


export async function GET(req:any) {
    if(!startServer){
        startSocket();
    }

    return NextResponse.json({startServer});
}