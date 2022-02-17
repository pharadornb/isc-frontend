import React, { useEffect } from 'react';

import axios from "axios";
import { useState } from "react";
import CustomContentProgressbar from "./CustomContentProgressbar";

export default function ProgressbarSkills(props){
    const [companySkillRequire, setCompanySkillRequire] = useState([]);
    // const [loading3, setLoading3] = useState(false);
    // var checkIndex= -1;
    // companySkillRequire -------------------------

    // checkIndex = props.index;
    // console.log(checkIndex);
    // console.log(props.index + " " + props.ucre_id);

   

    useEffect(() => {
        const dateSelect = () => {
            try {
                const params = JSON.stringify({
                    ucre_id: props.ucre_id
                });
        
                axios
                .post("resume/companySkillRequire",params, {
                    headers: {
                    "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        // console.log(res.data);
                        setCompanySkillRequire(res.data);
                        // setLoading3(true);
                    }
                });
            } catch (err) {
                console.log(err);
            }
        };

        dateSelect();
    },[props.ucre_id]);



    const ImageLogo = (props) => {
        var user_profile = "";
        if(props.user_profile){
            user_profile = "data:image/jpeg;base64," + props.user_profile;
        }
        return(
            <img
                src={user_profile}
                alt={props.skill_name}
                style={{
                    width: "20px",
                    height: "20px",
                    overflow: "hidden",
                }}
            />
        )
    }

    const ImageLogoSklil = (props) => {
        var skill_logo = "";
        if(props.skill_logo){
            skill_logo = "data:image/jpeg;base64," + props.skill_logo;
        }
        return(
            <img
                className="Sizeimg1"
                alt={props.skill_name}
                src={skill_logo}
            />
        )
    }

    // return(<></>)
    return(
        <>
            {companySkillRequire.map((rows, i) => 
                i<3 && (
                    <div className='scale-skills' key={i}>
                        <CustomContentProgressbar
                            percentage={rows.ucrs_point}
                        >
                            <div>
                                <ImageLogoSklil skill_logo={rows.skill_logo} skill_name={rows.skill_name} />
                            </div>
                        </CustomContentProgressbar>
                        <div className="box-center">
                            <span className="txtname">{rows.skill_name}</span>
                            <ImageLogo user_profile={rows.user_profile} skill_name={rows.skill_name} />
                        </div>
                    </div>
                )
            )}
        </>
    )
}