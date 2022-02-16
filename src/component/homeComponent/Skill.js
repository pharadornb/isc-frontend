import React from "react";
import "./SkillStyle.css";

export default function Skill() {
    return (
        <div className="container" align={'center'}>
            <div className="row">
                <div className="col-md-12 mt-5 mb-2">
                    <h3><b>การ์ดคลังทักษะใหม่</b></h3>
                </div>
                <div className="col-md-12">
                    <section className="card-list d-flex justify-content-center">
                        <article
                            className="card" style={{background: "url('https://img.wongnai.com/p/368x484/2020/09/12/0b50641418034f40b1443612d0b16a0b.jpg')", backgroundSize: "cover"}}>
                            <header className="card-header">
                                <p>วังใหม่</p>
                                <h2>Paradise Lost Siam @ Siam</h2>
                            </header>
                        </article>
                        <article
                            className="card" style={{background: "url('https://img.wongnai.com/p/368x484/2020/09/12/0b50641418034f40b1443612d0b16a0b.jpg')", backgroundSize: "cover"}}>
                            <header className="card-header">
                                <p>วังใหม่</p>
                                <h2>Paradise Lost Siam @ Siam</h2>
                            </header>
                        </article>
                        <article
                            className="card" style={{background: "url('https://img.wongnai.com/p/368x484/2020/09/12/0b50641418034f40b1443612d0b16a0b.jpg')", backgroundSize: "cover"}}>
                            <header className="card-header">
                                <p>วังใหม่</p>
                                <h2>Paradise Lost Siam @ Siam</h2>
                            </header>
                        </article>
                        <article
                            className="card" style={{background: "url('https://img.wongnai.com/p/368x484/2020/09/12/0b50641418034f40b1443612d0b16a0b.jpg')", backgroundSize: "cover"}}>
                            <header className="card-header">
                                <p>วังใหม่</p>
                                <h2>Paradise Lost Siam @ Siam</h2>
                            </header>
                        </article>
                    </section>
                </div>
            </div>
        </div>
    )
}