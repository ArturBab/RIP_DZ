import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from "react-router-dom";


const BasicBreadcrumbs = ({ props }) => {
    return (
        <div role="presentation" id={"navbar"} className={"navbar"}>
            <Breadcrumbs aria-label="breadcrumb">
                {props.map((item, index) => {
                    if (index !== props.length - 1) {
                        return (
                            <Link to={`..${item.ref}`} key={index} underline={"hover"}>{item.text}</Link>
                        )
                    }
                })}
                <Typography color="text.primary">{props[props.length - 1].text}</Typography>
            </Breadcrumbs>
        </div>
    );
}

export default BasicBreadcrumbs