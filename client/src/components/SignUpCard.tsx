import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface UnchangeableInfoProps {
    dob: string
    fathersName: string
    mothersName: string
    nid: string
    address: string
    image: string
}

export function UnchangeableInfoCard({ dob, fathersName, mothersName, nid, address, image }: UnchangeableInfoProps) {
    return (
        <Card className="w-full shadow-none bg-transparent border-0">
            <CardHeader>
                <CardTitle>Unchangeable Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="relative  mx-auto w-full">
                    <Image src={image} alt="Profile Picture" width={70} height={70} className="rounded-full object-cover object-center mx-auto" />
                </div>

                <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" value={dob} disabled />
                </div>
                <div>
                    <Label htmlFor="permanent_address">Permanent Address</Label>
                    <Input id="permanent_address" value={address} disabled />
                </div>
                <div>
                    <Label htmlFor="fathersName">Father&apos;s Name</Label>
                    <Input id="fathersName" value={fathersName} disabled />
                </div>
                <div>
                    <Label htmlFor="mothersName">Mother&apos;s Name</Label>
                    <Input id="mothersName" value={mothersName} disabled />
                </div>
                <div>
                    <Label htmlFor="nid">NID Number</Label>
                    <Input id="nid" value={nid} disabled />
                </div>

            </CardContent>
        </Card>
    )
}
