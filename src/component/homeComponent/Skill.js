import React, {useEffect, useState} from "react";
import "./SkillStyle.css";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

export default function Skill() {

    const [showLoading, setLoading] = useState(false);
    const [publicSkill, setPublicSkill] = useState([]);

    useEffect(() => {
        const SkillPublic = () => {

            setLoading(true);
            try {
                axios
                    .post("skill/publicSkill", {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            setPublicSkill(res.data);
                            setLoading(false);
                        }
                    });
            } catch (err) {
                console.log(err);
            }
        };

        SkillPublic();
    }, []);

    return (
        <>
            <div id="skill"/>
            <div className="container" align={'center'}>
                <div className="row">
                    <div className="col-md-12 mt-5 mb-2">
                        <h3><b>การ์ดคลังทักษะใหม่</b></h3>
                    </div>
                    <div className="col-md-12">
                        <section className="card-list d-flex justify-content-center">
                            {showLoading === true && <CircularProgress />}
                            {publicSkill.map((data, i) => (
                                <article
                                    className="card" style={{
                                    background: "url('data:image/png;base64," + data.skill_logo + "')",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "80%",
                                    backgroundPosition: "bottom 50px right 20px",
                                    backgroundColor: "white",
                                }} key={data.skill_id}>
                                    <header className="card-header">
                                        <p><b>โดย: </b>{data.uc_name}</p>
                                        <h2><b>{data.skill_name}</b></h2>
                                    </header>
                                </article>
                            ))}
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}