import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css"

export default function LandingPage() {
    return(
        <div className={styles.landing}>
            <div className={styles.card}>
                <h1 className={styles.t1}>ARCADE</h1>
                <h1 className={styles.t2}>-MANIA</h1>
                <Link to="/home"> 
                    <button className={styles.btn}>START</button>
                </Link>
            </div>
        </div>
    )
}