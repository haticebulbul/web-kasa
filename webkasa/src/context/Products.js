// import React, { createContext, useState, useRef } from 'react';
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
// const ProductContext = createContext();

// export const ProductProvider = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);  // Sayfa takibi
//   const [hasMore, setHasMore] = useState(true);  // Daha fazla veri kontrolü

//   const fetchProducts = async () => {
//     if (!hasMore || isLoading) return; // Zaten yükleme yapılıyorsa veya daha fazla veri yoksa çıkış yap
//     try {
//       setIsLoading(true);
//       setIsError(false);
//       const skip = (page - 1) * 5; // Sayfaya göre atlama hesabı

//       const resPro = await fetch(`/products?limit=5&skip=${skip}`);
//       const res = await resPro.json();

//       if (Array.isArray(res.products) && res.products.length) {
//         setData(prevData => [...prevData, ...res.products]); // Yeni ürünleri ekle
//         setHasMore(res.products.length === 5); // Limit kadar veri geldiyse devam et
//       } else {
//         setHasMore(false); // Daha fazla veri yoksa durdur
//       }

//     } catch (err) {
//       setIsError(true);
//     } finally {
//       setIsLoading(false);
//       setPage(prevPage => prevPage + 1); // Sonraki sayfaya geç
//     }
//   };

//   return (
//     <ProductContext.Provider value={{ fetchProducts, isLoading, isError, data, hasMore }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };

// export default ProductContext;
