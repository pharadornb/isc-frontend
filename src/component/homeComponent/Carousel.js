import React from "react"
import test from '../../assets/images/triangles-1430105__480.png'
import SimpleImageSlider from "react-simple-image-slider"

export default function Carousel() {

    const images = [
        {
            url: test,
        },
        {
            url: "https://static2.tripoto.com/media/filter/tst/img/735873/TripDocument/1537686560_1537686557954.jpg",
        },
        {
            url: test,
        },
        {
            url: "https://i.natgeofe.com/n/f7732389-a045-402c-bf39-cb4eda39e786/scotland_travel_4x3.jpg",
        },
        {
            url: "https://www.tusktravel.com/blog/wp-content/uploads/2020/07/Best-Time-to-Visit-Darjeeling-for-Honeymoon.jpg",
        },
        {
            url: test,
        },
        {
            url: "https://images.ctfassets.net/bth3mlrehms2/6Ypj2Qd3m3jQk6ygmpsNAM/61d2f8cb9f939beed918971b9bc59bcd/Scotland.jpg?w=750&h=422&fl=progressive&q=50&fm=jpg",
        },
        {
            url: "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/02/summer-7.jpg",
        }
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
                // autoPlay={true}
                slideDuration={2.5}
                autoPlayDelay={5}
            />
        </div>
    )
}