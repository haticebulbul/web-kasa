import React, { useContext, useState, useRef } from 'react';
import { Typography, CircularProgress } from '@mui/material';
import ProductContext from '../context/Products';
import ReactToPrint from 'react-to-print';
import '../Receipt.css';

const Receipt = () => {
    const { completedTransactionDetails, getTotalPriceWithPromotion, calculateTotalPaid, sendEmail } = useContext(ProductContext);
    const [isPrinting, setIsPrinting] = useState(false);

    const receiptRef = useRef(null);

    const handlePrint = async () => {
        setIsPrinting(true);
        try {
            const email = 'receiver@example.com'; 
            const emailSentSuccessfully = await sendEmail(email, completedTransactionDetails);

            if (emailSentSuccessfully) {
                console.log('Email successfully sent to:', email);
            } else {
                console.error('Failed to send email to:', email);
            }
        } catch (error) {
            console.error('E-posta gönderilirken bir hata oluştu:', error);
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
        return <Typography variant="h6">İşlem detayı bulunamadı.</Typography>;
    }

    const { basket, totalPaid, totalPriceWithPromotion, changeAmount } = completedTransactionDetails;

    return (
        <div>
            <div className="fis-container" ref={receiptRef}>
                <div className="fis-header">
                    <p className="market-adi">32 Bit</p>
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
            <ReactToPrint
                trigger={() => (
                    <button className="yazdir-buton" onClick={handlePrint} disabled={isPrinting}>
                        {isPrinting ? 'Yazdırılıyor...' : 'Yazdır'}
                    </button>
                )}
                content={() => receiptRef.current}
                onAfterPrint={handlePrint}
            />
        </div>
    );
};

export default Receipt;
