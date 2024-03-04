import AuthButtons from "../components/auth/auth-buttons";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between px-24 py-10">
      <div className="absolute top-0 right-0 left-0 p-4">
        <AuthButtons />
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-6xl">Store App</h1>
      </div>
    </div>
  );
}
