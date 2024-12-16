// nanti disini tambahin fitur buat download laporan
import Image from "next/image";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Import komponen secara dinamis untuk mencegah error
const AttacksChart = dynamic(() => import("@/components/AttacksTodayChart"), { ssr: false });
const TopReport = dynamic(() => import("@/components/Top10Report"), { ssr: false });
const AttacksTimeline = dynamic(() => import("@/components/AttacksTimeline"), { ssr: false });
const DionaeaProtocol = dynamic(() => import("@/components/DionaeaProtocol"), { ssr: false });
const AttacksByPort = dynamic(() => import("@/components/AttacksByPort"), { ssr: false });
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false })

export default function Attacks() {
  const [AttacksToday, setAttacksToday] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/attacksToday");
        const result = await response.json();
        if (result.success) {
          setAttacksToday(result.data);
        }
      } catch (error) {
        console.error("Error fetching attacks data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">

      <Navbar />
      <div className="w-full bg-gray-900 text-white items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      
        <div className="w-3/4 p-8 pt-4 text-center justify-center rounded-lg border border-solid border-black/[.08] border-transparent transition-colors items-center bg-foreground text-background gap-2 hover:bg-black hover:text-white text-sm sm:text-base px-4 sm:px-5">
          <div className="g-4">
            Attacks Timeline Scatterplot - Dynamic
          </div>
          <div className="overflow-auto justify-center items-center">
            <AttacksTimeline Attacksdata={AttacksToday} />
          </div>

        </div>

        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <div className="flex text-center items-center gap-2 hover:underline-offset-4">
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
