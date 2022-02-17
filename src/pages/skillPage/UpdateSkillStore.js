import React from "react";
import Sidebar from '../../component/configComponent/SidebarChild';
import {useParams} from "react-router-dom";
import EditSkillHeader from "../../component/updateSkillComponent/EditSkillHeader";

export default function UpdateSkillStore() {
    const { skillId } = useParams();

    return (
        <>
            <Sidebar mark={'skill'}>
                <EditSkillHeader edit={skillId}/>
            </Sidebar>
        </>
    )
}