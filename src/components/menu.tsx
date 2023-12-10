import SignOut from "@/components/sign-out";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

export function Menu() {
  return (
    <Menubar className="rounded-none border-b p-2 lg:px-4 fixed top-0 left-0 right-0 h-14 z-50">
      <div className="container max-w-screen-xl flex justify-between">
        <MenubarMenu>
          <MenubarTrigger className="font-bold">Next Music</MenubarTrigger>
        </MenubarMenu>
        <SignOut />
      </div>
    </Menubar>
  );
}
