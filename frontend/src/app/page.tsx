import React from "react";

import Intro from "@/components/section1/Intro";
import WhatIsFrog from "@/components/section2/WhatIsFrog";
import FrogCarosel from "@/components/section2/FrogCarosel";
import WalletAddress from "@/components/section3/WalletAddress";
import Tokenomic from "@/components/section3/Tokenomic";
import FAQ from "@/components/section4/FAQ";
import Phases from "@/components/section4/Phases";
import Ending from "@/components/section5/Ending";
import Footer from "@/components/section5/Footer";
import "./style.css";
const page = () => {
  return (
    <main className=" w-full h-[300vh] pt-32    ">
      <section className=" section1 intro h-[80vh] md:h-[150vh] w-full  ">
        <Intro />
      </section>
      <section className="section2 w-full h-auto   flex flex-col   ">
        <WhatIsFrog />
        <FrogCarosel />
      </section>

      <section className="section3 w-full ">
        <Tokenomic />
        <WalletAddress />
      </section>
      <section className=" section4 question  ">
        <FAQ />
        <Phases />
      </section>

      <section className=" section5 footer  ">
      <Ending />
        <Footer />
      </section>
    </main>
  );
};

export default page;
