import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { setCurrentPage } from '../../store/store'
import styles from "../../styles/Pagination.module.scss"
import Button from '../Button/Button'


const Pagination = () => {
    const dispatch = useDispatch()
    const currentPage = useSelector((state: RootState) => state.pagination.currentPage)
    const handleNextPage = () => {
        dispatch(setCurrentPage(currentPage + 1))
    }
    // const handlePrevPage = () => {
    //     if (currentPage > 1) {
    //         dispatch(setCurrentPage(currentPage - 1))
    //     }
    // }
    return (
        <>
            {/* <button onClick={handlePrevPage}>Previous Page</button> */}
            <Button onClick={handleNextPage} title='View More' customClass={styles.btn_pagination}/>

        </>
    )
}

export default Pagination
