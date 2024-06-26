import React, { useContext, useRef, useState } from 'react';
import { Typography, CircularProgress } from '@mui/material';
import ProductContext from '../context/Products';
import '../Receipt.css';

const Receipt = React.forwardRef((props, ref) => {
    const { completedTransactionDetails, getTotalPriceWithPromotion, calculateTotalPaid,handleConfirmEmail,sendEmail } = useContext(ProductContext);
    const [isPrinting, setIsPrinting] = useState(false);
    
    const handlePrint = async () => {
        setIsPrinting(true);
        try {
            const email = 'receiver@example.com'; // Burada e-posta alıcısını belirtiyorsunuz
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

    // const handlePrint = async () => {
    //     setIsPrinting(true);
    
    //     try {
    //       // E-posta gönderme işlemi
    //       const response = await fetch('/send-email', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           email: 'receiver@example.com', // E-posta alıcısı
    //           receipt: {
    //             // Gönderilecek içerik
    //             basket: completedTransactionDetails.basket,
    //             totalPaid: completedTransactionDetails.totalPaid,
    //             totalPriceWithPromotion: completedTransactionDetails.totalPriceWithPromotion,
    //             changeAmount: completedTransactionDetails.changeAmount,
    //           },
    //         }),
    //       });
    
    //       if (response.ok) {
    //         console.log('E-posta başarıyla gönderildi.');
    //         // E-posta başarıyla gönderildiğinde yapılacak işlemler buraya gelebilir
    //       } else {
    //         console.error('E-posta gönderilirken bir hata oluştu.');
    //       }
    //     } catch (error) {
    //       console.error('E-posta gönderilirken bir hata oluştu:', error);
    //     } finally {
    //       setIsPrinting(false);
    //     }
    //   };
    

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
            <div className="fis-container" ref={ref}>
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
});

export default Receipt;
