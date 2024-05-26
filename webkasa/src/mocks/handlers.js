//  import { rest } from "msw"
import { http, HttpResponse } from 'msw'



export const handlers = [ 


      http.get('/version',()=>{
        return HttpResponse.json({ version: '0.1.0' })
      }),


    //   http.post('/login', (req, res, ctx) => {
    //       return res(
    //         ctx.status(200),
    //         ctx.json({
    //             data:[
    //                 {kullaniciKodu: 123, sifre: 'hatice'},
    //                 {kullaniciKodu: 124, sifre: 'baran'}
    //             ]
    //         })
    //       )

    //   }),

  
      
    http.post('/login', async (req, res, ctx) => {

        console.log(req)
        const { kullaniciKodu, sifre } = await  req.body;

        console.log(kullaniciKodu)
      
        const users = [
          { kullaniciKodu: 123, sifre: 'hatice' },
          { kullaniciKodu: 456, sifre: 'barancan' }, // Kullanıcı kodlarını string yapın
        ];
      
        const isValidUser = users.some(
          (user) => user.kullaniciKodu === kullaniciKodu && user.sifre === sifre
        );
      
        if (isValidUser) {
          return res(ctx.status(200), ctx.json({ success: true })); // Sadece success: true dön
        } else {
          return res(ctx.status(401), ctx.json({ success: false }));
        }
      }),
   


]
