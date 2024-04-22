import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import { Bebas_Neue } from "next/font/google";
import { redirect } from 'next/navigation'
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import SingleBusiness from "@/components/SingleBusiness";
import Link from "next/link";


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
    <div className="flex-1 w-full flex flex-col gap-4 items-center">
      <Navbar/>

      <div className="animate-in  px-52 flex-1 flex justify-start items-start content-start w-full">
        <div className="w-full flex justify-between ">
          <div className="sidebar sticky w-fit text-zinc-400 mr-20 mt-2">
            <div className="ratings w-max">
              <h2 className="text-base">Ratings</h2>
              <p className="text-lg text-zinc-700 font-regular py-1 cursor-pointer">5 stars</p>
              <p className="text-lg text-zinc-700 font-regular py-1 cursor-pointer">4 stars+</p>
              <p className="text-lg text-zinc-700 font-regular py-1 cursor-pointer">3 stars+</p>
            </div>
            <div className="distance mt-2 w-max">
              <h1 className="mb-2">Distance</h1>
              <p className="text-lg text-zinc-700 font-regular py-1 cursor-pointer">1 mile</p>
              <p className="text-lg text-zinc-700 font-regular py-1 cursor-pointer">5 miles</p>
              <p className="text-lg text-zinc-700 font-regular py-1 cursor-pointer">10 miles</p>
              <p className="text-lg text-zinc-700 font-regular py-1 cursor-pointer">25 miles</p>
            </div>
            <div className="price mt-2 w-max">
              <h1 className="mb-2">Price</h1>
              <p className="text-lg text-zinc-700 font-regular py-1 cursor-pointer">$</p>
              <p className="text-lg text-zinc-700 font-regular py-1 cursor-pointer">$$</p>
              <p className="text-lg text-zinc-700 font-regular py-1 cursor-pointer">$$$</p>
            </div>
            <div className="hours mt-2 w-max">
              <h1 className="mb-2">Hours</h1>
              <p className="text-lg text-zinc-700 font-regular py-1 cursor-pointer">Open Early</p>
              <p className="text-lg text-zinc-700 font-regular py-1 cursor-pointer">Open Late</p>
            </div>
          </div>
          <div className="main_content flex-grow  justify-center">
            <div className="input w-full shadow-sm border border-zinc-200 bg-white h-12 my-2 mb-5 rounded-3xl flex items-center justify-around">
                <input type="text" className="text-zinc-700" placeholder="Search Service" style={{background: 'none', border: 'none', outline: 'none'}}/>
                <input type="text"  className="text-zinc-700"  placeholder="Zip Code / City" style={{background: 'none', border: 'none', outline: 'none'}}/>
                <input type="date" className="text-zinc-700" style={{background: 'none', border: 'none', outline: 'none', 'color': 'rgb(51,65,85,0.5)'}}/>
            </div>
            <div className="options w-full flex justify-between">
              <Button className="bg-red-700 w-1/6 text-white rounded-3xl mr-2 text-md py-5">hair</Button>
              <Button className="bg-red-700  w-1/6 text-white rounded-3xl mx-2 text-md py-5">nails</Button>
              <Button className="bg-red-700 w-1/6 text-white rounded-3xl mx-2 text-md py-5">wax</Button>
              <Button className="bg-red-700  w-1/6 text-white rounded-3xl mx-2 text-md py-5">thread</Button>
              <Button className="bg-red-700 w-1/6 text-white rounded-3xl ml-2 text-md py-5">laser</Button>
            </div>   
            <div className="my-8">
              <Link href={"/salon/1"}>
                <SingleBusiness url={"https://upload.wikimedia.org/wikipedia/commons/b/b2/Hair_Salon_Stations.jpg"} start={8} end={10.5} name="Elegance Hair Studio" description="Where style meets expertise, we pride ourselves on creating personalized looks that enhance your unique beauty."/>
              </Link>
              <Link href={"/salon/2"} className="mt-2">
                <SingleBusiness url="B" start={4} end={5.5} name="Classic Cuts Salon" description="Our talented team is dedicated to crafting  styles tailored to your individual taste, using timeless techniques."/>
              </Link>
              <Link href={"/salon/3"} >
                <SingleBusiness url="A" start={4} end={5.5} name="Allure Hair & Beauty" description="With a passion for perfection, our experienced stylists are committed to delivering a salon experience that leaves you looking and feeling your absolute best."/>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
      </footer>
    </div>
  );
}
