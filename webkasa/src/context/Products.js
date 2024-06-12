import React, { createContext, useState } from 'react';

const ProductContext = createContext(); 

export const ProductProvider = (  {children})=>{
    const [products, setProducts] = useState([]);

    
    const showAllProducts = ()=>{
      fetch('/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }
    const showProductsWithoutBarcodes =()=>{
        const filteredProducts = products.filter(product => !product.kod);
        setProducts(filteredProducts);
    }
return(
    <ProductContext.Provider value={{showProductsWithoutBarcodes,showAllProducts,products}}>
        {children}
    </ProductContext.Provider>
)

}
export default ProductContext;