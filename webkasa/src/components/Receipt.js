import React, { useContext, useRef ,useState} from 'react';
import { Box, Paper, Typography, CircularProgress  } from '@mui/material';
import ProductContext from '../context/Products';
import '../Receipt.css';

const Receipt = () => {
    const { basket, partialPayments, setCompletedTransaction } = useContext(ProductContext);
    const receiptRef = useRef();
    const [isPrinting, setIsPrinting] = useState(false);

    const calculateTotalPaid = () => {
        return Object.values(partialPayments).reduce((total, amount) => total + amount, 0);
    };

    const getTotalPriceWithPromotion = () => {
        return basket.reduce((total, item) => {
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

    const totalPrice = getTotalPriceWithPromotion();
    const totalPaid = calculateTotalPaid();
    const remainingAmount = Math.max(totalPrice - totalPaid, 0); // Kalan tutar 0'dan küçük olamaz
    const changeAmount = Math.max(totalPaid - totalPrice, 0); // Para üstü hesaplama

    return (
        <div>
        <div className="fis-container" ref={receiptRef}>
            
        <div className="fis-header">
          <p className="market-adi">Market Adı</p>
          <p className="tarih">Tarih: {new Date().toLocaleString()}</p>
        </div>
        <div className="fis-cizgi"></div> {/* Fiş çizgisi */}
        <div className="urunler">
          {basket.map((item) => (
            <div className="urun-satir" key={item.id}>
              <span className="urun-adi">{item.name}</span>
              <span className="urun-adet">{item.quantity} x {item.price.toFixed(2)}</span>
              <span className="urun-tutar">{(item.quantity * item.price).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="fis-cizgi"></div>
        <div className="fis-footer">
        <Typography variant="h6" align="right" gutterBottom>
          Toplam Tutar: {getTotalPriceWithPromotion().toFixed(2)} TL
        </Typography>
        <Typography variant="h6" align="right" gutterBottom>
          Ödenen Tutar: {totalPaid.toFixed(2)} TL
        </Typography>
        {remainingAmount > 0 && (
                        <Typography variant="h6" align="right" gutterBottom>
                            Kalan Tutar: {remainingAmount.toFixed(2)} TL
                        </Typography>
                    )}

                    {changeAmount > 0 && ( // Para üstü varsa göster
                        <Typography variant="h6" align="right" gutterBottom>
                            Para Üstü: {changeAmount.toFixed(2)} TL
                        </Typography>
                    )}
      </div>
      {isPrinting && ( // Yazdırma durumundayken loading göstergesi
                <div className="overlay">
                    <CircularProgress />
                </div>
            )}
      </div>
             
      <button className="yazdir-buton" onClick={handlePrint} disabled={isPrinting}>
                {isPrinting ? 'Yazdırılıyor...' : 'Yazdır'} 
            </button>

      </div>
        // <div>
        //     <Paper 
        //         ref={receiptRef}
        //         elevation={10} 
        //         sx={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px', marginBottom: '16px' }}>
        //         <Typography 
        //             variant="h4" 
        //             gutterBottom 
        //             sx={{ textAlign: 'center', fontWeight: 'bold', color: '#333' }}>
        //             Sanal Fiş
        //         </Typography>
        //         <Box sx={{ mb: 2 }}>
        //             <Typography variant="h6">Ürünler:</Typography>
        //             {basket.map(item => (
        //                 <Typography key={item.id}>{item.name} - {item.quantity} x {item.price} TL</Typography>
        //             ))}
        //         </Box>
        //         <Box sx={{ mb: 2 }}>
        //             <Typography variant="h6">Ödeme Yöntemleri:</Typography>
        //             {Object.keys(partialPayments).map(method => (
        //                 <Typography key={method}>{method}: {partialPayments[method]} TL</Typography>
        //             ))}
        //         </Box>
        //         <Box sx={{ mb: 2 }}>
        //             <Typography variant="h6">Toplam Ödenen: {totalPaid} TL</Typography>
        //             <Typography variant="h6">Kalan Tutar: {remainingAmount} TL</Typography>
        //         </Box>
        //     </Paper>
        //     <Button 
        //         variant="contained" 
        //         color="primary" 
        //         onClick={handlePrint} 
        //         sx={{ display: 'block', margin: '0 auto' }}>
        //         Fişi Yazdır
        //     </Button>
        // </div>
    );
};

export default Receipt;
