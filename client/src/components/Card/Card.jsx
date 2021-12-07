import React from "react";
import styles from "./Card.module.css"

export default function Card({ name, img, genre, rating }) {
    return (
        <div className={styles.cards}>
            <div className={styles.cardContainer}>
                <div className={styles.titRat}>
                    <h3 className={styles.cardTitle}>{name.toUpperCase()}</h3>
                    <h5 className={styles.cardRat}>{rating}</h5>
                </div>
                <hr className={styles.hr}/>
                <div className={styles.cardGen}>
                    {
                        genre?.map(el =>{
                            return(
                                <h5 className={styles.gen}>{el.toUpperCase()}</h5>
                            )
                        })
                    }
                    
                </div>
                <img className={styles.cardImg} src={img} alt="GAME" width="330px" height="230px" />
            </div>
        </div>
    )
}