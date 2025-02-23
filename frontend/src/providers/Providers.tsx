'use client'
import { SocketManager } from '@/components/SocketManager';
import { ThemeProvider } from '@/components/ThemeProvider';
import React from 'react'
import { RecoilRoot } from 'recoil'

const Providers = ({children}:{children:React.ReactNode}) => {
  return (
    <RecoilRoot>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {/* <SocketManager /> */}
        {children}
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default Providers