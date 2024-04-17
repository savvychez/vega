import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import { Bebas_Neue } from "next/font/google";
import { redirect } from 'next/navigation'
import Navbar from "@/components/Navbar";

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
})

export default async function Index() {
  const cookieStore = cookies();

  //if not authenticated, redirect to login
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    redirect("/onboard");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-10 items-center">
      <Navbar/>

      <div className="animate-in flex-1 flex  items-center  justify-around gap-20 max-w-5xl px-3 ">
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
      </footer>
    </div>
  );
}
