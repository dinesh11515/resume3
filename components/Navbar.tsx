import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount,useConnect } from "wagmi";
import { useState,useEffect } from "react";
import { ethers } from "ethers";
import { contractAddress, abi } from "../constants/index";
export default function Navbar() {
    const { address, isConnecting, isDisconnected } = useAccount();
    const [link,setLink] = useState<string>('')
    const getCidByAddress = async () => {
        try{
            const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com')
            const contract = new ethers.Contract(contractAddress,abi,provider)
            const cid = await contract.getCidByAddress(address)
            if(cid){
                setLink(`/resume?ipfs=${cid}`);
            }
        }
        catch(err){
           alert(err)
        }
    }
    useEffect(() => {
        if(address){
            getCidByAddress()
        }
    },[address])
    
    

    return (
        <div className="flex justify-center lg:px-20 py-3 border-b-2 border-[#8D72E1] md:px-2 top-0 z-100 fixed w-full backdrop-blur-sm">
            <div className="flex items-center justify-between  w-5/6">
                <Link href="/">
                    <button className="text-2xl font-['Lobster'] tracking-wider" >Resume3</button>
                </Link>
                <div className="flex items-center gap-10">
                    {
                        link !== '' && 
                    <button className="text-xl font-['Lobster'] tracking-widest" onClick={()=>window.open(window.location.origin+link)}>My Resume</button>
                    }
                    <Link href="/create">
                        <button className="text-xl font-['Lobster'] tracking-widest ">create</button>
                    </Link>
                    <ConnectButton showBalance={false} />
                </div>
            </div>
        </div>
        
    );
}
