import {
  closeWindow,
  maximizeWindow,
  minimizeWindow,
} from "@/helpers/window_helpers";
import { Minus, Plus } from "lucide-react";
import { default as React, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface DragWindowRegionProps {
  title?: ReactNode;
}

export default function DragWindowRegion({ title }: DragWindowRegionProps) {
  return (
    <div className="flex w-screen items-stretch justify-between">
      <WindowButtons />
      <div className="draglayer w-full">
        {title && (
          <div className="400 flex flex-1 justify-center p-2 text-center text-xs whitespace-nowrap text-gray-400 select-none">
            {title}
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
}

function WindowButtons() {
  const { t } = useTranslation();

  return (
    <div className="ms-2 me-2 grid grid-cols-3 items-center gap-2">
      <button
        type="button"
        title={t("Close")}
        className="group bg-system-red hover:system-red-vibrant flex h-3 w-3 items-center justify-center rounded-full text-center transition duration-75 ease-in-out"
        onClick={closeWindow}
      >
        <Plus className="text-foreground dark:text-background hidden h-2 w-2 rotate-45 font-bold transition duration-75 ease-in-out group-hover:block" />
      </button>
      <button
        title={t("Minimize")}
        type="button"
        className="group bg-system-yellow hover:bg-system-yellow-vibrant flex h-3 w-3 items-center justify-center rounded-full text-center transition duration-75 ease-in-out"
        onClick={minimizeWindow}
      >
        <Minus className="text-foreground dark:text-background hidden h-2 w-2 transition duration-75 ease-in-out group-hover:block" />
      </button>
      <button
        title={t("Maximize")}
        type="button"
        className="group bg-system-green hover:bg-system-green-vibrant flex h-3 w-3 items-center justify-center rounded-full text-center transition duration-75 ease-in-out"
        onClick={maximizeWindow}
      >
        <Plus className="text-foreground dark:text-background hidden h-2 w-2 transition duration-75 ease-in-out group-hover:block" />
      </button>
    </div>
  );
}
