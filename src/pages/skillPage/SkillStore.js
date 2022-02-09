import React from "react";
import Sidebar from '../../component/configComponent/SidebarChild';
import SkillStoreTable from "../../component/SkillComponent/SkillStoreTable";
import SkillUserTable from "../../component/SkillComponent/SkillUserTable";

export default function SkillStore() {
    return (
        <>
            <Sidebar mark={'skillStore'}>
                <SkillStoreTable />
                <SkillUserTable />
            </Sidebar>
        </>
    )
}