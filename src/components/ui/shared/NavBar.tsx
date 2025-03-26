import { useNavigate } from "react-router";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import useDispatches from "@/hooks/useDispatches";
import useSelectors from "@/hooks/useSelectors";

const NavBar = () => {
  const navigate = useNavigate();
  const { user } = useSelectors();
  const { existUser } = useDispatches();

  return (
    <div className="mb-12 flex items-center justify-between bg-primary p-2 shadow-md">
      <div>LOGO</div>

      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer">Account</MenubarTrigger>
          <MenubarContent>
            {user ? (
              <>
                <MenubarItem
                  className="cursor-pointer"
                  onClick={() => navigate(`/user-profile/${user.id}`)}
                >
                  Profile
                </MenubarItem>
                <MenubarItem
                  className="cursor-pointer"
                  onClick={() => {
                    localStorage.removeItem("token");
                    existUser();
                    navigate("/");
                  }}
                >
                  Sign out
                </MenubarItem>
              </>
            ) : (
              <>
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
              </>
            )}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default NavBar;
