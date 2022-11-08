import Navbar from "../components/Navbar"
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useState } from 'react';
import TextArea from "antd/lib/input/TextArea";
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import { DatePicker, Space } from 'antd';
import {ImCross} from 'react-icons/im';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { RangePicker } = DatePicker;
import { Web3Storage } from "web3.storage";
import { useAccount,useSigner,useContract } from "wagmi";
import {abi,contractAddress} from "../constants/index"
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  
  
const { Panel } = Collapse;


export default function Create() {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const [experience,setExperience] = useState<boolean>(true);
    const [projects,setProjects] = useState<boolean>(false);
    const [skills,setSkills] = useState<boolean>(false);
    const [education,setEducation] = useState<boolean>(false);
    const [competitions,setCompetitions] = useState<boolean>(false);
    const [skillsData,setSkillsData] = useState<string[]>([]);
    const [imageIpfsUrl,setImageIpfsUrl] = useState<string>();
    const [experienceData,setExperienceData] = useState<any>([{},{},{}]);
    const [projectsData,setProjectsData] = useState<any>([{},{},{}]);
    const [educationData,setEducationData] = useState<any>([{}]);
    const [competitionsData,setCompetitionsData] = useState<any>([{},{},{}]);
    const {address} = useAccount();
    const [dataUrl,setDataUrl] = useState<string>();
    const { data: signer, isError, isLoading } = useSigner();
    const contract = useContract({
        address: contractAddress,
        abi: abi,
        signerOrProvider: signer,
    })

    function handleExp(name : string) {
        setExperience(false);
        setEducation(false);
        setProjects(false);
        setSkills(false);
        setCompetitions(false);
        if(name === "projects"){
            setProjects(true)
        }
        else if(name === "experience"){
            setExperience(true)
        }
        else if(name === "education"){
            setEducation(true)
        }
        else if(name === "skills"){
            setSkills(true)
        }
        else if(name === "competitions"){
            setCompetitions(true)
        }
    }

    const handleExp1 = (event : any) => {
        if(event.target.id === "details1"){
            setExperienceData([{...experienceData[0],details : event.target.value},experienceData[1],experienceData[2]])
        }
        else if(event.target.id === "role1"){
            setExperienceData([{...experienceData[0],role : event.target.value},experienceData[1],experienceData[2]])
        }
        else if(event.target.id === "companyName1"){
            setExperienceData([{...experienceData[0],companyName : event.target.value},experienceData[1],experienceData[2]])
        }
    }

    const handleExp2 = (event : any) => {
        if(event.target.id === "details2"){
            setExperienceData([experienceData[0],{...experienceData[1],details : event.target.value},experienceData[2]])
        }
        else if(event.target.id === "role2"){
            setExperienceData([experienceData[0],{...experienceData[1],role : event.target.value},experienceData[2]])
        }
        else if(event.target.id === "companyName2"){
            setExperienceData([experienceData[0],{...experienceData[1],companyName : event.target.value},experienceData[2]])
        }
    }

    const handleExp3 = (event : any) => {
        if(event.target.id === "details3"){
            setExperienceData([experienceData[0],experienceData[1],{...experienceData[2],details : event.target.value}])
        }
        else if(event.target.id === "role3"){
            setExperienceData([experienceData[0],experienceData[1],{...experienceData[2],role : event.target.value}])
        }
        else if(event.target.id === "companyName3"){
            setExperienceData([experienceData[0],experienceData[1],{...experienceData[2],companyName : event.target.value}])
        }
    }

    const handleDate1 = (value : any) => {
        setExperienceData([{...experienceData[0],date : value},experienceData[1],experienceData[2]])
    }

    const handleDate2 = (value : any) => {
        setExperienceData([experienceData[0],{...experienceData[1],date : value},experienceData[2]])
    }

    const handleDate3 = (value : any) => {
        setExperienceData([experienceData[0],experienceData[1],{...experienceData[2],date : value}])
    }

    const handleProject1 = (event : any) => {
        if(event.target.id === "project1Details"){
            setProjectsData([{...projectsData[0],details : event.target.value},projectsData[1],projectsData[2]])
        }
        else if(event.target.id === "project1"){
            setProjectsData([{...projectsData[0],project : event.target.value},projectsData[1],projectsData[2]])
        }
        else if(event.target.id === "link1"){
            setProjectsData([{...projectsData[0],link : event.target.value},projectsData[1],projectsData[2]])
        }
    }

    const handleProject2 = (event : any) => {
        if(event.target.id === "project2Details"){
            setProjectsData([projectsData[0],{...projectsData[1],details : event.target.value},projectsData[2]])
        }
        else if(event.target.id === "project2"){
            setProjectsData([projectsData[0],{...projectsData[1],project : event.target.value},projectsData[2]])
        }
        else if(event.target.id === "link2"){
            setProjectsData([projectsData[0],{...projectsData[1],link : event.target.value},projectsData[2]])
        }
    }

    const handleProject3 = (event : any) => {
        if(event.target.id === "project3Details"){
            setProjectsData([projectsData[0],projectsData[1],{...projectsData[2],details : event.target.value}])
        }
        else if(event.target.id === "project3"){
            setProjectsData([projectsData[0],projectsData[1],{...projectsData[2],project : event.target.value}])
        }
        else if(event.target.id === "link3"){
            setProjectsData([projectsData[0],projectsData[1],{...projectsData[2],link : event.target.value}])
        }
    }

    const handleEdu = (event : any) => {
        if(event.target.id === "degreeName"){
            setEducationData([{...educationData[0],degree : event.target.value}])
        }
        else if(event.target.id === "collegeName"){
            setEducationData([{...educationData[0],college : event.target.value}])
        }
        else if(event.target.id === "courseName"){
            setEducationData([{...educationData[0],course : event.target.value}])
        }
        else if(event.target.id === "eduDetails"){
            setEducationData([{...educationData[0],details : event.target.value}])
        }
    }

    const handleEduDate = (value : any) => {
        setEducationData([{...educationData[0],date : value}])
    }

    const handleComp1 = (event : any) => {
        if(event.target.id === "comp1"){
            setCompetitionsData([{...competitionsData[0],competition : event.target.value},competitionsData[1],competitionsData[2]])
        }
        else if(event.target.id === "comp1Details"){
            setCompetitionsData([{...competitionsData[0],details : event.target.value},competitionsData[1],competitionsData[2]])
        }
    }

    const handleComp2 = (event : any) => {
        if(event.target.id === "comp2"){
            setCompetitionsData([competitionsData[0],{...competitionsData[1],competition : event.target.value},competitionsData[2]])
        }
        else if(event.target.id === "comp2Details"){
            setCompetitionsData([competitionsData[0],{...competitionsData[1],details : event.target.value},competitionsData[2]])
        }
    }

    const handleComp3 = (event : any) => {
        if(event.target.id === "comp3"){
            setCompetitionsData([competitionsData[0],competitionsData[1],{...competitionsData[2],competition : event.target.value}])
        }
        else if(event.target.id === "comp3Details"){
            setCompetitionsData([competitionsData[0],competitionsData[1],{...competitionsData[2],details : event.target.value}])
        }
    }



    const handleBoth : UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        handleChange(info);
        uploadImage(info)
    }

    const handleChange = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
        setLoading(true);
        return;
        }
        if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj as RcFile, url => {
            setLoading(false);
            setImageUrl(url);
        });
        }
    };

    

    const uploadImage = async (info: UploadChangeParam<UploadFile>) => {
        try{
            const file = info.file.originFileObj as RcFile;
            const web3storage_key = process.env.NEXT_PUBLIC_WEB3_STORAGE_KEY;
            const client = new Web3Storage({ token: web3storage_key || ""});
            const cid = await client.put([file]);
            const img_url = ("ipfs://"+cid+"/"+file.name);
            setImageIpfsUrl(img_url);
        }
        catch(err){
            alert(err);
        }
    }
    console.log(contract)
    const uploadButton = (
        <div className="w-60 rounded-full bg-white p-12">
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const addSkill = () => {
        let skill = (document.getElementById("skill") as HTMLInputElement).value;
        if(skillsData.indexOf(skill) === -1){
            setSkillsData([...skillsData, skill]);
        }
    }

    const removeSkill = (index : number) => {
        skillsData.splice(index, 1);
        setSkillsData([...skillsData]);
    }

    function makeFileObjects (data :any) {
        const obj = data;
        const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
      
        const files = [
          new File([blob], 'data.json')
        ]
        return files
      }
      const storeContent = async (data : any) => {
        const web3storage_key = process.env.NEXT_PUBLIC_WEB3_STORAGE_KEY;
        const client = new Web3Storage({ token: web3storage_key || ""});
        const files = makeFileObjects(data);
        const cid = await client.put([files[0]]);
        const url = ("ipfs://"+cid+"/data.json");
        setDataUrl(url);
        return cid;
      };

    
    const create = async() => {
        try{
            let data: any = {}
            data.name = (document.getElementById("name") as HTMLInputElement).value;
            data.role = (document.getElementById("role") as HTMLInputElement).value;
            data.description = (document.getElementById("description") as HTMLInputElement).value;
            data.image = imageIpfsUrl;
            data.email = (document.getElementById("email") as HTMLInputElement).value;
            data.phone = (document.getElementById("phone") as HTMLInputElement).value;
            data.github = (document.getElementById("github") as HTMLInputElement).value;
            data.twitter = (document.getElementById("twitter") as HTMLInputElement).value;
            data.experience = experienceData;
            data.projects = projectsData;
            data.education = educationData;
            data.skills = skillsData;
            data.competitions = competitionsData;
            console.log(data);
            const cid = await storeContent(data);
            const price = await contract?.getMatic();
            console.log(price);
            const tx = await contract?.create(cid,{value:price});
            await tx?.wait();
            toast.success("Resume Created Successfully");
        }
        catch(err){
            console.log(err);
        }
    }



    return (
        <div className="">
            <Navbar />
            <div className="mx-20 flex justify-center mt-10">
                <div className="text-black flex gap-10 w-5/6">
                    <div>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="pl-5 pt-5"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={handleBoth}
                            >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex gap-3 w-full">
                            <input type="text" placeholder="Name" id="name" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                            <input type="text" placeholder="role" id="role" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                        </div>
                        <div>
                            <TextArea rows={4} placeholder="description" className="focus:outline-none w-full p-1" id="description"/>
                        </div>
                    </div>
                </div>
                
            </div>
            
            <div className="mx-20 mt-6 flex justify-center">
                <div className="flex gap-2 w-5/6 text-black">
                    <input type="email" placeholder="Email" id="email" className="focus:outline-none rounded-sm p-2 bg-white w-full"></input>
                    <input type="text" placeholder="Mobile Number" id="phone" className="focus:outline-none rounded-sm p-2 bg-white w-full"></input>
                    <input type="text" placeholder="Twitter Id" id="twitter" className="focus:outline-none rounded-sm p-2 bg-white w-full"></input>
                    <input type="text" placeholder="Github Id" id="github" className="focus:outline-none rounded-sm p-2 bg-white w-full"></input>
                </div>
            </div>

            <div className="flex mx-20 mt-6 flex-col gap-5 items-center text-black">
                <div className="flex justify-evenly w-full text-white ">
                    <button onClick={()=>handleExp("experience")} className={`${experience && 'border-b-2'}`}>Work Experience</button>
                    <button onClick={()=>handleExp("education")} className={`${education && 'border-b-2'}`}>Education</button>
                    <button onClick={()=>handleExp("skills")} className={`${skills && 'border-b-2'}`}>Skills</button>
                    <button onClick={()=>handleExp("projects")} className={`${projects && 'border-b-2'}`}>Projects</button>
                    <button onClick={()=>handleExp("competitions")} className={`${competitions && 'border-b-2'}`}>Competitions</button>
                </div>
                {
                    experience &&
                
                <Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    className="w-5/6"
                >
                    <Panel header="Experience 1" key="1" className="site-collapse-custom-panel">
                        <div className="flex flex-col gap-2 w-full" onChange={handleExp1}>
                            <div className="flex items-center gap-3 w-full">
                                <input type="text" placeholder="role" id="role1" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                                <input type="text" placeholder="Company" id="companyName1" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                                <Space direction="vertical" size={12} className="w-full" id="data1">
                                    <RangePicker className="p-2 w-full" onChange={handleDate1}/>
                                </Space>
                            </div>
                            <div>
                                <TextArea rows={4} placeholder="tasks/accomplishments" id="details1" className="focus:outline-none w-full p-1"/>
                            </div>
                        </div>
                    </Panel>
                    <Panel header="Experience 2" key="2" className="site-collapse-custom-panel">
                        <div className="flex flex-col gap-2 w-full" onChange={handleExp2} >
                            <div className="flex items-center gap-3 w-full">
                                <input type="text" placeholder="role" id="role2" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                                <input type="text" placeholder="Company" id="companyName2" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                                <Space direction="vertical" size={12} className="w-full">
                                    <RangePicker className="p-2 w-full" onChange={handleDate2}/>
                                </Space>
                            </div>
                            <div>
                                <TextArea rows={4} placeholder="tasks/accomplishments" id="details2" className="focus:outline-none w-full p-1"/>
                            </div>
                        </div>
                    </Panel>
                    <Panel header="Experience 3" key="3" className="site-collapse-custom-panel">
                        <div className="flex flex-col gap-2 w-full" onChange={handleExp3}>
                            <div className="flex items-center gap-3 w-full">
                                <input type="text" placeholder="role" id="role3" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                                <input type="text" placeholder="Company" id="companyName3" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                                <Space direction="vertical" size={12} className="w-full">
                                    <RangePicker className="p-2 w-full" onChange={handleDate3}/>
                                    
                                </Space>
                            </div>
                            <div>
                                <TextArea rows={4} placeholder="tasks/accomplishments" id="details3" className="focus:outline-none w-full p-1"/>
                            </div>
                         </div>
                    </Panel>
                </Collapse>
                }
                {
                    skills && 
                    <div className="flex  gap-10 w-5/6  justify-center">
                        <div className="flex w-4/12 gap-3 flex-col">
                            <input type="text" placeholder="skill" id="skill" className="focus:outline-none rounded-sm p-2 w-full bg-white"/>
                            <button className="p-2 bg-white rounded" onClick={addSkill}>Add</button>
                        </div> 
                        <div className="text-white w-full grid grid-cols-4 justify-center gap-4">
                            {skillsData.map((skill,index)=>{
                                    return(
                                        <div key={index} className="flex items-center gap-3 bg-gray-500 w-fit p-2 rounded-md h-fit">
                                            <p className="text-lg">{skill}</p>
                                            <button className="p-1 " onClick={()=>removeSkill(index)}><ImCross /></button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>   
                }
                {
                    projects &&
                
                <Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    className="w-5/6"
                >
                    <Panel header="Project 1" key="1" className="site-collapse-custom-panel">
                        <div className="flex flex-col gap-2 w-full" onChange={handleProject1}>
                            <div className="flex items-center gap-3 w-full">
                                <input type="text" placeholder="Project Name" id="project1" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                                <input type="text" placeholder="Link" id="link1" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                            </div>
                            <div>
                                <TextArea rows={3} placeholder="details" id="project1Details" className="focus:outline-none w-full p-2"/>
                            </div>
                        </div>
                    </Panel>
                    <Panel header="Project 2" key="2" className="site-collapse-custom-panel">
                        <div className="flex flex-col gap-2 w-full" onChange={handleProject2}>
                            <div className="flex items-center gap-3 w-full">
                                <input type="text" placeholder="Project Name" id="project2" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                                <input type="text" placeholder="Link" id="link2" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                            </div>
                            <div>
                                <TextArea rows={3} placeholder="details" id="project2Details"  className="focus:outline-none w-full p-2"/>
                            </div>
                        </div>
                    </Panel>
                    <Panel header="Project 3" key="3" className="site-collapse-custom-panel">
                        <div className="flex flex-col gap-2 w-full" onChange={handleProject3}>
                            <div className="flex items-center gap-3 w-full">
                                <input type="text" placeholder="Project Name" id="project3" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                                <input type="text" placeholder="Link" id="link3" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                            </div>
                            <div>
                                <TextArea rows={3} placeholder="details" id="project3Details"  className="focus:outline-none w-full p-2"/>
                            </div>
                        </div>
                    </Panel>
                </Collapse>
                }
                {
                    education &&
                    <Collapse
                        bordered={false}
                        defaultActiveKey={['1']}
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        className="w-5/6"
                    >   
                        <Panel header="Latest details of Education" key="1" className="site-collapse-custom-panel">
                            <div className="flex flex-col gap-2 w-full" onChange={handleEdu}>
                                <div className="flex items-center gap-3 w-full">
                                    <input type="text" placeholder="Degree Name" id="degreeName" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                                    <input type="text" placeholder="College Name" id="collegeName" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                                    <input type="text" placeholder="Course Name" id="courseName" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                                    <Space direction="vertical" size={12} className="w-full">
                                        <RangePicker className="p-2 w-full" onChange={handleEduDate}/>
                                    
                                    </Space>
                                </div>
                                <div>
                                    <TextArea rows={3} placeholder="details / accomplishments" id="eduDetails"  className="focus:outline-none w-full p-2"/>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>
                }
                {
                    competitions &&
                    <Collapse
                        bordered={false}
                        defaultActiveKey={['1']}
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        className="w-5/6"
                    >
                        <Panel header="Competition 1" key="1" className="site-collapse-custom-panel">
                            <div className="flex flex-col gap-2 w-full" onChange={handleComp1}>
                                <div className="flex items-center gap-3 w-full">
                                    <input type="text" placeholder="Competition Name" id="comp1" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                                </div>
                                <div>
                                    <TextArea rows={3} placeholder="details / accomplishments" id="comp1Details"  className="focus:outline-none w-full p-2"/>
                                </div>
                            </div>
                        </Panel>
                        <Panel header="Competition 2" key="2" className="site-collapse-custom-panel">
                            <div className="flex flex-col gap-2 w-full" onChange={handleComp2}>
                                <div className="flex items-center gap-3 w-full">
                                    <input type="text" placeholder="Competition Name" id="comp2" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                                </div>
                                <div>
                                    <TextArea rows={3} placeholder="details / accomplishments" id="comp2Details"  className="focus:outline-none w-full p-2"/>
                                </div>
                            </div>
                        </Panel>
                        <Panel header="Competition 3" key="3" className="site-collapse-custom-panel">
                            <div className="flex flex-col gap-2 w-full" onChange={handleComp3}>
                                <div className="flex items-center gap-3 w-full">
                                    <input type="text" placeholder="Competition Name" id="comp3" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                                </div>
                                <div>
                                    <TextArea rows={3} placeholder="details / accomplishments" id="comp3Details"  className="focus:outline-none w-full p-2"/>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>

                }
                <button className="px-8 py-3 rounded-lg bg-[#8D72E1] text-white text-lg" onClick={create}>Create Resume</button>
            </div>
            <ToastContainer />
        </div>
    )
}
