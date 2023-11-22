import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { setCurrentPage } from '../../store/store'
import styles from "../../styles/Pagination.module.scss"
import Button from '../Button/Button'
import { useGetDataPerPageQuery } from '../../actions/actions'


const Pagination = () => {
    const dispatch = useDispatch()
    const currentPage = useSelector((state: RootState) => state.pagination.currentPage)
    const { data } = useGetDataPerPageQuery(currentPage + 1);

    const handleNextPage = () => {
        dispatch(setCurrentPage(currentPage + 1));
    };
      return (
        <>
            <Button onClick={handleNextPage} title="View more" customClass={styles.btn_pagination} />
        </>
    )
}

export default Pagination
