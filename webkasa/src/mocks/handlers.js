import { http, HttpResponse } from 'msw'



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
   


]