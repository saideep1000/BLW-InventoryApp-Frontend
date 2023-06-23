import React ,{useEffect, useState} from 'react'
import "./ProductList.scss"
import { SpinnerImg } from '../../loader/Loader'
import {RiEditBoxFill} from "react-icons/ri"
import {FaTrashAlt} from "react-icons/fa"
import {AiOutlineEye} from "react-icons/ai"
import Search from '../../search/Search'
import { useSelector } from 'react-redux'
import { FILTER_PRODUCTS, selectFilteredProducts } from '../../../redux/features/product/filterSlice'
import { useDispatch } from 'react-redux'
import ReactPaginate from "react-paginate";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { deleteProduct, getProducts } from '../../../redux/features/product/productSlice'
import { Link } from 'react-router-dom'

const ProductList = ({products,isLoading}) => {

  const[search,setSearch]=useState("")
  const filteredProducts=useSelector(selectFilteredProducts)
  
  const dispatch=useDispatch()

  
  const shortenText=(text,n)=>{
    if(text.length>n)
    {
      const shortenedText=text.substring(0,n).concat("...")
      return shortenedText
    }
    return text;
  }

  const delProduct=async (id)=>{
       await dispatch(deleteProduct(id))
       await dispatch(getProducts())
  };

  const confirmDelete=(id)=>{
    confirmAlert({
      title: 'Delete Product',
      message: 'Are you sure to delete this product ..?.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => delProduct(id)
        },
        {
          label: 'Cancel',
         // onClick: () => alert('Click No')
        }
      ]
    });
  }

  //Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  //End Pagination

  useEffect(()=>{
    dispatch(FILTER_PRODUCTS({products,search}))
  },[products,search,dispatch])

  return (
    <div className='product-list'>
      <hr/>
      <div className='table'>
          <div className='--flex-between --flex-dir-column'>
            <span>
              <h3>
                Inventory Items
              </h3>
            </span>
            <span>
              <h3><Search value={search} onChange={(e)=>setSearch(e.target.value)} /></h3>
            </span>
          </div>

          {isLoading && <SpinnerImg/>}

        <div className='table'>
          {!isLoading && products.length===0 ? (
            <p>--No products found in iventory , please add a product....!!</p>
          ):(
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentItems.map((product,index)=>{
                    const {_id,name,category,price,quantity}=product
                    return (
                            <tr key={_id}>
                                    <td>{index+1}</td>
                                    <td>{shortenText(name,16)}</td>
                                    <td>{category}</td>
                                    <td>{"₹ "}{price}</td>
                                    <td>{quantity}</td>
                                    <td>{"₹ "}{price*quantity}</td>
                                    <td className='icons'>
                                      <span>
                                        <Link to={`/product-detail/${_id}`} >
                                        <AiOutlineEye size={19} color={"blue"}/></Link>
                                      </span>
                                      <span>
                                      <Link to={`/edit-product/${_id}`} >
                                        <RiEditBoxFill size={19} color={"green"}/  > 
                                        </Link>
                                      </span>
                                      <span>
                                        <FaTrashAlt size={15} color={"red"} onClick={()=> confirmDelete(_id)}/>
                                      </span>
                                    </td>
                            </tr>
                    )
                  })
                }
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  )
}

export default ProductList
