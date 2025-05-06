// import { redirect } from "next/navigation"
// // import { getSession } from "@/lib/auth"
// // import DashboardHeader from "@/components/dashboard-header"
// // import MaterialsList from "@/components/materials-list"

export default async function DashboardPage() {
//   const session = await getSession()

//   if (!session) {
//     redirect("/")
//   }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <DashboardHeader user={session.user} /> */}
      <main className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Materials Dashboard</h1>
        {/* <MaterialsList /> */}
      </main>
    </div>
  )
}