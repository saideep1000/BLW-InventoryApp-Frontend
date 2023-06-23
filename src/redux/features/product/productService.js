import axios from "axios"


const BACKEND_URL=process.env.REACT_APP_BACKEND_URL

const API_URL=`${BACKEND_URL}/api/products`

// Create New Product
 const createProduct=async (formData)=>{
       const response=await axios.post(API_URL,formData)
       return response.data
}

// Get All Products
 const getProducts=async ()=>{
       const response=await axios.get(API_URL)
       return response.data
}

//Delete the requested product
const deleteProduct=async(id)=>{
    const response=await axios.delete(API_URL+"/"+id)
    return response.data;
}

// Get a Product
const getProduct = async (id) => {
    const response = await axios.get(API_URL +"/"+ id);
    return response.data;
  };

// Upadate or Edit the product details
const updateProduct=async (id,formData)=>{
    const response=await axios.patch(`${API_URL}/${id}`,formData)
    return response.data;
}

const productService={
    createProduct,
    getProducts,
    deleteProduct,
    updateProduct,
    getProduct
}

export default productService;