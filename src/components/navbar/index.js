import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import "./index.css";

export default function Navbar( { handleMainTl, ripple }) {

useEffect(()=>{

})

    return (
        <Row className="justify-content-end">
            <Col xl={8} className=" d-flex justify-content-end align-items-center">
            <ul className="w-100 p-3 d-flex justify-content-around align-items-end">
                <li>
                <Link onClick={handleMainTl} to="/">
                <h6>prototype.about()</h6>
                </Link>               
                </li>
                <li>
                <Link onClick={handleMainTl} to="/"> <h6>prototype.projects()</h6></Link>
               
                </li>
                <li>
                <Link onClick={handleMainTl} to="/"> <h6>prototype.technologies()</h6></Link>
               
                </li>
                <li>
                <Link onClick={handleMainTl} to="/"> <h6>prototype.haveFun()</h6></Link>
               
                </li>
            </ul>
            </Col>
        </Row>


    )

}