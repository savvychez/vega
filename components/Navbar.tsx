
import React from 'react';
import AuthButton from './AuthButton'; // adjust the import path as needed
import { Lato, Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  weight: '800',
  subsets: ['latin'],
})

const playfair_light = Playfair_Display({
  weight: '600',
  subsets: ['latin'],
})

const Navbar = () => {
  
  
  return (
    <nav className="w-full flex  justify-center  border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl flex justify-start items-center p-3 text-sm">
        <h1 className="text-xl font-extrabold flex items-center gap-8">
          <span className={"text-[2rem] block " + playfair_light.className}>vega</span>
          <span className={"block  text-zinc-600 font-light mt-[4px] ml-1 " }></span>
        </h1>
        <div className="actions mt-[8px]">
          <a href="" className='text-lg'>discover</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;