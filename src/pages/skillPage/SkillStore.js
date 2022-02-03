import React from "react";
import Sidebar from '../../component/configComponent/SidebarChild';
import SkillStoreTable from "../../component/SkillComponent/SkillStoreTable";

export default function SkillStore() {
    return (
        <>
            <Sidebar mark={'skillStore'}>
                <SkillStoreTable />
            </Sidebar>
        </>
    )
}