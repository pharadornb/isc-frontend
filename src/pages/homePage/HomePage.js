import React from 'react';
import Navbar from "../../component/homeComponent/Navbar"
import Carousel from "../../component/homeComponent/Carousel"
import About from "../../component/homeComponent/About";
import Keyword from "../../component/homeComponent/Keyword";
import Skill from "../../component/homeComponent/Skill";
import Company from "../../component/homeComponent/Company";
import Footer from "../../component/homeComponent/Footer";

export default function HomePage() {
    return(
        <>
            <Navbar />
            <Carousel />
            <About />
            <Keyword />
            <Skill />
            <Company />
            <Footer />
        </>
    )
}