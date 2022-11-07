import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
export default function Navbar() {
    return (
        <div className="flex justify-center px-20 py-5 border-b-2 border-[#8D72E1]">
            <div className="flex items-center justify-between  w-5/6">
                <Link href="/">
                    <button className="text-2xl font-['Lobster'] tracking-wider">Resume3</button>
                </Link>
                <div className="flex items-center gap-10">
                    <Link href="/create">
                        <button className="text-xl font-['Lobster'] tracking-widest ">create</button>
                    </Link>
                    <ConnectButton showBalance={false} />
                </div>
            </div>
        </div>
        
    );
}
