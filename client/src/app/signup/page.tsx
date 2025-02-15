/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "@/components/ImageUpload"
import { UnchangeableInfoCard } from "@/components/SignUpCard"
import { ImageScanLoader } from "@/components/ImageScanner"

import { fadeIn, staggerChildren, scaleIn } from "@/utils/animations"
import { detectObjectsFromBase64, OCRImage } from "@/actions/nid"
import { SignUp } from "@/actions/auth"
import { cropBase64Image } from "@/actions/crop"
import { useActionState } from "react"

export default function SignUpPage() {
    const [stage, setStage] = useState<"front" | "back" | "form" | "loading">("front")
    const [location, setLocation] = useState("")
    const [frontNidCardImage, setFrontNidCardImage] = useState<File | null>(null)
    const [backNidCardImage, setBackNidCardImage] = useState<File | null>(null)
    const [frontPreview, setFrontPreview] = useState<string | null>(null)
    const [backPreview, setBackPreview] = useState<string | null>(null)
    const [fullName, setFullName] = useState<string | null>(null)
    const [base64Front, setBase64Front] = useState<string>("")
    const [base64Back, setBase64Back] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [dob, setDob] = useState<string>("")
    const [fathersName, setFathersName] = useState<string>("")
    const [mothersName, setMothersName] = useState<string>("")
    const [nid, setNid] = useState<string>("")
    const [croppedFr, setCroppedFr] = useState<string>("")

    const [state, formAction, isPending] = useActionState(SignUp, null)

    const imageToBase64 = async (image: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(image)
        })
    }

    const handleNIdCardChange = async (file: File, side: "front" | "back") => {
        if (file) {
            if (side === "front") {
                setFrontNidCardImage(file)
                setFrontPreview(URL.createObjectURL(file))
            } else {
                setBackNidCardImage(file)
                setBackPreview(URL.createObjectURL(file))
            }

            const base64Url = await imageToBase64(file)
            console.log(`${side} NID card:`, base64Url)

            if (side === "front") {
                setBase64Front(base64Url)
                setStage("back")
            } else {
                setBase64Back(base64Url)
                setStage("loading")
                try {
                    const [res, res1] = await Promise.all([
                        OCRImage(base64Front, base64Url),
                        detectObjectsFromBase64(base64Front)
                    ])
                    const bbox = JSON.parse(res1.bounding_box)
                    const croppedFront = await cropBase64Image(bbox, base64Front)
                    console.log(res)
                    if (
                        res.name === undefined ||
                        res.address === undefined ||
                        res.blood_type === undefined ||
                        res.dob === undefined ||
                        res.fatherName === undefined ||
                        res.motherName === undefined ||
                        res.nid === undefined
                    ) {
                        setStage("front")
                    }
                    setFullName(res.name)
                    setAddress(res.address || "")
                    setDob(res.dob || "")
                    setFathersName(res.fatherName || "")
                    setMothersName(res.motherName || "")
                    setNid(res.nid || "")
                    setCroppedFr(croppedFront)
                    setStage("form")
                } catch (error) {
                    console.error("OCR Error:", error)
                    setStage("back")
                }
            }
        }
    }

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-transparent text-primary-foreground">
                            <Image src="/icon.svg" alt="Icon" width={34} height={34} />
                        </div>
                        Trust Wave
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-lg">
                        <motion.div
                            className="space-y-6"
                            initial="hidden"
                            animate="visible"
                            variants={scaleIn}
                        >
                            <motion.h1 variants={fadeIn} className="text-3xl font-bold text-muted-foreground">
                                Sign Up
                            </motion.h1>
                            <motion.p variants={fadeIn} className="text-foreground/80">
                                Your NID information is encrypted and secure, used only for verification.
                            </motion.p>

                            {stage === "front" && (
                                <motion.div variants={fadeIn} className="space-y-2">
                                    <Label htmlFor="frontNidCard">Upload Front of NID Card</Label>
                                    <ImageUpload onImageUpload={(file) => handleNIdCardChange(file, "front")} />
                                    {frontPreview && (
                                        <Image
                                            src={frontPreview}
                                            alt="Front NID Preview"
                                            width={200}
                                            height={200}
                                            className="mt-4"
                                        />
                                    )}
                                </motion.div>
                            )}

                            {stage === "back" && (
                                <motion.div variants={fadeIn} className="space-y-2">
                                    <Label htmlFor="backNidCard">Upload Back of NID Card</Label>
                                    <ImageUpload onImageUpload={(file) => handleNIdCardChange(file, "back")} />
                                    {backPreview && (
                                        <Image
                                            src={backPreview}
                                            alt="Back NID Preview"
                                            width={200}
                                            height={200}
                                            className="mt-4"
                                        />
                                    )}
                                </motion.div>
                            )}

                            {stage === "loading" && (
                                <motion.div variants={fadeIn}>
                                    <ImageScanLoader imageSrc={frontPreview || ""} />
                                </motion.div>
                            )}

                            {stage === "form" && (
                                <motion.form action={formAction} className="space-y-4" variants={staggerChildren}>
                                    <motion.div variants={fadeIn} className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input id="name" name="name" value={fullName || ""} readOnly className="w-full" />
                                    </motion.div>

                                    <motion.div variants={fadeIn} className="space-y-2">
                                        <Label htmlFor="present_address">Present Address</Label>
                                        <div className="flex items-center space-x-2">
                                            <Input
                                                id="present_address"
                                                name="present_address"
                                                className="w-full"
                                                placeholder="mirpur 12, dhaka"
                                                required
                                                value={location}
                                                readOnly
                                            />

                                        </div>
                                    </motion.div>

                                    <motion.div variants={fadeIn} className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="rahim@gmail.com"
                                            className="w-full"
                                            required
                                        />
                                    </motion.div>

                                    <motion.div variants={fadeIn} className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            placeholder="+8801875448172"
                                            className="w-full"
                                            required
                                        />
                                    </motion.div>

                                    <motion.div variants={fadeIn} className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input id="password" name="password" type="password" className="w-full" required />
                                    </motion.div>

                                    <motion.div variants={fadeIn} className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            className="w-full"
                                            required
                                        />
                                    </motion.div>

                                    <motion.div variants={fadeIn} className="hidden">
                                        <input type="hidden" name="dob" value={dob} />
                                        <input type="hidden" name="fathersName" value={fathersName} />
                                        <input type="hidden" name="mothersName" value={mothersName} />
                                        <input type="hidden" name="nid" value={nid} />
                                        <input type="hidden" name="permanentAddress" value={address} />
                                        <input type="hidden" name="croppedImage" value={croppedFr} />
                                        <input type="hidden" name="nidImage" value={base64Front} />
                                    </motion.div>

                                    <motion.div variants={fadeIn}>
                                        <Button type="submit" className="w-full" variant="default" disabled={isPending}>
                                            {isPending ? "Loading..." : "Sign Up"}
                                        </Button>
                                    </motion.div>

                                    {state && state.error && (
                                        <motion.div variants={fadeIn} className="text-red-500 text-center">
                                            {state.error}
                                        </motion.div>
                                    )}
                                </motion.form>
                            )}

                            <motion.p variants={fadeIn} className="mt-4 text-center text-gray-600">
                                Already have an account?{" "}
                                <Link href="/login" className="text-blue-600 hover:underline">
                                    Login here
                                </Link>
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                {stage === "form" ? (
                    <UnchangeableInfoCard
                        dob={dob}
                        fathersName={fathersName}
                        mothersName={mothersName}
                        nid={nid}
                        address={address}
                        image={croppedFr}
                    />
                ) : (
                    <Image
                        src="/signup_1.svg"
                        alt="Sign Up Illustration"
                        layout="fill"
                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                )}
            </div>
        </div>
    )
}
