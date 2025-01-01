import UrlInput from "@/components/url-input-box";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session) {
    return redirect("/sign-in");
  }
  const user = session?.user;
  return (
    <main className="mx-auto max-w-xl py-12 md:py-24 space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">
          Url Shortener
        </h1>
        <p className="md:text-lg">
          Shorten your long URLs with ease.
        </p>
        <ul>
          <li>Name: {user?.name}</li>
          <li>Email: {user?.email}</li>
        </ul>
      </div>
      <UrlInput />
    </main>
  );
}
