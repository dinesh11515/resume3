import Navbar from "./Navbar";
import React from "react";
import {ReactNode} from "react";
interface Prop {
    children?: ReactNode;
}

export default function Layout({ children}: Prop) {
    return (
        <div className="layout">
            <Navbar />
            {children}
        </div>
    );
}