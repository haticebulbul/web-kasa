import React, { useContext, useRef, useState, useEffect } from 'react';
import { Typography, CircularProgress } from '@mui/material';
import ProductContext from '../context/Products';
import '../Receipt.css';

const Receipt = () => {
    const { completedTransactionDetails ,getTotalPriceWithPromotion,calculateTotalPaid} = useContext(ProductContext);
    const receiptRef = useRef();
    const [isPrinting, setIsPrinting] = useState(false);

    const handlePrint = async () => {
        setIsPrinting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000)); 
            window.print();
        } finally {
            setIsPrinting(false);
        }
    };
    const calculateRemainingAmount = () => {
        const totalPrice = getTotalPriceWithPromotion();
        const totalPaid = calculateTotalPaid();
        return totalPrice - totalPaid;
      };
    if (!completedTransactionDetails) {
        return <Typography variant="h6">No transaction details available.</Typography>;
    }

    const { basket, totalPaid, totalPriceWithPromotion, changeAmount } = completedTransactionDetails;

    return (
        <div>
            <div className="fis-container" ref={receiptRef}>
                <div className="fis-header">
                    <p className="market-adi">Market Adı</p>
                    <p className="tarih">Tarih: {new Date().toLocaleString()}</p>
                </div>
                <div className="fis-cizgi"></div>
                <div className="urunler">
                    {basket.map((item) => {
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
                        Toplam Tutar: {totalPriceWithPromotion.toFixed(2)} TL
                    </Typography>
                    <Typography variant="h6" align="right" gutterBottom>
                        Ödenen Tutar: {totalPaid.toFixed(2)} TL
                    </Typography>
                    {changeAmount > 0 && (
                        <Typography variant="h6" align="right" gutterBottom>
                            Para Üstü: {changeAmount.toFixed(2)} TL
                        </Typography>
                    )}
                     {changeAmount === null && (
          <Typography variant="h6" align="right" gutterBottom>
            Kalan Tutar: {calculateRemainingAmount().toFixed(2)} TL
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
