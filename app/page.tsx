import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-rose-50 to-white">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-rose-600">Sugary</h1>
          <p className="text-gray-500 mt-2">Sign in to access your dashboard</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
