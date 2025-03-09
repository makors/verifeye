import { Radar } from "lucide-react";
import { Figtree } from "next/font/google";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

export default function Logo() {
    return (
        <div className="flex items-center gap-1">
            <Radar className="h-8 w-8" />
            <span className={`${figtree.className} text-2xl font-semibold`}>
                Verifeye
            </span>
        </div>
    )
}