import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button"

export default async function AuthButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      {user.email}!
      <form action={signOut}>
        <Button className="py-2 px-4 bg-red-700 hover:bg-red-700/90 rounded-md no-underline text-white ">
          Logout
        </Button>
      </form>
    </div>
  ) : (
    <Button className="bg-red-700 hover:bg-red-700/90 text-orange-50">
      <Link
    href="/login"  >
    Sign In
  </Link>
  </Button>

    
  );
}
