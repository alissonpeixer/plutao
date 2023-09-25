import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "../../../../../types";




export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo,
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {

    res.socket?.server?.io.socketsJoin("global")

    res.socket?.server?.io.emit("message",req.body)

    res.end();
    } catch (error) {
        console.log(error)
    }
}