import { get_with_token } from '@/actions/req';
import AdminDashboard from '@/components/Admin'
import React from 'react'


async function page() {
  const res = await get_with_token('admin/auth/user_list', false);
  console.log(res);

  return (
    <div>
      <AdminDashboard data={res.data} />
    </div>
  )
}

export default page