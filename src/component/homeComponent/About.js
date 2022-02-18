import Card from "@mui/material/Card";
import {CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import about1 from "../../img/about1.png";
import about2 from "../../img/about2.png";
import about3 from "../../img/about3.png";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";

export default function About() {
    return (
        <div className="container" align={'center'} id={'about'}>
            <div className="row">
                <div className="col-md-12 mt-4">
                    <h3><b>เกี่ยวกับระบบ</b></h3>
                </div>
                <div className="col-md-4 mt-3">
                    <Card sx={{ maxWidth: 300 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="250"
                                image={about1}
                                alt="about1"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    <b>คลังสะสมทักษะใหม่</b>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    คลังสะสมทักษะที่ทักษะตรงตามความต้องการของบริษัทอย่างแท้จริง ความใหม่และการอัพเดตตลอดของคลังสะสมทักษะไอที
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
                <div className="col-md-4 mt-3">
                    <Card sx={{ maxWidth: 300 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="250"
                                image={about2}
                                alt="about2"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    <b>เรซูเม่ตามความสามารถ</b>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ใช้งานระบบสามารถแสดงผลหรือเลือกได้ตามต้องการ ว่าต้องการนำเสนอทักษะใดๆบ้างกับบริษัท สามารถบันทึกส่งกับบริษัทได้
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
                <div className="col-md-4 mt-3">
                    <Card sx={{ maxWidth: 300 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="250"
                                image={about3}
                                alt="about3"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    <b>หางานกับบริษัทพันธมิตร</b>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    บริษัทสร้างทักษะขึ้นมาเพื่อทำการทดสอบก่อนเข้ารับงาน ตรงตามความต้องการและจุดประสงค์ที่แท้จริงได้พนักงานที่มีคุณภาพ
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            </div>
        </div>
    )
}