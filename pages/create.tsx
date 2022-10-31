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
const { RangePicker } = DatePicker;

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

const text = `
A dog is a type of domesticated animal.
Known for its loyalty and faithfulness,
it can be found as a welcome guest in many households across the world.
`;
export default function Create() {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const [experience,setExperience] = useState<boolean>(true);
    const [projects,setProjects] = useState<boolean>(false);
    const [skills,setSkills] = useState<boolean>(false);
    const [Education,setEducation] = useState<boolean>(false);
    const [competitions,setCompetitions] = useState<boolean>(false);

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

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
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

    const uploadButton = (
        <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (
        <div className="">
            <Navbar />
            <div className="mx-20 flex justify-center">
                <div className="text-black flex gap-10 w-4/5">
                    <div>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="flex justify-center bg-white items-center w-40 p-8 rounded-full h-40"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
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
                            <TextArea rows={4} placeholder="description" maxLength={6} className="focus:outline-none w-full p-1"/>
                        </div>
                    </div>
                </div>
                
            </div>
            
            <div className="mx-20 mt-6 flex justify-center">
                <div className="flex gap-2 w-4/5 text-black">
                    <input type="email" placeholder="Email" id="email" className="focus:outline-none rounded-sm p-2 bg-white w-full"></input>
                    <input type="text" placeholder="Mobile Number" id="phoneNumber" className="focus:outline-none rounded-sm p-2 bg-white w-full"></input>
                    <input type="text" placeholder="Twitter Id" id="twitter" className="focus:outline-none rounded-sm p-2 bg-white w-full"></input>
                    <input type="text" placeholder="Github Id" id="github" className="focus:outline-none rounded-sm p-2 bg-white w-full"></input>
                </div>
            </div>

            <div className="flex mx-20 mt-6 flex-col gap-5 items-center text-black">
                <div className="flex justify-evenly w-full text-white">
                    <button onClick={()=>handleExp("experience")}>Work Experience</button>
                    <button onClick={()=>handleExp("education")}>Education</button>
                    <button onClick={()=>handleExp("skills")}>Skills</button>
                    <button onClick={()=>handleExp("projects")}>Projects</button>
                </div>
                {
                    experience &&
                
                <Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    className="w-4/5"
                >
                    <Panel header="Experience 1" key="1" className="site-collapse-custom-panel">
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex items-center gap-3 w-full">
                                <input type="text" placeholder="role" id="role" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                                <input type="text" placeholder="Company" id="name" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                                <Space direction="vertical" size={12} className="w-full">
                                    <RangePicker className="p-2 w-full"/>
                                    
                                </Space>
                            </div>
                            <div>
                                <TextArea rows={4} placeholder="tasks/accomplishments" maxLength={5} className="focus:outline-none w-full p-1"/>
                            </div>
                        </div>
                    </Panel>
                    <Panel header="Experience 2" key="2" className="site-collapse-custom-panel">
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex items-center gap-3 w-full">
                                <input type="text" placeholder="role" id="role" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                                <input type="text" placeholder="Company" id="name" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                                <Space direction="vertical" size={12} className="w-full">
                                    <RangePicker className="p-2 w-full"/>
                                    
                                </Space>
                            </div>
                            <div>
                                <TextArea rows={4} placeholder="tasks/accomplishments" maxLength={5} className="focus:outline-none w-full p-1"/>
                            </div>
                        </div>
                    </Panel>
                    <Panel header="Experience 3" key="3" className="site-collapse-custom-panel">
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex items-center gap-3 w-full">
                                <input type="text" placeholder="role" id="role" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                                <input type="text" placeholder="Company" id="name" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                                <Space direction="vertical" size={12} className="w-full">
                                    <RangePicker className="p-2 w-full"/>
                                    
                                </Space>
                            </div>
                            <div>
                                <TextArea rows={4} placeholder="tasks/accomplishments" maxLength={5} className="focus:outline-none w-full p-1"/>
                            </div>
                         </div>
                    </Panel>
                </Collapse>
                }
                {
                    skills && 
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex items-center gap-3 w-full">
                            <input type="text" placeholder="skill" id="role" className="focus:outline-none rounded-sm p-2 bg-white w-full"/>
                        </div> 
                    </div>   
                }
            </div>
           
        </div>
    )
}
