import AdminSidebar from '@/components/admin/AdminSidebar'
// import AdminHeader from '@/components/admin/AdminHeader'
import { QueryProvider } from '@/lib/providers/QueryProvider'


export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <QueryProvider>
      <div className="min-h-screen bg-earth-50">
        <AdminSidebar />
        <div className="lg:pl-64">
          {/* <AdminHeader user={session?.user} /> */}
          <main className="py-8 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </QueryProvider>
  )
}
// // import { getServerSession } from 'next-auth'
// // import { authOptions } from '@/lib/auth'
// import AdminSidebar from '@/components/admin/AdminSidebar'
// // import AdminHeader from '@/components/admin/AdminHeader'
// import { QueryProvider } from '@/lib/providers/QueryProvider'


// export default async function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   // Middleware already ensures user is authenticated with admin/editor role
//   // Safe to get session without checking
//   // const session = await getServerSession(authOptions)

//   return (
//     <QueryProvider>
//       <div className="min-h-screen bg-earth-50">
//         <AdminSidebar />
//         <div className="lg:pl-64">
//           {/* <AdminHeader user={session?.user} /> */}
//           <main className="py-8 px-4 sm:px-6 lg:px-8">
//             {children}
//           </main>
//         </div>
//       </div>
//     </QueryProvider>
//   )
// }