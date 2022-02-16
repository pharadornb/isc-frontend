import React, {Fragment, useState, useEffect, useRef} from "react";
import fog from "vanta/dist/vanta.fog.min";

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
                    <h3><b>พาร์ทเนอร์บริษัทเรา</b></h3>
                </div>
            </div>
        </Fragment>
    )
}