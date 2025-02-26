import React from 'react'
import { Button } from './ui/button'

const BuyButton = ({title}:{title:string}) => {
  
  return (
    <Button
      className="bg-[#E3FF10] text-black min-w-[192px] h-[60px] text-[18px]  rounded-none font-bold "
      style={{
        clipPath: "polygon(92% 0, 100% 25%, 100% 100%, 8% 100%, 0% 75%, 0 0)",
      }}
    >
{title}
    </Button>
  );
}

export default BuyButton