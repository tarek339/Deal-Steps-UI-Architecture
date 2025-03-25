import { useNavigate } from "react-router";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="mb-12 flex items-center justify-between bg-primary p-2 shadow-md">
      <div>LOGO</div>

      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer">Profile</MenubarTrigger>
          <MenubarContent>
            <MenubarItem
              className="cursor-pointer"
              onClick={() => navigate("/sign-in")}
            >
              Sign in
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem
              className="cursor-pointer"
              onClick={() => navigate("/sign-up")}
            >
              Sign up
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default NavBar;
