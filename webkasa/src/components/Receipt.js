import React, { useContext, useRef, useState, useEffect } from 'react';
import { Box, Paper, Typography, CircularProgress, Button } from '@mui/material';
import ProductContext from '../context/Products';
import '../Receipt.css';

const Receipt = () => {
    const { basket, partialPayments, setCompletedTransaction, setBasket, setPartialPayments } = useContext(ProductContext);
    const receiptRef = useRef();
    const [isPrinting, setIsPrinting] = useState(false);
    const [receiptData, setReceiptData] = useState({ basket: [], partialPayments: {} });

    const calculateTotalPaid = (payments) => {
        return Object.values(payments).reduce((total, amount) => total + amount, 0);
    };

    const getTotalPriceWithPromotion = (items) => {
        return items.reduce((total, item) => {
            const discountQuantity = Math.floor(item.quantity / 3);
            const normalQuantity = item.quantity - discountQuantity;
            return total + (normalQuantity * item.price);
        }, 0);
    };

    const handlePrint = async () => {
        setIsPrinting(true);
        setCompletedTransaction(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            window.print();
        } finally {
            setIsPrinting(false);
        }
    };

    useEffect(() => {
        // Store a copy of the basket and partial payments before clearing them
        setReceiptData({ basket, partialPayments });

        // Clear the basket and payments
        setBasket([]);
        setPartialPayments({});
    }, [basket, partialPayments, setBasket, setPartialPayments]);

    const totalPrice = getTotalPriceWithPromotion(receiptData.basket);
    const totalPaid = calculateTotalPaid(receiptData.partialPayments);
    const remainingAmount = Math.max(totalPrice - totalPaid, 0);
    const changeAmount = Math.max(totalPaid - totalPrice, 0);

    return (
        <div>
            <div className="fis-container" ref={receiptRef}>
                <div className="fis-header">
                    <p className="market-adi">Market Adı</p>
                    <p className="tarih">Tarih: {new Date().toLocaleString()}</p>
                </div>
                <div className="fis-cizgi"></div>
                <div className="urunler">
                    {receiptData.basket.map((item) => {
                        const discountQuantity = Math.floor(item.quantity / 3);
                        const normalQuantity = item.quantity - discountQuantity;
                        const totalItemPrice = normalQuantity * item.price;

                        return (
                            <div className="urun-satir" key={item.id}>
                                <span className="urun-adi">{item.name}</span>
                                <span className="urun-adet">{normalQuantity} x {item.price.toFixed(2)}</span>
                                <span className="urun-tutar">{totalItemPrice.toFixed(2)}</span>
                            </div>
                        );
                    })}
                </div>
                <div className="fis-cizgi"></div>
                <div className="fis-footer">
                    <Typography variant="h6" align="right" gutterBottom>
                        Toplam Tutar: {totalPrice.toFixed(2)} TL
                    </Typography>
                    <Typography variant="h6" align="right" gutterBottom>
                        Ödenen Tutar: {totalPaid.toFixed(2)} TL
                    </Typography>
                    {remainingAmount > 0 && (
                        <Typography variant="h6" align="right" gutterBottom>
                            Kalan Tutar: {remainingAmount.toFixed(2)} TL
                        </Typography>
                    )}
                    {changeAmount > 0 && (
                        <Typography variant="h6" align="right" gutterBottom>
                            Para Üstü: {changeAmount.toFixed(2)} TL
                        </Typography>
                    )}
                </div>
                {isPrinting && (
                    <div className="overlay">
                        <CircularProgress />
                    </div>
                )}
            </div>
            <button className="yazdir-buton" onClick={handlePrint} disabled={isPrinting}>
                {isPrinting ? 'Yazdırılıyor...' : 'Yazdır'}
            </button>
        </div>
    );
};

export default Receipt;
