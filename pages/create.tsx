import Navbar from "../components/Navbar"
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useState } from 'react';
import TextArea from "antd/lib/input/TextArea";


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
export default function Create() {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

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
        <div>
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
                <div className="flex gap-2 w-4/5">
                    <input type="email" placeholder="Email" id="email" className="focus:outline-none rounded-sm p-2 bg-white w-full"></input>
                    <input type="number" placeholder="Mobile Number" id="phoneNumber" className="focus:outline-none rounded-sm p-2 bg-white w-full"></input>
                    <input type="text" placeholder="Twitter Id" id="twitter" className="focus:outline-none rounded-sm p-2 bg-white w-full"></input>
                    <input type="text" placeholder="Github Id" id="github" className="focus:outline-none rounded-sm p-2 bg-white w-full"></input>
                </div>
            </div>
        </div>
    )
}
