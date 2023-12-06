'use client'

import Image from 'next/image';
import {useState, useEffect} from 'react'

const MyHome = () => {

    const [products,setProducts] = useState([]);
    const [page,setPage] = useState(1);
    // const [products,setProducts] = useState();
    // const [products,setProducts] = useState();



    const fetchProducts = async () => {
    const res = await fetch('https://dummyjson.com/products')
    const data = await res.json();
    
    if(data && data.products) {
      setProducts(data.products)
    }
  }

  useEffect(() => {
    fetchProducts()
  },[])

  const  selectPageHandler = (selectedPage) => {
    
    if (
      selectedPage >= 1 && 
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    )
    
    setPage(selectedPage)
  }
  
  return (
    <div>
      {
        products.length > 0 && <div  className='m-20 grid gap-5 grid-cols-3 '>
          {
            products.slice(page * 10 - 10, page * 10).map((prod) => (
              <span className='h-[150px] p-5 bg-gray-300 
              text-center rounded-md cursor-pointer' key={prod.id}>
                {prod.title}
                <Image className='w-full h-[95%] object-cover mb-1' src={prod.thumbnail} alt={prod.title}
                width={1000} height={100} />
              </span>
            ))
          }
        </div>
      }
       {
        products.length > 0 &&  <div className="flex justify-center p-2 my-4">
          
          <span onClick={() => selectPageHandler(page - 1)} 
          className={page > 1 ? 'hi' : 'opacity-0 pointer-events-none hi'} >prev </span>

           {
            [...Array(products.length / 10)].map((_,index) => (
              <span onClick={() => selectPageHandler(index + 1) }
              
              className={ page === index + 1 ? 'hi_current hi' : 'hi'} key={index}>{index + 1} </span>
            ))
           }
          

          <span onClick={() => selectPageHandler(page + 1)}
           className={page < products.length / 10 ? 'hi' : 'opacity-0 pointer-events-none hi'}
          > Next</span>
        </div>
       }
    </div>
  )
}

export default MyHome