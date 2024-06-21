import React ,{useContext}from 'react';
import { Box, Paper, Typography } from '@mui/material';
import ProductContext from '../context/Products';
const Receipt = () => {
    const { basket ,  partialPayments,setPartialPayments} = useContext(ProductContext);
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

    const totalPrice = getTotalPriceWithPromotion();
    const totalPaid = calculateTotalPaid();
    const remainingAmount = totalPrice - totalPaid;

    return (
        <Paper elevation={10} sx={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px', marginBottom: '16px' }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#333' }}>
                Sanal Fiş
            </Typography>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h6">Ürünler:</Typography>
                {basket.map(item => (
                    <Typography key={item.id}>{item.name} - {item.quantity} x {item.price} TL</Typography>
                ))}
            </Box>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h6">Ödeme Yöntemleri:</Typography>
                {Object.keys(partialPayments).map(method => (
                    <Typography key={method}>{method}: {partialPayments[method]} TL</Typography>
                ))}
            </Box>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h6">Toplam Ödenen: {totalPaid} TL</Typography>
                <Typography variant="h6">Kalan Tutar: {remainingAmount} TL</Typography>
            </Box>
        </Paper>
    );
};

export default Receipt;