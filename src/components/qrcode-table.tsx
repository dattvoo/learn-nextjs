'use client'
import { useEffect, useRef } from "react"
import QRCode from "qrcode"
import { getTableLink } from "@/lib/utils"


export default function QRcodeTable({ tableNumber, token, width = 250 }: { tableNumber: number, token: string, width?: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)


    useEffect(() => {
        // Hien tai : Thu vien QRcode se ve len cai the canvas
        // Bay gio: Ta se tao mot canvas de thu vien QRcode se gi de len do
        // Chung ta se them text vao the canvas that
        // CUoi chung ta se dua the canvas cua QRcode vao canvas that
        const canvas = canvasRef.current!
        canvas.height = width + 70
        canvas.width = width
        const canvasContext = canvas.getContext('2d')!
        canvasContext.fillStyle = '#fff'
        canvasContext.fillRect(0, 0, canvas.width, canvas.height)
        canvasContext.font = '20px Arial'
        canvasContext.textAlign = 'center'
        canvasContext.fillStyle = '#000'
        canvasContext.fillText(`Bàn số ${tableNumber}`, canvas.width / 2, canvas.width + 20)
        canvasContext.fillText(`Quét QR để gọi món`, canvas.width / 2, canvas.width + 50)

        // Here we create a virtalDom in order to overwrite canvas we created before
        const virtalCanvas = document.createElement('canvas')
        QRCode.toCanvas(virtalCanvas, getTableLink({
            token,
            tableNumber,
        }), function (error) {
            if (error) {
                console.log(error);
            }
            canvasContext.drawImage(virtalCanvas, 0, 0, width, width)
        })
    }, [tableNumber, token, width])

    return <canvas ref={canvasRef} width={width} />
}