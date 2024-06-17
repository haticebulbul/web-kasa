// import React, { createContext, useState, useRef } from 'react';
import React, { createContext, useState ,useCallback,useEffect} from 'react';

const ProductContext = createContext(); 
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const ProductProvider = (  {children})=>{
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const fetchProducts = useCallback(async (pageNum = 1) => {
        try {
            setIsLoading(true);
            setIsError(false);
            const resPro = await fetch(`/products?page=${pageNum}`);
            const res = await resPro.json();
            console.log('Fetched products:', res);

            if (Array.isArray(res)) {
                const sortedData = [...data, ...res].sort((a, b) => a.name.localeCompare(b.name));
                setData(sortedData);
                if (res.length === 0) {
                    setHasMore(false);
                }
            }
        } catch (err) {
            console.error('Error fetching products:', err);
            setIsError(true);
        } finally {
            setIsLoading(false);
            setPage(pageNum);
        }
    }, [data]);
    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading || !hasMore) return;
        fetchProducts(page + 1);
    }, [fetchProducts, isLoading, hasMore, page]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);
    const filterProducts = useCallback((letter) => {
        if (letter === 'ALL') {
            setFilteredData(data);
        } else {
            const filteredProducts = data.filter(product => product.name.toUpperCase().startsWith(letter));
            setFilteredData(filteredProducts);
        }
    }, [data]);
return(
    <ProductContext.Provider value={{
        isLoading,filteredData,letters,isError,
        data,page,hasMore,fetchProducts,handleScroll,filterProducts}}>
        {children}
    </ProductContext.Provider>
)

}
export default ProductContext;
