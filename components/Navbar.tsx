import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
export default function Navbar() {
    return (
        <nav className="flex items-center justify-between my-5 mx-20">
            <div className="flex gap-10">
                <Link href="/">
                    <button>Resume3</button>
                </Link>
                <Link href="/create">
                    <button>Create</button>
                </Link>
            </div>
            <div className="bg-red">
            <ConnectButton showBalance={false} />
            </div>
            
        </nav>
    );
}
