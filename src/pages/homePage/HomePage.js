import React, {useState} from 'react';
import Navbar from "../../component/homeComponent/Navbar"
import Carousel from "../../component/homeComponent/Carousel"
import About from "../../component/homeComponent/About";
import Keyword from "../../component/homeComponent/Keyword";
import Skill from "../../component/homeComponent/Skill";
import Company from "../../component/homeComponent/Company";
import Footer from "../../component/homeComponent/Footer";
import Modal from "react-bootstrap/Modal";

export default function HomePage() {

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    return(
        <>
            <Navbar />
            <Carousel />
            <About />
            <Keyword />
            <Skill />
            <Company />
            <Footer />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><b>News!</b></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{textAlign: "center"}}>
                    <h5><b>** Project Present **</b></h5>
                    <iframe width="450" height="350" src="https://www.youtube.com/embed/C58xn8LNJ_k"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen />
                    <table width={'100%'}>
                        <tr>
                            <td colSpan={3}>
                                <h5><b>** User Demo **</b></h5>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                #Role
                            </th>
                            <th>
                                Username :
                            </th>
                            <th>
                                Password :
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <u>user</u>
                            </td>
                            <td>
                                user@test
                            </td>
                            <td>
                                user
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <u>company</u>
                            </td>
                            <td>
                                company@test
                            </td>
                            <td>
                                company
                            </td>
                        </tr>
                    </table>
                </Modal.Body>
            </Modal>
        </>
    )
}