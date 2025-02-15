"use client"

import type React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface ImageScanLoaderProps {
    imageSrc?: string
    width?: number
    height?: number
    duration?: number
    scanColor?: string
}

export const ImageScanLoader: React.FC<ImageScanLoaderProps> = ({
    imageSrc,
    width = 300,
    height = 200,
    duration = 2,
    scanColor = "#2ECC71",
}) => {
    return (
        <div className="flex items-center justify-center ">
            <div className="relative overflow-hidden rounded-lg shadow-lg" style={{ width, height }}>
                <Image
                    src={imageSrc || "/placeholder.svg"}
                    alt="Scanning image"
                    layout="fill"
                    className="object-center object-cover"
                />
                <motion.div
                    className="absolute inset-0"
                    initial={{ clipPath: "inset(0 0 100% 0)" }}
                    animate={{
                        clipPath: ["inset(0 0 100% 0)", "inset(0)", "inset(100% 0 0 0)"],
                    }}
                    transition={{
                        duration,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        ease: "linear",
                    }}
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(to bottom, transparent, ${scanColor})`,
                        }}
                    />
                </motion.div>
                <motion.div
                    className="absolute top-0 left-0 w-full h-1"
                    style={{ backgroundColor: scanColor }}
                    animate={{
                        y: [0, height, 0],
                    }}
                    transition={{
                        duration: duration * 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        ease: "linear",
                    }}
                />
            </div>
        </div>
    )
}
