import { ReactNode } from "react";
import { HomeLayout } from "@/modules/home/ui/layouts/home-layout";

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <HomeLayout>
      {children}
    </HomeLayout>
  );
};

export default Layout;