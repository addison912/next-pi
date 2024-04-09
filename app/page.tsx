import Link from "next/link";
import { auth } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = await auth();

  let href = userId ? "/market" : "/new-user";

  return (
    <div className="w-screen h-screen bg-slate-900 flex justify-center items-center">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4 text-gray-100 ">Predictit Insights</h1>
        <div>
          <Link href={href}>
            <button className="bg-sky-600 px-4 py-2 rounded-md text-lg">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
