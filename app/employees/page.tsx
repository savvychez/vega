// "use client"

import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import BusinessApplication from "@/components/BusinessApplication";
import { Bebas_Neue } from "next/font/google";
import BusinessOnboarding from "@/components/BusinessOnboarding";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";


const bebas = Bebas_Neue({
    weight: '400',
    subsets: ['latin'],
})

export default function Index({
    searchParams,
  }: {
    searchParams: { token: string };
  }) {


    return (
        <div className="flex-1 w-full flex flex-col gap-10 items-center">
            <Navbar/>

            <div className="animate-in flex-1 flex  items-center  justify-around gap-20 max-w-5xl px-3 ">
                <EmployeeScheduleBuilder/>
            </div>

            <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
                <p>{searchParams?.token}</p>
            </footer>
        </div>
    );
}
