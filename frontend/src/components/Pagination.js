import React from 'react'

const Pagination = ({postsPerpage,totalPosts,paginate}) => {
    const pageNumbers = []
    for(let i=1;i<=Math.ceil(totalPosts/postsPerpage);i++){
        pageNumbers.push(i)
    }
  return (
    <div>
        <ul className='pagination justify-content-center'>
            {pageNumbers.map(number=>(
                <li key={number} className='page-item'><a onClick={()=>paginate(number)} href='#' className='page-link'>{number}</a></li>
            ))}
        </ul>
    </div>
  )
}

export default Pagination