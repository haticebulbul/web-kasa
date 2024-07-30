import { http, HttpResponse } from 'msw'
import { faker } from '@faker-js/faker'; 
import { v4 as uuidv4 } from 'uuid';



const categories = ['Meyve', "Sebze", 'Süt Ürünleri', 'İçecek', 'Atıştırmalık',
                    'Temel Gıda', 'Fırından', 'Et Ürünleri', 'Dondurulmuş Gıda', 'Dondurma', 'Hazır Gıda', 
                    'Kuruyemiş', 'Tatlı', 'Temizlik', 'Kişisel Bakım'];

const getRandomCategory = () => { 
  return categories[Math.floor(Math.random() * categories.length)];
}; 

const generateProducts = (count) => { 
  const products = []; 
  for (let i = 1; i <= count; i++) { 
    const id = i;
    products.push({ 
      id: id, 
      barcode: uuidv4(), 
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      image: faker.image.url(),
      category: getRandomCategory(),
    });
  }
  return products;
};


const allProducts = generateProducts(1000);
export const handlers = [ 


      http.get('/version',()=>{
        return HttpResponse.json({ version: '0.1.0' })
      }),

   

      http.get('/store-status', () => {
        const statusCode = Math.random() > 0.5 ? 200 : 500;

        if (statusCode === 200) {
          return HttpResponse.json( { message: 'Çevrim içi' }, { status: 200 })
        } else {
          return HttpResponse.json( { message: 'Çevrim dışı' }, { status: 500 })
        }
      }),
     
  

    http.post('/login', async ({ request }) => {
      const req = await request.json()
      console.log(req.kullaniciKodu)
     
      const users = [
        { kullaniciKodu: '123', sifre: 'hatice' },
      
      ];

      const isValidUser = users.some(
        (user) => user.kullaniciKodu === req.kullaniciKodu && user.sifre === req.sifre
      );
    

      if (isValidUser) {
        return HttpResponse.json(req.kullaniciKodu, { status: 200 })
      } else {
        return HttpResponse.json({}, { status: 401 })
      }


      
    }),
   
    http.get('/products', ({request}) => {
      const url = new URL(request.url)
      const page = url.searchParams.get('page')
      const category = url.searchParams.get('category')
      const pageSize = 10

      const filteredProducts = category === 'All'
        ? allProducts
        : allProducts.filter((product) => product.category === category);

      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;
      
      const products = filteredProducts.slice(startIndex, endIndex);
       
      return HttpResponse.json(Array.from(products.values()));
    }),



    http.post('/send-email', async ( { request }) => {
      const req = await request.json()
       
        
            return  HttpResponse.json({ message: 'E-posta başarıyla gönderildi.' }, { status: 200 })
      
    }),
    

]