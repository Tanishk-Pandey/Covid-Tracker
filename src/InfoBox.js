import React from 'react'
import { Card, CardContent, Typography } from "@mui/material"
import "./InfoBox.css"
const InfoBox = (props) => {
    return (
        <div>
            <Card onClick={props.onClick} className={`infoBox ${props.active && 'infoBox--selected'} ${props.isRed && "infoBox--red"}`}>
                <CardContent>
                    <Typography className='infoBox__title' >
                        {props.title}
                    </Typography>
                    <h2 className='heading__cases' >{props.cases}</h2>
                    <Typography className='infoBox__total' color="textSecondary">
                        {props.total} Total
                    </Typography>
                </CardContent>
            </Card>
        </div >
    )
}

export default InfoBox
