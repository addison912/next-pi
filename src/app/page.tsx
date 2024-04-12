import Link from "next/link";
import { auth } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = auth();

  const href = userId ? "/market" : "/new-user";

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-900">
      <div className="mx-auto w-full max-w-[600px]">
        <h1 className="mb-4 text-6xl text-gray-100 ">Predictit Insights</h1>
        <div>
          <Link href={href}>
            <button className="rounded-md bg-sky-600 px-4 py-2 text-lg">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
