import AdminLayoutWrapper from '@/components/admin/AdminLayoutWrapper'
import { QueryProvider } from '@/lib/providers/QueryProvider'


export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryProvider>
      <AdminLayoutWrapper>
        {children}
      </AdminLayoutWrapper>
    </QueryProvider>
  )
}