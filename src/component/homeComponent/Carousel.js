import React from "react"
import banner1 from '../../img/Banner1.jpg'
import banner2 from '../../img/Banner2.jpg'
import banner3 from '../../img/Banner3.jpg'
import banner4 from '../../img/Banner4.jpg'
import banner5 from '../../img/Banner5.jpg'
import banner6 from '../../img/Banner6.jpg'
import SimpleImageSlider from "react-simple-image-slider";

export default function Carousel() {

    const images = [
        {
            url: banner1,
        },
        {
            url: banner2,
        },
        {
            url: banner3,
        },
        {
            url: banner4,
        },
        {
            url: banner5,
        },
        {
            url: banner6,
        },
    ];

    return (
        <div>
            <SimpleImageSlider
                width={'100%'}
                height={'450px'}
                images={images}
                showBullets={true}
                useGPURender={true}
                loop={true}
                autoPlay={true}
                slideDuration={2.5}
                autoPlayDelay={3.5}
            />
        </div>
    )
}