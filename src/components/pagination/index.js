import "./style.css"

const Pagination = ({ currentPage, paginationLength, setCurrentPage }) => {
    const paginationBoxes = new Array(paginationLength).fill("")
    return (<div className='pagination'>
        {paginationBoxes.map((_, index) => {
            return <p key={index} className={`paginationItem ${currentPage === index + 1 ? "active" : ""}`} onClick={() => {
                setCurrentPage(index + 1)
            }}>{index + 1}</p>
        })}
    </div >)
};

export default Pagination;