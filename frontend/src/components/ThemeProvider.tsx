"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import useVideoCall from "@/hooks/useVideoCall";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
     const {endCall } = useVideoCall();

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
