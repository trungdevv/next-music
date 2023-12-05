import SignOut from "@/components/sign-out";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

export function Menu() {
  return (
    <Menubar className="rounded-none border-b p-2 lg:px-4 fixed top-0 left-0 right-0 h-[48px] z-50">
      <MenubarMenu>
        <MenubarTrigger className="font-bold">Music</MenubarTrigger>
      </MenubarMenu>
      <SignOut />
    </Menubar>
  );
}
