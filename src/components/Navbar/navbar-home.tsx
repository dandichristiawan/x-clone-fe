import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavbarHooks } from "@/hooks/navbarhome.hooks";
import { Button } from "../ui/button";

export const NavbarHome = () => {

  const { showNavbar, isSticky } = useNavbarHooks()
  const [active, setActive] = React.useState<'foryou' | 'following' | null>('foryou');

  return (
    <nav
      className={`bg-black border border-gray-600 border-l-1 border-r-1 border-b-1 border-t-0 w-full md:w-2/5 flex flex-row h-20 md:h-16 justify-between z-50 opacity-85  transition-transform duration-300 ${isSticky ? 'sticky top-0' : ''
        } ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="w-1/12 flex justify-start items-center p-4 md:hidden">
        <Sheet>
          <SheetTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <SheetContent side={"left"} className="w-[240px] bg-black border border-r-1 border-slate-600 shadow-xl">
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex flex-row justify-evenly items-center w-full">
        <Button
          onClick={() => setActive(active === 'foryou' ? 'foryou' : 'foryou')}
          variant='ghost'
          className={`text-white font-bold hover:bg-transparent hover:text-slate-400 ${active === 'foryou' ? 'underline underline-offset-8 text-white underline-blue' : ''}`}
        >
          For you
        </Button>
        <Button
          onClick={() => setActive(active === 'following' ? 'following' : 'following')}
          variant='ghost'
          className={`text-white font-bold hover:bg-transparent hover:text-slate-400 ${active === 'following' ? 'underline underline-offset-8 text-white underline-blue' : ''}`}
        >
          Following
        </Button>
      </div>
    </nav >
  );
};
