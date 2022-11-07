import Head from "next/head"
import Image from "next/image"
import {HiOutlineMail} from 'react-icons/hi'
import {FiPhone} from 'react-icons/fi'
import {CiTwitter} from 'react-icons/ci'
import {FiTwitter} from 'react-icons/fi'
import {AiFillGithub} from 'react-icons/ai'
import {BiLinkExternal} from 'react-icons/bi'
import { useEffect, useState } from "react";
import { ipfsFetch } from '@crossbell/ipfs-fetch'
import { IpfsImage } from 'react-ipfs-image';
import {useRouter} from 'next/router'

interface ResumeProps {
    name : string,
    role : string,
    image : string,
    description : string,
    email : string,
    phone : string,
    twitter : string,
    github : string,
    skills : string[],
    experience : any[],
    education : any[],
    projects : any[],
    competitions : any[],
}
export default function Resume() {

    const [data,setData] = useState<ResumeProps>()
    const router = useRouter()
    const {ipfs} = router.query
    const getData = async () => {
        try{
            
            const response = await ipfsFetch(
            `ipfs://${ipfs}/data.json`
            );
            
            const text = await response.text()
            // setData(text as unknown as ResumeProps)
            setData(JSON.parse(text))
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        if(ipfs){
            getData()
        }
    }, [ipfs])
    return (
        <div className="">
            <Head>
                <title>{data != undefined ? data.name + "'s Resume":"Resume3" }</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {
                data !== undefined ?
            <div>
            <div className="flex border-b-2 border-gray-700 py-8 px-20 justify-between gap-5 ">
                <div className="flex gap-4">
                    <IpfsImage hash={data.image} className=" h-28 w-32 rounded-full"/>
                    <div className="">
                        <p className="text-2xl font-bold">{data.name}</p>
                        <p className="text-gray-400">{data.role}</p>
                        <p className="text-gray-400">{data.description}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                        <HiOutlineMail/> 
                        <p>{data.email}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <FiPhone/>
                        <p>{data.phone}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="py-2 px-4 bg-[#1DA1F2] rounded-lg flex items-center gap-1 text-white" onClick={()=>window.open("https://twitter.com/"+data.twitter)}><FiTwitter/> Twitter</button>
                        <button className="py-2 px-4 bg-black rounded-lg flex items-center gap-1 text-white" onClick={()=>window.open("https://github.com/"+data.github)}><AiFillGithub/>Github</button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-8 pt-5 px-20">
                <div>
                    <p className="font-bold text-xl uppercase">Work Experience</p>
                    {
                        data.experience.map((item,index) => {
                            return (
                                <div key={index} className="py-5">
                                    <p className="font-bold">{item.role}</p>
                                    <p className="text-gray-400">{item.companyName}</p>
                                    <p className="text-gray-400">{new Date(item.date[0]).getMonth()+" / "+new Date(item.date[0]).getFullYear() +" - "+ new Date(item.date[1]).getMonth()+" / "+new Date(item.date[1]).getFullYear()}</p>
                                    <p className="text-gray-400">{item.details}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <p className="font-bold text-xl uppercase ">Projects</p>
                    {
                        data.projects.map((item,index) => {
                            return (
                                <div className="flex flex-col gap-1 mt-2" key={index}>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-1 text-lg">
                                            <p className="font-bold ">{item.project} </p>
                                            <button className="" onClick={()=>window.open(item.link)}><BiLinkExternal /></button>
                                        </div>
                                        <p className="text-gray-400">{item.details}</p>                            
                                    </div>
                                </div>
                            )
                        })
                    }
                    
            
                    <p className="font-bold text-xl uppercase mt-3">Skills</p>
                    <div className="grid grid-cols-4 grid-flow-row gap-1 mt-2">
                        {
                            data?.skills.map((skill,index) => {
                                return <div className="flex items-center gap-1" key={index}>
                                    <div className="py-1 px-2 bg-gray-600 text-white rounded-md mt-1">{skill}</div>
                                </div>
                            })
                        }
                    </div>
                </div> 
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="font-bold text-xl uppercase">Education</p>
                        <div>
                            <div className="flex flex-col gap-1 mt-2">
                                <p className="font-bold text-lg">{data.education[0].degree}</p>
                                <p className="font-bold">{data.education[0].college}</p>
                                <p className="text-gray-400">{new Date(data.education[0].date[0]).getMonth()+" / "+new Date(data.education[0].date[0]).getFullYear() +" - "+ new Date(data.education[0].date[1]).getMonth()+" / "+new Date(data.education[0].date[1]).getFullYear()}</p>
                            </div>    
                        </div>
                    </div>
                    <div>
                        <p className="font-bold text-xl uppercase">COMPETITIONS</p>
                        {
                            data.competitions.map((item,index) => {
                                return (
                                    <div className="flex flex-col gap-1 mt-2" key={index}>
                                        <p className="font-bold text-lg">{item.competition}</p>
                                        <p className="text-gray-400">{item.details}</p>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                </div>
            </div>
            </div>
            :
            <div className="h-screen flex items-center justify-center gap-4 text-xl font-['Lobster']  tracking-wider">
                <Image src="/loading.gif" height={30} width={30} alt="loading"/>
                <p>Fetching Data From IPFS...</p>
            </div>
            }

            
        </div>
    )
}
