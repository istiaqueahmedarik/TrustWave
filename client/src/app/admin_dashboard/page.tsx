import AdminUserCard from '../../components/adminUserCard'

export default function AdminDashboard() {
  return (
    <div className="p-12">
      <h1>Admin Dashboard</h1>
      <div className="w-full">
        <AdminUserCard />
      </div>
    </div>
  )
}
