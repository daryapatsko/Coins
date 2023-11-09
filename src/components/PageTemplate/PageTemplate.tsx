import React, { ReactNode } from 'react'
import styles from "../../styles/PageTemplate.module.scss"
import Header from '../Header/Header'

const PageTemplate = ({ children }: any) => {
    return (
        <div className={styles.wrapper}>
            <Header/>
            <main>
                {children}
            </main>

        </div>
    )
}

export default PageTemplate
