import { http, HttpResponse } from 'msw'

const allProducts = new Map([
  [1, { id: 1,kod:123 ,name: 'Elma', price: 3 , image:"https://www.doktorsaliheken.com/2021/03/elma.jpg"}],
  [2, { id: 2, name: 'Armut', price: 4 ,image:"https://www.verita.com.tr/wp-content/uploads/2014/08/armut.jpg"}],
  [3, { id: 3,kod:123, name: 'Portakal', price: 5 ,image:"https://www.gurmar.com.tr/images/thumbs/0011308_portakal-kg_510.jpeg"}],
  [4, { id: 4, name: 'Muz', price: 6 ,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSusovKmTvhv4MPSrYVexB0yMgtLtWZRxSGRA&s"}],
  [5, { id: 5,kod:123 ,name: 'Kivi', price: 7 ,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhlcj0lP9LJ0Hf6f997ohKFNfvvMHm6lQXng&s"}],
  [6, { id: 6,kod:123 ,name: 'Çilek', price: 8 ,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqJHd9UbGTwnwF2tB2g0okwV91N3x1-Tk3vA&s"}],
  [7, { id: 7,kod:123 ,name: 'Karpuz', price: 9 ,image:"https://ideacdn.net/idea/gy/40/myassets/categories/748/crimson%20sweet%20tipi%20kategori.png?revision=1695392133"}],
  [8, { id: 8,kod:123, name: 'Kavun', price: 10 ,image:"https://static.wixstatic.com/media/b83156_de9a85d4fe13495c99299ae43f2f1780~mv2.jpg/v1/fill/w_480,h_480,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/b83156_de9a85d4fe13495c99299ae43f2f1780~mv2.jpg"}],
  [9, { id: 9,kod:123, name: 'Üzüm', price: 11,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCI3gymmcVWfFPmgmMgHDOd03EFEoG4nQsVA&s" }],
  [10, { id: 10, kod:123,name: 'Şeftali', price: 12,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyApfj_UKe8gKP06Gy10pFNQp9aFSRdfWWGQ&s" }],
  [11, { id: 11,kod:123, name: 'Kiraz', price: 13,image:"https://ideacdn.net/idea/ha/92/myassets/products/024/regina-kiraz-fidani.jpg?revision=1697143329" }],
  [12, { id: 12,kod:123, name: 'Elma', price: 3 }],
  [13, { id:13,kod:123, name: 'Armut', price: 4 }],
  [14, { id: 14,kod:123, name: 'Portakal', price: 5 }],
  [15, { id: 15,kod:123, name: 'Muz', price: 6 }],
  [16, { id: 16,kod:123, name: 'Çilek', price: 8 }],
  [17, { id: 17,kod:123, name: 'Karpuz', price: 9 }],
  [18, { id: 18,kod:123, name: 'Kavun', price: 10 }],
  [19, { id: 19,kod:123, name: 'Üzüm', price: 11 }],
  [20, { id: 20,kod:123, name: 'Şeftali', price: 12 }],
  [21, { id: 21,kod:123, name: 'Kiraz', price: 13,image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.kayalarziraat.com%2Fproduct%2Frose-glow-elma-fidani%2F&psig=AOvVaw2t-ecPic5PXjGJE7BEEpbf&ust=1718197551022000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPj2lufO04YDFQAAAAAdAAAAABAE" }],

]);

export const handlers = [ 


      http.get('/version',()=>{
        return HttpResponse.json({ version: '0.1.0' })
      }),
     
    http.post('/login', async ({ request }) => {
      // debugger
      const req = await request.json()
      console.log(req.kullaniciKodu)
     
      const users = [
        { kullaniciKodu: '123', sifre: 'hatice' },
        { kullaniciKodu: '456', sifre: 'barancan' }, // Kullanıcı kodlarını string yapın
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
   
    http.get('/products', () => {
      return HttpResponse.json(Array.from(allProducts.values()));
    }),

]