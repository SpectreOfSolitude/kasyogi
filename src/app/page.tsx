"use client"
import Image from "next/image";
import AttacksChart from "@/components/AttacksTodayChart";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import TopReport from "@/components/Top10Report";
import AttacksTimeline from "@/components/AttacksTimeline";
import DionaeaProtocol from "@/components/DionaeaProtocol";
import AttacksByPort from "@/components/AttacksByPort";

export default function Home() {
  const [AttacksToday, setAttacksToday] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      document.body.style.backgroundColor = "#111827"; // Atur ulang background
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/attacksToday");
      const result = await response.json();
      console.log(result)
      if (result.success) {
        setAttacksToday(result.data);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">

      <Navbar/>
      <div className="grid bg-gray-900 text-white grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 gap-8 font-[family-name:var(--font-geist-sans)]">
        <h1 className="font-[family-name:var(--font-geist-sans)] font-bold">Visualizer</h1>
        <Image
          className="right-0 pr-4"
          src="/monokuma2.png"
          alt="Arashi Monokuma"
          width={180}
          height={38}
          priority
        />

        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="grid grid-rows-[auto_1fr_auto] grid-cols-[auto_auto_auto_auto] gap-4">
            <div className="rounded-lg border border-solid border-black/[.08] border-transparent transition-colors items-center justify-start bg-foreground text-background gap-2 hover:bg-black hover:text-white text-sm sm:text-base px-4 sm:px-5">
              <div>
                Attacks
              </div>
              <div>
                Attacks Counter
              </div>
            </div>
            <div className="rounded-lg justify-start pt-4 border border-solid border-black/[.08] border-transparent transition-colors flex flex-col items-center bg-foreground text-background gap-2 hover:bg-black hover:text-white text-sm sm:text-base px-4 sm:px-5">
              <div className=" text-center">
                Top 10 Source IP
              </div>
              <div className="w-full">
                <TopReport Attacksdata={AttacksToday} />
              </div>
            </div>
            <div className="rounded-lg border border-solid text-center pt-4 border-black/[.08] border-transparent transition-colors items-center justify-center bg-foreground text-background gap-2 hover:bg-black hover:text-white text-sm sm:text-base px-4 sm:px-5">
              <h4>
                Dionaea Protocol
              </h4>
              <DionaeaProtocol Attacksdata={AttacksToday} />
            </div>
            <div className="rounded-lg pt-4 pb-2 border border-solid border-black/[.08] border-transparent transition-colors flex flex-col items-center justify-start bg-foreground text-background gap-2 hover:bg-black hover:text-white text-sm sm:text-base px-4 sm:px-5">
              Attacks Bar Dynamic - Unique IP Sources
              <AttacksChart Attacksdata={AttacksToday} />
            </div>
            <div className="col-span-2 pt-4 text-center justify-start rounded-lg border border-solid border-black/[.08] border-transparent transition-colors items-center bg-foreground text-background gap-2 hover:bg-black hover:text-white text-sm sm:text-base px-4 sm:px-5">
              Attacks by Port - Top 10 Dynamic
              <div className="">
                <AttacksByPort Attacksdata={AttacksToday} />
              </div>
            </div>

            <div className="col-span-2 pt-4 text-center justify-start rounded-lg border border-solid border-black/[.08] border-transparent transition-colors items-center bg-foreground text-background gap-2 hover:bg-black hover:text-white text-sm sm:text-base px-4 sm:px-5">
              Attacks Timeline Scatterplot - Dynamic
              <div>
                <AttacksTimeline Attacksdata={AttacksToday} />
              </div>

            </div>
          </div>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <div className="flex items-center gap-2 hover:underline-offset-4">
            Modern Honeynet Framework is an open source project by:
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://github.com/pwnlandia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
              />
              <span>Pwnlandia</span>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
