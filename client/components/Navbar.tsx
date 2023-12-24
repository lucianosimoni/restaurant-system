"use client";
import { useState, useEffect } from "react";
import {
  Button,
  Link,
  Navbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { LogoutCurve } from "iconsax-react";
import { staffLogout } from "@/lib/appLocalStorage";

export default function AppNavibar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([
    { name: "Inicio", path: "/", active: false },
    { name: "Perfil", path: "/staff-profile", active: false },
  ]);

  // @ts-ignore
  useEffect(() => {
    const updatedItems = menuItems.map((item, index) => {
      let newItem = { ...item };
      newItem.active = pathname === item.path ? true : false;
      return newItem;
    });
    setMenuItems(updatedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const logout = () => {
    staffLogout();
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      {/* Brand / Beginning */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          {/* <SaborGauchoLogo /> */}
          <p className="font-bold text-inherit">Sabor Gáucho</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item.name}-${index}`} isActive={item.active}>
            <Link
              aria-current={item.active === true ? "page" : "false"}
              // @ts-ignore
              color={item.active === true ? "primary" : "foreground"}
              href={item.path}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            color="danger"
            href="/"
            variant="flat"
            endContent={<LogoutCurve size={24} variant="Bold" />}
            onClick={logout}
          >
            Sair
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              color={item.active === true ? "primary" : "foreground"}
              className="w-full"
              href={item.path}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
