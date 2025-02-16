/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import type React from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { AlertTriangle, Filter, MoreVertical, Search } from 'lucide-react'
import { useState } from 'react'
import { get_with_token } from '@/actions/req'

interface User {
    id: number
    name: string
    time: string
    transactionId: string
    amount: number
    ipAddress: string
    status: 'active' | 'blocked'
    type: 'send' | 'receive'
    rank: 'newbie' | 'silver' | 'gold' | 'platinum'
}



export default function AdminDashboard({ data }: { data: any }) {
    const [searchTerm, setSearchTerm] = useState('')
    const users = data.map((user: any) => ({
        id: user.user_id,
        name: user.sender_name,
        time: user.created_at,
        transactionId: user.ID,
        amount: user.amount,
        ipAddress: user.ip,
        type: 'user',
        rank: user.sl_no,
    }))

    const [filteredUsers, setFilteredUsers] = useState(users)


    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase()
        setSearchTerm(term)
        const filtered = users.filter(
            (user: any) =>
                user.name.toLowerCase().includes(term) ||
                user.transactionId.includes(term) ||
                user.ipAddress.includes(term),
        )
        setFilteredUsers(filtered)
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                    User List
                </h1>
                <div className="flex items-center space-x-2">
                    <Input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-64"
                    />
                    <Button
                        variant="outline"
                        size="icon"
                    >
                        <Search className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                    >
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 overflow-scroll">
                <Table>
                    <TableCaption>A list of users transactions.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Transaction ID</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>IP Address</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.map((user: any) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.id}</TableCell>
                                <TableCell>
                                    {user.name}{' '}
                                    <Badge
                                        className={`${user.rank === 'newbie' ? 'bg-gray-500' : user.rank === 'silver' ? 'bg-blue-500' : user.rank === 'gold' ? 'bg-yellow-500' : 'bg-green-500'}`}
                                    >
                                        {user.rank}
                                    </Badge>
                                </TableCell>
                                <TableCell>{user.time}</TableCell>
                                <TableCell>{user.transactionId}</TableCell>
                                <TableCell>
                                    <Badge
                                        className={`${user.type === 'receive' ? 'bg-red-500' : 'bg-green-500'}`}
                                    >
                                        {user.amount > 0 ? '+' : '-'} {Math.abs(user.amount)} ৳
                                    </Badge>
                                </TableCell>
                                <TableCell>{user.ipAddress}</TableCell>

                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                            >
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600">
                                                <AlertTriangle className="mr-2 h-4 w-4" />
                                                <span>Block User</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
