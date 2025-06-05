import { SiElectron, SiReact, SiVite } from "@icons-pack/react-simple-icons";
import React from "react";

export default function InitalIcons() {
  const iconSize = 48;

  return (
    <div className="inline-flex gap-2">
      <SiReact size={iconSize} />
      <SiVite size={iconSize} />
      <SiElectron size={iconSize} />
    </div>
  );
}