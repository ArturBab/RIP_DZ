import { Card } from "react-bootstrap";
import React, {useState} from "react";
import {Link} from "@mui/material";
import api_socket from "../network";

const ProdCard = ({prod}) => {

    const [qty, setQty] = useState(prod.amount)
    const [name, setName] = useState(prod.name)
    const [cost, setCost] = useState(prod.price)
    const [desc, setDesc] = useState(prod.description)
    const [grp, setGrp] = useState(prod.group.name)

    return (
        <Card className="card mb-3" style={{maxWidth: 530}}>
            <Card.Body>
                <Link href={`/category/${prod.category.id}/product/${prod.id}`}>
                    <Card.Img variant="top" src={`http://${api_socket}/${prod.picture}`}/>
                </Link>
                <Link href={`/category/${prod.category.id}/product/${prod.id}`}>
                    <br/>
                    <br/>
                <Card.Title
                    style={{
                        fontFamily: "Bahnschrift",
                        fontSize: "35px",
                        color: "black"
                        }}>
                    {name}
                </Card.Title>
                </Link>
                <Card.Text
                    style ={{
                        fontFamily: "Bahnschrift Condensed"
                    }}
                >
                    Группа: {grp}
                </Card.Text>
                <Card.Text
                    style ={{
                        fontFamily: "Bahnschrift Condensed"
                    }}
                >
                    {desc}
                </Card.Text>
                <Card.Text
                    style={{
                        fontFamily: "Bahnschrift",
                        fontSize: "25px",
                    }}
                >
                    {cost} ₽
                </Card.Text>
            </Card.Body>
        </Card>

    )
}

export default ProdCard;