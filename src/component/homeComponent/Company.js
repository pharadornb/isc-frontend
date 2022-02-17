import React, {Fragment, useState, useEffect, useRef} from "react";
import fog from "vanta/dist/vanta.fog.min";
import {Link} from "react-router-dom";

export default function Company() {

    const [vantaEffect, setVantaEffect] = useState(0);
    const myRef = useRef(null);
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                fog({
                    el: myRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    highlightColor: 0xa7584,
                    midtoneColor: 0x512f2,
                    lowlightColor: 0xf4c98,
                    baseColor: 0x4f98c3
                })
            );
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    return (
        <Fragment>
            <div style={{
                height: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px"
            }} ref={myRef}>
                <div className="card-title mt-2" style={{color: "white", textAlign: "center"}}>
                    <h3><b>" มาใช้ระบบด้วยกันน่ะ จะได้เห็นถึงความสามารถอันไม่มีขีดจำกัดและพรมแดน "</b></h3>
                    <Link style={{textDecoration: 'none'}} to={'/register'}>
                        <button type={'submit'} className={'btn btn-success mt-2'}>สมัครสมาชิก</button>
                    </Link>
                </div>
            </div>
        </Fragment>
    )
}