import React, { ReactNode } from 'react'
import styles from "../../styles/PageTemplate.module.scss"

const PageTemplate = ({ children }: any) => {
    return (
        <div className={styles.wrapper}>
            <main>
                {children}
            </main>

        </div>
    )
}

export default PageTemplate
