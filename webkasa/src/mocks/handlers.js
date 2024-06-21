import { http, HttpResponse } from 'msw'

const allProducts = new Map(
  [
    [1, { "id": 1, "kod": "M001", "name": "Elma", "price": 3, "image": "https://www.doktorsaliheken.com/2021/03/elma.jpg", "category": "Meyve" }],
    [2, { "id": 2,"kod": "M002", "name": "Armut", "price": 4, "image": "https://www.eskitadinda.com/img/armut_1964_3075_2.png", "category": "Meyve" }],
    [3, { "id": 3,"kod": "M003", "name": "Muz", "price": 5, "image": "https://www.yesilist.com/wp-content/uploads/2013/02/thumbnail_1361888010.jpg", "category": "Meyve" }],
    [4, { "id": 4,"kod": "M004", "name": "Kivi", "price": 6, "image": "https://www.damlicaciftligi.com/image/cache/catalog/100608-kivi-2-550x550.jpg", "category": "Meyve" }],
    [5, { "id": 5,"kod": "M005", "name": "Çilek", "price": 10, "image": "https://images.unsplash.com/photo-1556456874-950788a5b55b", "category": "Meyve" }],
    [6, { "id": 6,"kod": "M006", "name": "Kiraz", "price": 12, "image": "https://www.medikalakademi.com.tr/wp-content/uploads/2019/05/kiraz-meyve-14.jpg", "category": "Meyve" }],
    [7, { "id": 7,"kod": "M007", "name": "Şeftali", "price": 8, "image": "https://yenisokegazetesi.com/sites/551/uploads/2023/07/14/eftali.jpg?", "category": "Meyve" }],
    [8, { "id": 8,"kod": "M008", "name": "Portakal", "price": 6, "image": "https://onlineapi.cagri.com/api/v1/pub/products/img/46763/1/532", "category": "Meyve" }],
    [9, { "id": 9, "kod": "M009","name": "Mandalina", "price": 5, "image": "https://merkomfresh.com/wp-content/uploads/2021/12/WhatsApp-Image-2021-12-02-at-13.08.33-3.jpeg", "category": "Meyve" }],
    [10, { "id": 10,"kod": "M010", "name": "Nar", "price": 7, "image": "https://karmentarim.com/uploads/products/thumb/1200x1200//nar-115.jpg", "category": "Meyve" }],
    [11, { "id": 11, "kod": "M011","name": "Karpuz", "price": 15, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgzZndxRBLdqGQhgWvEF5JBREVjXiduTZEMg&s", "category": "Meyve" }],
    [12, { "id": 12, "kod": "M012","name": "Kavun", "price": 14, "image": "https://www.intfarming.com/blog/wp-content/uploads/2021/03/6239ac869b17c226cc05aefa_sumela1-850x560.jpg", "category": "Meyve" }],
    [13, { "id": 13, "kod": "M013","name": "Üzüm", "price": 10, "image": "https://ideacdn.net/idea/fm/03/myassets/products/065/uzum-aromasi-20-g-1929.jpeg?revision=1717157620", "category": "Meyve" }],
    [14, { "id": 14,"barkod": 5901234567101, "name": "Elma Suyu", "price": 7, "image": "https://images.unsplash.com/photo-1511689985600-2c8d4ac8f00b", "category": "İçecek" }],
    [15, { "id": 15,"barkod": "5901234567102", "name": "Portakal Suyu", "price": 7, "image": "https://images.unsplash.com/photo-1571689937700-97a003a443d0", "category": "İçecek" }],
    [16, { "id": 16,"barkod": "5901234567103", "name": "Soda", "price": 3, "image": "https://images.unsplash.com/photo-1571689937700-97a003a443d0", "category": "İçecek" }],
    [17, { "id": 17, "barkod": "5901234567104","name": "Maden Suyu", "price": 3, "image": "https://images.unsplash.com/photo-1511689985600-2c8d4ac8f00b", "category": "İçecek" }],
    [18, { "id": 18,"barkod": "5901234567105", "name": "Kola", "price": 5, "image": "https://images.unsplash.com/photo-1511689985600-2c8d4ac8f00b", "category": "İçecek" }],
    [19, { "id": 19, "barkod": "5901234567106","name": "Fanta", "price": 5, "image": "https://images.unsplash.com/photo-1511689985600-2c8d4ac8f00b", "category": "İçecek" }],
    [20, { "id": 20, "barkod": "5901234567107","name": "Sprite", "price": 5, "image": "https://images.unsplash.com/photo-1511689985600-2c8d4ac8f00b", "category": "İçecek" }],
    [21, { "id": 21, "barkod": "5901234567108","name": "Meyve Suyu", "price": 7, "image": "https://images.unsplash.com/photo-1511689985600-2c8d4ac8f00b", "category": "İçecek" }],
    [22, { "id": 22, "barkod": "5901234567109","name": "Şalgam", "price": 6, "image": "https://images.unsplash.com/photo-1511689985600-2c8d4ac8f00b", "category": "İçecek" }],
    [23, { "id": 23,"barkod": "5901234567110", "name": "Ayran", "price": 4, "image": "https://images.unsplash.com/photo-1511689985600-2c8d4ac8f00b", "category": "İçecek" }],
    [24, { "id": 24,"barkod": "5901234567111", "name": "Çay", "price": 4, "image": "https://images.unsplash.com/photo-1511689985600-2c8d4ac8f00b", "category": "İçecek" }],
    [25, { "id": 25, "barkod": "5901234567112","name": "Kahve", "price": 5, "image": "https://images.unsplash.com/photo-1511689985600-2c8d4ac8f00b", "category": "İçecek" }],
    [26, { "id": 26,"barkod": "5901234567113", "name": "Nescafe", "price": 6, "image": "https://images.unsplash.com/photo-1511689985600-2c8d4ac8f00b", "category": "İçecek" }],
    [27, { "id": 27, "barkod": "5901234567114","name": "Latte", "price": 7, "image": "https://images.unsplash.com/photo-1511689985600-2c8d4ac8f00b", "category": "İçecek" }],
    [28, { "id": 28,"barkod": "5901234567115", "name": "Mocha", "price": 7, "image": "https://images.unsplash.com/photo-1511689985600-2c8d4ac8f00b", "category": "İçecek" }],
    [29, { "id": 29,"barkod": "5901234567116", "name": "Espresso", "price": 7, "image": "https://images.unsplash.com/photo-1511689985600-2c8d4ac8f00b", "category": "İçecek" }],
    [30, { "id": 30,"barkod": "5901234567117", "name": "Sade Kahve", "price": 6, "image": "https://images.unsplash.com/photo-1511689985600-2c8d4ac8f00b", "category": "İçecek" }],
    [31, { "id": 31,"kod": "T001", "name": "Kek", "price": 10, "image": "https://images.unsplash.com/photo-1589561084283-930aa7b590b7", "category": "Tatlı" }],
    [32, { "id": 32,"kod": "T002", "name": "Kurabiye", "price": 15, "image": "https://images.unsplash.com/photo-1584905055567-5ca7b887ff8f", "category": "Tatlı" }],
    [33, { "id": 33,"kod": "T003", "name": "Baklava", "price": 35, "image": "https://images.unsplash.com/photo-1587154345549-126adf0b6041", "category": "Tatlı" }],
    [34, { "id": 34,"kod": "T004", "name": "Tiramisu", "price": 25, "image": "https://images.unsplash.com/photo-1598908311116-7a813a8e7c19", "category": "Tatlı" }],
    [35, { "id": 35,"kod": "T005", "name": "Pasta", "price": 40, "image": "https://images.unsplash.com/photo-1598509980017-df13f3e9ae7b", "category": "Tatlı" }],
    [36, { "id": 36,"kod": "T006", "name": "Dondurma", "price": 20, "image": "https://images.unsplash.com/photo-1582079042496-2b9f46ca0dbb", "category": "Tatlı" }],
    [37, { "id": 37,"kod": "T007", "name": "Helva", "price": 15, "image": "https://images.unsplash.com/photo-1574173975298-c4e9a2634a7f", "category": "Tatlı" }],
    [38, { "id": 38,"kod": "T008", "name": "Kadayıf", "price": 30, "image": "https://images.unsplash.com/photo-1607928942777-8fc8da5bca5a", "category": "Tatlı" }],
    [39, { "id": 39,"kod": "T009", "name": "Muhallebi", "price": 10, "image": "https://images.unsplash.com/photo-1603734882553-0aeeff162c63", "category": "Tatlı" }],
    [40, { "id": 40,"kod": "T010", "name": "Kazandibi", "price": 12, "image": "https://images.unsplash.com/photo-1598943756270-f0f43ce2c061", "category": "Tatlı" }],
    [41, { "id": 41, "kod": "T011","name": "Lokma", "price": 8, "image": "https://images.unsplash.com/photo-1582079042496-2b9f46ca0dbb", "category": "Tatlı" }],
    [42, { "id": 42,"kod": "T012", "name": "Sütlaç", "price": 10, "image": "https://images.unsplash.com/photo-1574267433289-513c3dca3da6", "category": "Tatlı" }],
    [43, { "id": 43, "kod": "T013","name": "Cheesecake", "price": 25, "image": "https://images.unsplash.com/photo-1591987253686-151801c1e50a", "category": "Tatlı" }],
    [44, { "id": 44, "kod": "T014","name": "Karamelli Tatlı", "price": 20, "image": "https://images.unsplash.com/photo-1582079042496-2b9f46ca0dbb", "category": "Tatlı" }],
    [45, { "id": 45, "barkod": "5901234567118","name": "Limonata", "price": 5, "image": "https://images.unsplash.com/photo-1582079042496-2b9f46ca0dbb", "category": "İçecek" }],
    [46, { "id": 46, "barkod": "5901234567119","name": "Elma Çayı", "price": 6, "image": "https://images.unsplash.com/photo-1582079042496-2b9f46ca0dbb", "category": "İçecek" }],
    [47, { "id": 47, "barkod": "5901234567120","name": "Soğuk Çay", "price": 5, "image": "https://images.unsplash.com/photo-1582079042496-2b9f46ca0dbb", "category": "İçecek" }],
    [48, { "id": 48, "barkod": "5901234567121","name": "Limonlu Soda", "price": 4, "image": "https://images.unsplash.com/photo-1582079042496-2b9f46ca0dbb", "category": "İçecek" }],
    [49, { "id": 49, "barkod": "5901234567122","name": "Meyveli Soda", "price": 4, "image": "https://images.unsplash.com/photo-1582079042496-2b9f46ca0dbb", "category": "İçecek" }],
    [50, { "id": 50,"barkod": "5901234567123", "name": "Sade Soda", "price": 3, "image": "https://images.unsplash.com/photo-1582079042496-2b9f46ca0dbb", "category": "İçecek" }],
    [51, { "id": 51, "barkod": "5901234567401", "name": "Izgara Tavuk", "price": 30, "image": "https://images.unsplash.com/photo-1582079042496-2b9f46ca0dbb", "category": "Et Ürünleri" }],
    [52, { "id": 52,"barkod": "5901234567402", "name": "Biftek", "price": 50, "image": "https://images.unsplash.com/photo-1582079042496-2b9f46ca0dbb", "category": "Et Ürünleri" }],
    [53, { "id": 53,"barkod": "5901234567403", "name": "Köfte", "price": 20, "image": "https://images.unsplash.com/photo-1582079042496-2b9f46ca0dbb", "category": "Et Ürünleri" }],
    [54, { "id": 54, "barkod": "5901234567404","name": "Dana Eti", "price": 60, "image": "https://images.unsplash.com/photo-1582079042496-2b9f46ca0dbb", "category": "Et Ürünleri" }],
    [55, { "id": 55,"barkod": "5901234567405", "name": "Kuzu Eti", "price": 70, "image": "https://images.unsplash.com/photo-1582079042496-2b9f46ca0dbb", "category": "Et Ürünleri" }],
    [56, { "id": 56,"barkod": "5901234567406", "name": "Balık", "price": 40, "image": "https://images.unsplash.com/photo-1582079042496-2b9f46ca0dbb", "category": "Et Ürünleri" }],
    [57, { "id": 57, "barkod": "5901234567407","name": "Sucuk", "price": 45, "image": "https://images.unsplash.com/photo-1582079042496-2b9f46ca0dbb", "category": "Et Ürünleri" }],
    [58, { "id": 58, "barkod": "5901234567408","name": "Pastırma", "price": 100, "image": "https://images.unsplash.com/photo-1582079042496-2b9f46ca0dbb", "category": "Et Ürünleri" }],
    [59, { "id": 59, "barkod": "5901234567409","name": "Salam", "price": 20, "image": "https://images.unsplash.com/photo-1582079042496-2b9f46ca0dbb", "category": "Et Ürünleri" }],
    [60, { "id": 60, "barkod": "5901234567410","name": "Sosis", "price": 15, "image": "https://images.unsplash.com/photo-1582079042496-2b9f46ca0dbb", "category": "Et Ürünleri" }],
    [61, { "id": 61,"kod": "S001", "name": "Havuç", "price": 3, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_w8A375S5T-fTNwU5ZhrbPd1XxZx8YwTVYw&s", "category": "Sebze" }],
    [62, { "id": 62,"kod": "S002", "name": "Biber", "price": 5, "image": "https://images.unsplash.com/photo-1599619431974-2e6b7d3a78a7", "category": "Sebze" }],
    [63, { "id": 63, "kod": "S003","name": "Domates", "price": 4, "image": "https://images.migrosone.com/sanalmarket/product/28080000/domates-kg-c7462d-1650x1650.jpg", "category": "Sebze" }],
    [64, { "id": 64, "kod": "S004","name": "Salatalık", "price": 3, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUd5meqh3VjxtwTN7Y2UZZueBKwOSQ7SqOXQ&s", "category": "Sebze" }],
    [65, { "id": 65,"kod": "S005", "name": "Patlıcan", "price": 6, "image": "https://images.migrosone.com/sanalmarket/product/28303000/patlican-kemer-kg-2ac52c-1650x1650.jpg", "category": "Sebze" }],
    [66, { "id": 66,"kod": "S006", "name": "Kabak", "price": 5, "image": "https://d1mm3tuyihn37h.cloudfront.net/wp-content/uploads/Kabak.jpg", "category": "Sebze" }],
    [67, { "id": 67,"kod": "S007", "name": "Ispanak", "price": 7, "image": "https://tazegel.com/wp-content/uploads/2023/02/ispanak-1.png", "category": "Sebze" }],
    [68, { "id": 68,"kod": "S008", "name": "Kereviz", "price": 8, "image": "https://cdn.getir.com/product/kereviz1kg_5dd2ae7b4915bbea577e2960.png", "category": "Sebze" }],
    [69, { "id": 69,"kod": "S009", "name": "Lahana", "price": 5, "image": "https://cdn.metro-group.com/tr/tr_pim_568413001001_01.png?format=jpg&quality=50&w=594&h=594&bgcolor=white", "category": "Sebze" }],
    [70, { "id": 70,"kod": "S010", "name": "Brüksel Lahanası", "price": 10, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe1H3bST-qEPTjK6YG-gKzryh3g4V2e_FmZg&s", "category": "Sebze" }],
    [71, { "id": 71,"kod": "S011", "name": "Göbek Marul", "price": 4, "image": "https://ideacdn.net/idea/fe/18/myassets/products/239/adsiz-tasarim.jpg?revision=1697143329", "category": "Sebze" }],
    [72, { "id": 72,"kod": "S012", "name": "Roka", "price": 3, "image": "https://images.migrosone.com/sanalmarket/product/28340009/roka-demet-efff5f-1650x1650.jpg", "category": "Sebze" }],
    [73, { "id": 73, "kod": "S013","name": "Maydanoz", "price": 2, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuedD12HDPTDT5bSZfvpTwHCpYsUiaaY_FVA&s", "category": "Sebze" }],
    [74, { "id": 74,"kod": "S014", "name": "Dereotu", "price": 2, "image": "https://www.ufuktarim.com/imaj/blog/dereotu-yetistiriciligi.jpg", "category": "Sebze" }],
    [75, { "id": 75,"kod": "S015", "name": "Nane", "price": 2, "image": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=85/48857/uploads/urunresimleri/buyuk/1008903-c51410.jpg", "category": "Sebze" }],
    [76, { "id": 76,"kod": "S016", "name": "Soğan", "price": 3, "image": "https://images.unsplash.com/photo-1604763004840-17d1f0dd6ef7", "category": "Sebze" }],
    [77, { "id": 77,"kod": "S017", "name": "Sarımsak", "price": 6, "image": "https://images.unsplash.com/photo-1604763004840-17d1f0dd6ef7", "category": "Sebze" }],
    [78, { "id": 78,"kod": "S018", "name": "Karnabahar", "price": 8, "image": "https://images.unsplash.com/photo-1604763004840-17d1f0dd6ef7", "category": "Sebze" }],
    [79, { "id": 79,"kod": "S019", "name": "Brokoli", "price": 9, "image": "https://images.unsplash.com/photo-1604763004840-17d1f0dd6ef7", "category": "Sebze" }],
    [80, { "id": 80,"kod": "S020", "name": "Pırasa", "price": 7, "image": "https://images.unsplash.com/photo-1604763004840-17d1f0dd6ef7", "category": "Sebze" }],
    [81, { "id": 81,"kod": "S021", "name": "Patates", "price": 4, "image": "https://images.unsplash.com/photo-1604763004840-17d1f0dd6ef7", "category": "Sebze" }],
    [82, { "id": 82,"kod": "S022", "name": "Mantar", "price": 10, "image": "https://images.unsplash.com/photo-1604763004840-17d1f0dd6ef7", "category": "Sebze" }],
    [83, { "id": 83,"kod": "S023", "name": "Bezelye", "price": 7, "image": "https://images.unsplash.com/photo-1604763004840-17d1f0dd6ef7", "category": "Sebze" }],
    [84, { "id": 84,"kod": "S024", "name": "Fasulye", "price": 9, "image": "https://images.unsplash.com/photo-1604763004840-17d1f0dd6ef7", "category": "Sebze" }],
    [85, { "id": 85,"kod": "S025", "name": "Bakla", "price": 8, "image": "https://images.unsplash.com/photo-1604763004840-17d1f0dd6ef7", "category": "Sebze" }],
    [86, { "id": 86,"kod": "S026", "name": "Barbunya", "price": 10, "image": "https://images.unsplash.com/photo-1604763004840-17d1f0dd6ef7", "category": "Sebze" }],
    [87, { "id": 87,"kod": "S027", "name": "Mercimek", "price": 5, "image": "https://images.unsplash.com/photo-1604763004840-17d1f0dd6ef7", "category": "Sebze" }],
    [88, { "id": 88,"kod": "S028", "name": "Nohut", "price": 5, "image": "https://images.unsplash.com/photo-1604763004840-17d1f0dd6ef7", "category": "Sebze" }],
    [89, { "id": 89,"kod": "S029", "name": "Kuru Fasulye", "price": 6, "image": "https://images.unsplash.com/photo-1604763004840-17d1f0dd6ef7", "category": "Sebze" }],
    [90, { "id": 90,"kod": "S030", "name": "Yeşil Mercimek", "price": 6, "image": "https://images.unsplash.com/photo-1604763004840-17d1f0dd6ef7", "category": "Sebze" }],
    [91, { "id": 91,"barkod": "5901234567201" ,"name": "Pirinç", "price": 7, "image": "https://images.unsplash.com/photo-1604763004840-17d1f0dd6ef7", "category": "Bakliyat" }],
    [92, { "id": 92,"barkod": "5901234567202", "name": "Bulgur", "price": 5, "image": "https://images.unsplash.com/photo-1604763004840-17d1f0dd6ef7", "category": "Bakliyat" }],
    [93, { "id": 93, "barkod": "5901234567203", "name": "Şehriye", "price": 3, "image": "https://images.unsplash.com/photo-1604763004840-17d1f0dd6ef7", "category": "Bakliyat" }],
    [94, { "id": 94,"barkod": "5901234567204",  "name": "Makarna", "price": 4, "image": "https://images.unsplash.com/photo-1604763004840-17d1f0dd6ef7", "category": "Bakliyat" }],
    [95, { "id": 95, "barkod": "5901234567205", "name": "Yulaf", "price": 5, "image": "https://images.unsplash.com/photo-1604763004840-17d1f0dd6ef7", "category": "Bakliyat" }],
    [96, { "id": 96, "barkod": "5901234567206", "name": "Kinoa", "price": 8, "image": "https://images.unsplash.com/photo-1604763004840-17d1f0dd6ef7", "category": "Bakliyat" }],
    [97, { "id": 97, "barkod": "5901234567207", "name": "Arpa Şehriye", "price": 6, "image": "https://images.unsplash.com/photo-1604763004840-17d1f0dd6ef7", "category": "Bakliyat" }],
    [98, { "id": 98,"barkod": "5901234567301", "name": "Badem", "price": 25, "image": "https://images.unsplash.com/photo-1604763004840-17d1f0dd6ef7", "category": "Kuruyemiş" }],
    [99, { "id": 99,"barkod": "5901234567302", "name": "Fındık", "price": 30, "image": "https://images.unsplash.com/photo-1604763004840-17d1f0dd6ef7", "category": "Kuruyemiş" }],
    [100, { "id": 100,"barkod": "5901234567303", "name": "Ceviz", "price": 35, "image": "https://images.unsplash.com/photo-1604763004840-17d1f0dd6ef7", "category": "Kuruyemiş" }],
    [101, { "id": 101, "barkod": "5901234567304","name": "Fıstık", "price": 25, "image": "https://images.unsplash.com/photo-1604763004840-17d1f0dd6ef7", "category": "Kuruyemiş" }],
  
  


 
]
);





export const handlers = [ 


      http.get('/version',()=>{
        return HttpResponse.json({ version: '0.1.0' })
      }),

      // http.get('/store-status',()=>{
      //   const isOnline = Math.random() > 0.5;
      //   return (
      //     HttpResponse.status(200),
      //     HttpResponse.json({ status: isOnline ? 'online' : 'offline' })
      //   );

      // }),
      http.get('/store-status', (req, res, ctx) => {
        const statusCode = Math.random() > 0.5 ? 200 : 500;
        if (statusCode === 200) {
          return (
            ctx.status(200),
            ctx.json({ message: 'Servis ayakta' })
          );
        } else {
          return (
            ctx.status(500),
            HttpResponse.json({ message: 'Servis ayakta değil' })
          );
        }
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