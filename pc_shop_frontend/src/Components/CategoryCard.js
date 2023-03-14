import { Card } from "react-bootstrap";
import React, {useState} from "react";
import {Link} from "react-router-dom"
import api_socket from "../network";

const CategoryCard = ({ cat_id, pic, name }) => {
    return (
        <Card>
            <Link to={`/category/${cat_id}`}>
                <Card.Img variant="top" src={`http://${api_socket}/${pic}`}/>
            </Link>
            <Card.Body>
                <Link to={`/category/${cat_id}`}>
                    <Card.Title>{name}</Card.Title>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default CategoryCard;