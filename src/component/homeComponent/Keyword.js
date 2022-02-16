import React, {Fragment, useState, useEffect, useRef} from "react";
import net from "vanta/dist/vanta.net.min";

export default function Keyword() {

    const [vantaEffect, setVantaEffect] = useState(0);
    const myRef = useRef(null);
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                net({
                    el: myRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00
                })
            );
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    return (
        <Fragment>
            <div style={{ height: "500px", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }} ref={myRef}>
                <div className="card-title mt-2" style={{color: "white", textAlign: "center"}}>
                    <h2 className="font-weight-bold">" iT Skill Collect Service " <br/></h2>
                    <h4>บริการสะสมคลังทักษะเทคโนโลยีสารสนเทศ</h4>
                </div>
            </div>
        </Fragment>
    )
}