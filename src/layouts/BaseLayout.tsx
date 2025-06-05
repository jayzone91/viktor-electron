import DragWindowRegion from "@/components/DragWindowRegion";
import NavigationMenu from "@/components/template/NavigationMenu";
import React from "react";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DragWindowRegion title="Viktor" />
      <NavigationMenu />
      <main className="h-screen p-2 pb-20">{children}</main>
    </>
  );
}
