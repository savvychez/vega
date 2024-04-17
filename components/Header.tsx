import NextLogo from "./NextLogo";
import SupabaseLogo from "./SupabaseLogo";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
})

export default function Header() {
  return (
    <div className="flex flex-col items-center justify-end">

      <h1 className="sr-only">Muse Scheduling System</h1>
      <p className={"text-3xl lg:text-7xl text-right !leading-tight mx-auto  max-w-xl " + bebas.className}>
        The best way to market your business
      </p>
      {/* <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" /> */}
    </div>
  );
}
