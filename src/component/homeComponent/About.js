import Card from "@mui/material/Card";
import {CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import test from "../../img/triangles-1430105__480.png";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";

export default function About() {
    return (
        <div className="container" align={'center'}>
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
                                image={test}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    <b>Online platform service</b>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic magnam neque obcaecati perspiciatis, reiciendis tenetur.
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
                                image={test}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
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
                                image={test}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard55555555
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            </div>
        </div>
    )
}