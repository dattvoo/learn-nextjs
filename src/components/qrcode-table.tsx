'use client'
import { useEffect, useRef } from "react"
import QRCode from "qrcode"
import { getTableLink } from "@/lib/utils"


export default function QRcodeTable({ tableNumber, token, width = 250 }: { tableNumber: number, token: string, width?: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        QRCode.toCanvas(canvas, getTableLink({
            token,
            tableNumber,
        }), function (error) {
            if (error) {
                console.log(error);
            }
            console.log('success');
        })
    }, [tableNumber, token])

    return <canvas ref={canvasRef} width={width} />
}