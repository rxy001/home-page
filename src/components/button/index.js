import React from 'react'
import styles from './sytle.module.css'

export default function (props) {
    return (
        <button className={styles.container}>
            <span>{props.title}</span>
        </button>
    )
}
