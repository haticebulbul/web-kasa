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
    const [scannedProduct, setScannedProduct] = useState(null);
    const [barcode, setBarcode] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [promotion, setPromotion] = useState(null);
    const [quantityInputMode, setQuantityInputMode] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [currentProduct, setCurrentProduct] = useState(null);
    const [partialPayments, setPartialPayments] = useState({});
    const [completedTransaction, setCompletedTransaction] = useState(null); // Ödeme bilgilerini saklayacak state

   
    
    const categories = ['All', 'Meyve', "Sebze", 'Süt Ürünleri', 'İçecek', 'Atıştırmalık', 'Temel Gıda', 'Fırından', 'Et Ürünleri', 'Dondurulmuş Gıda', 'Dondurma', 'Hazır Gıda', 'Kuruyemiş', 'Tatlı', 'Temizlik', 'Kişisel Bakım'];

    const fetchProducts = useCallback(async (pageNum = 1, resetData = false) => {
        try {
            setIsLoading(true);
            setIsError(false);
            const resPro = await fetch(`/products?page=${pageNum}`);
            const res = await resPro.json();
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

    const handleBarcodeScan = (barcode) => {
        const product = data.find(item => item.barkod === barcode.toString());
        if (product) {
            addToBasket(product); // Add the product to the basket if found
        } else {
            alert('Product not found');
        }
    };

    const handleInputChange = (event) => {
        setBarcode(event.target.value);
    };

    const handleScan = () => {
        handleBarcodeScan(barcode);
        setBarcode(''); // Clear the input after scanning
    };

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
    }, [activeCategory, fetchProducts]);

    const filteredProducts = activeCategory === 'All'
        ? data
        : data.filter((product) => product.category === activeCategory);

    const getTotalPrice = () => {
        return basket.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // const getTotalPriceWithPromotion = () => {
    //     return basket.reduce((total, item) => {
    //         if (promotion === '3_for_2') {
    //             const discountQuantity = Math.floor(item.quantity / 3);
    //             const normalQuantity = item.quantity - discountQuantity;
    //             return total + (normalQuantity * item.price);
    //         }
    //         return total + (item.quantity * item.price);
    //     }, 0);
    // };
    const getTotalPriceWithPromotion = () => {
        return basket.reduce((total, item) => {
            const discountQuantity = Math.floor(item.quantity / 3);
            const normalQuantity = item.quantity - discountQuantity;
            return total + (normalQuantity * item.price);
        }, 0);
    };
    const clearBasket = () => {
        setBasket([]);
    };

    const toggleSelectItem = (itemId) => {
        setSelectedItems(prevSelected => 
            prevSelected.includes(itemId) ? prevSelected.filter(id => id !== itemId) : [...prevSelected, itemId]
        );
    };

    const removeSelectedItems = () => {
        setBasket(prevBasket => prevBasket.filter(item => !selectedItems.includes(item.id)));
        setSelectedItems([]);
    };
 
    const applyPromotion = (promo) => {
        setPromotion(promo);
    };

    const adjustProductQuantity = (productId, quantity) => {
        setBasket(prevBasket => {
            return prevBasket.map(item =>
                item.id === productId ? { ...item, quantity: quantity } : item
            );
        });
    };
  
    const startQuantityInputMode = (productId) => {
        setCurrentProductId(productId);
        setQuantity('');
        setQuantityInputMode(true);
    };

    const stopQuantityInputMode = () => {
        setCurrentProductId(null);
        setQuantity('');
        setQuantityInputMode(false);
    };


    return (
        <ProductContext.Provider value={{
            isLoading, isError,setIsError, data, page, setPage,hasMore, fetchProducts, handleScroll, setQuantity,
            activeCategory, categories, filteredProducts, setActiveCategory, addToBasket, basket,currentProduct, setCurrentProduct,
            handleBarcodeScan, barcode, setBarcode, handleInputChange, handleScan, getTotalPrice,
            getTotalPriceWithPromotion, clearBasket, toggleSelectItem, selectedItems, removeSelectedItems,
            applyPromotion, promotion, adjustProductQuantity, startQuantityInputMode, stopQuantityInputMode,
            partialPayments,setPartialPayments, setQuantityInputMode,stopQuantityInputMode,         setCompletedTransaction,

        }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContext;
