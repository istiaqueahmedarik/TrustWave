import { Sidebar, SidebarContent, SidebarFooter } from '@/components/ui/sidebar'
import { Check, User } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'

export function AdminSidebar() {
  return (
    <Sidebar>
      <div className="w-full p-4 text-2xl font-bold text-center">Admin</div>
      <SidebarContent className="space-y-4 p-4">
        <Link href="/admin_dashboard/">
          <Button className="w-full bg-gray-200 text-black hover:text-white">
            <User size={24} />
            User List
          </Button>
        </Link>
        <Link href="/admin_dashboard/fraud_check">
          <Button className="w-full bg-gray-200 text-black hover:text-white">
            <Check size={24} />
            Fraud Check
          </Button>
        </Link>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
