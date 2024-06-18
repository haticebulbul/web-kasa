import React, { createContext, useState, useCallback, useEffect } from 'react';

const ProductContext = createContext(); 

export const ProductProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [basket, setBasket] = useState([]);

    const categories = ['All', 'Meyve',"Sebze",'Süt Ürünleri', 'İçecek','Atıştırmalık','Temel Gıda','Fırından','Et Ürünleri','Dondurulmuş Gıda','Dondurma','Hazır Gıda','Kuruyemiş', 'Tatlı',  'Temizlik', 'Kişisel Bakım'];

    const fetchProducts = useCallback(async (pageNum = 1, resetData = false) => {
        try {
            setIsLoading(true);
            setIsError(false);
            const resPro = await fetch(`/products?page=${pageNum}`);
            const res = await resPro.json();
            console.log('Fetched products:', res);

            if (Array.isArray(res)) {
                const sortedData = res.sort((a, b) => a.name.localeCompare(b.name));
                setData(prevData => resetData ? sortedData : [...prevData, ...sortedData]);
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
    }, []);

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading || !hasMore) return;
        fetchProducts(page + 1);
    }, [fetchProducts, isLoading, hasMore, page]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        fetchProducts(1, true); 
    }, [fetchProducts]);
    useEffect(() => {
        fetchProducts(1, true); 
    }, [fetchProducts]);

    useEffect(() => {
        fetchProducts(1, true); 
    }, [activeCategory, fetchProducts]);
    const addToBasket = (product) => {
        setBasket(prevBasket => {
            const existingProduct = prevBasket.find(item => item.id === product.id);
            if (existingProduct) {
                return prevBasket.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item 
                );
            } else {
                return [...prevBasket, { ...product, quantity: 1 }];
            }
        });
       
    };
    const filteredProducts = activeCategory === 'All'
        ? data
        : data.filter((product) => product.category === activeCategory);
    return (
        <ProductContext.Provider value={{
            isLoading, isError,
            data, page, hasMore, fetchProducts, handleScroll,
            activeCategory,categories,filteredProducts,setActiveCategory,
            basket,addToBasket
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContext;
