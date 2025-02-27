'use client'
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
        {children}
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default Providers