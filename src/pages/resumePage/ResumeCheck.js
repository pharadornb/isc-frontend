import React from "react";
import Sidebar from '../../component/configComponent/SidebarChild'
import ResumeDialog from "../../component/resumeComponent/ResumeDialog";

export default function ResumeCheck() {
    return (
        <>
            <Sidebar mark={'checkResume'}>
                <ResumeDialog />
            </Sidebar>
        </>
    )
}