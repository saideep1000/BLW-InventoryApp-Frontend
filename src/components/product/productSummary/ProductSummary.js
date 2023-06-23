import React, { useEffect } from 'react'
import './ProductSummary.scss'
import {FaRupeeSign} from "react-icons/fa"
import {BiCategory} from "react-icons/bi"
import {BsCartPlus,BsCartXFill} from "react-icons/bs";
import InfoBox from '../../infoBox/InfoBox';
import { useDispatch,useSelector } from 'react-redux';
import { selectTotalStoreValue } from '../../../redux/features/product/productSlice';
import { CALC_STORE_VALUE } from '../../../redux/features/product/productSlice';
import { CALC_OUTOFSTOCK } from '../../../redux/features/product/productSlice';
import { selectOutOfStock } from '../../../redux/features/product/productSlice';
import { CALC_CATEGORY } from '../../../redux/features/product/productSlice';
import { selectCategory } from '../../../redux/features/product/productSlice';

//Icons
const earningIcon=<FaRupeeSign size={40} color="#fff"/>
const productIcon=<BsCartPlus size={40} color="#fff"/>
const categoryIcon=<BiCategory size={40} color="#fff"/>
const outOfStockIcon=<BsCartXFill size={40} color='#fff'/>

//Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSummary = ({products}) => {

  const dispatch=useDispatch()
  const totalStoreValue=useSelector(selectTotalStoreValue)
  const outOfStock=useSelector(selectOutOfStock)
 const category=useSelector(selectCategory)

  useEffect(()=>{
     dispatch(CALC_STORE_VALUE(products))
     dispatch(CALC_OUTOFSTOCK(products))
     dispatch(CALC_CATEGORY(products))
  },[dispatch,products])

  return (
    <div className='product-summary'>
        <h3 className='--mt'>Inventory Statistics Overview</h3>
        <div className='info-summary'>
            <InfoBox icon={productIcon} title={"Total Products"} count={products.length} bgColor='card1'/>
            <InfoBox icon={earningIcon} title={"Total Store Value"} count={formatNumbers(totalStoreValue.toFixed(2))} bgColor="card2"/>
            <InfoBox icon={outOfStockIcon} title={"Out of Stock"} count={outOfStock} bgColor="card3"/> 
            <InfoBox icon={categoryIcon}  title={"All Categories"} count={category.length} bgColor="card4"/>
        </div>
    </div>
  )
}

export default ProductSummary
