from app.models import db, User, Recipe, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_recipes():
   def seed_recipes():
    cuisine1 = Recipe(
        name="Tacos al Pastor",
        description="Authentic Mexican street tacos filled with marinated pork, pineapple, and cilantro.",
        category_id=1,
        user_id = 1,
        image= "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmilrecetas.net%2Fwp-content%2Fuploads%2F2016%2F09%2FTacos-al-pastor-3.jpg&f=1&nofb=1&ipt=25b19e31734ff8d0a06a19ec827360b43cbd45b2ebdc51dafc80472074d1c1fb&ipo=images"
    )

    cuisine2 = Recipe(
        name="Chiles Rellenos",
        description="Poblano peppers stuffed with cheese, dipped in egg batter, and fried until golden.",
        category_id=1,
        user_id = 2,
        image= "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.2pYPmsIEaU6DnsbVmQmETgHaE8%26pid%3DApi&f=1&ipt=12d3a388918c204f74226af784768459ae66641e708a5d34b72d4185bc7bf233&ipo=images"
    )

    cuisine3 = Recipe(
        name="Enchiladas Verdes",
        description="Tortillas filled with shredded chicken, topped with green salsa, cheese, and sour cream.",
        category_id=1,
        user_id = 3,
        image= "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.laguiadereus.com%2Fwp-content%2Fuploads%2F2018%2F04%2FEnchiladas-Suizas2.jpg&f=1&nofb=1&ipt=af3680d9417d5a50366e2c613f6d6d6c091fba0506c91cc77912ffd3e6a0a06a&ipo=images"
    )

    cuisine4 = Recipe(
        name="Guacamole",
        description="Classic Mexican dip made with ripe avocados, lime juice, cilantro, tomatoes, and onions.",
        category_id=1,
        user_id = 4,
        image= "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.modernhoney.com%2Fwp-content%2Fuploads%2F2018%2F06%2FAuthentic-Guacamole-Recipe-1.jpg&f=1&nofb=1&ipt=d300f102f541ccf10ff2eef888a2d296a4fc131baaac7c6528a305c64a2932a7&ipo=images"
    )

    cuisine5 = Recipe(
        name="Pozole",
        description="Traditional Mexican soup made with hominy, pork, and flavored with spices and herbs.",
        category_id=1,
        user_id = 1,
        image= "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmylatinatable.com%2Fwp-content%2Fuploads%2F2016%2F03%2Fpozole-5-1024x681.jpg&f=1&nofb=1&ipt=44385cc96d3b892d4b521f162d9e6429506d8dc7a9c3811d5c70499ace79af4d&ipo=images"
    )

    cuisine6 = Recipe(
        name="Chiles en Nogada",
        description="Poblano peppers stuffed with a mixture of ground meat, fruits, and nuts, topped with walnut sauce and pomegranate seeds.",
        category_id=1
        user_id = 2,
        image= "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Feldiariony.com%2Fwp-content%2Fuploads%2Fsites%2F2%2F2020%2F08%2Fchilesennogada.jpg%3Fquality%3D80%26strip%3Dall&f=1&nofb=1&ipt=0a41913db8040cac02e51087d80228821bead9b19b2bfab0c001c5fdaaa18b96&ipo=images"
    )

    cuisine7 = Recipe(
        name="Salsa Roja",
        description="Spicy red salsa made with tomatoes, chili peppers, onions, and garlic.",
        category_id=1
        user_id = 3,
        image= "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.whats4eats.com%2Ffiles%2Fsauces-salsa-roja-flickr-pancakejess-873537113-4x3.jpg&f=1&nofb=1&ipt=5aed6dd51ec3450e36fd226cd60e0bbfb097ccad65fe7996ba83b9d449569f41&ipo=images"
    )

    cuisine8 = Recipe(
        name="Mole Poblano",
        description="Rich and flavorful sauce made with dried chili peppers, chocolate, spices, and nuts, served over chicken or turkey.",
        category_id=1
        user_id = 4,
        image= "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fsalsita-latin.cocolog-nifty.com%2Fphotos%2Funcategorized%2F2010%2F11%2F13%2Fmole_poblano.jpg&f=1&nofb=1&ipt=e4e80e21ad587b63bc09ec2178baebaa299d549ca0ddb8f8094292454231d41a&ipo=images"
    )

    cuisine9 = Recipe(
        name="Ceviche",
        description="Fresh seafood marinated in lime juice, mixed with tomatoes, onions, cilantro, and served with tortilla chips.",
        category_id=1
        user_id = 1,
        image= "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.cookingclassy.com%2Fwp-content%2Fuploads%2F2020%2F09%2Fceviche-5.jpg&f=1&nofb=1&ipt=ea8ce0f3d1b62e8bf262d64447f70952f75ee59002fc8fe24959d94d2cb2f081&ipo=images"
    )

    cuisine10 = Recipe(
        name="Tamales",
        description="Traditional Mexican dish made of masa dough filled with various ingredients, wrapped in corn husks, and steamed.",
        category_id=1
        user_id = 2,
        image= "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thespruceeats.com%2Fthmb%2Frgq5jG9oQjGo_9kcDH9ya1T7ZB4%3D%2F2000x1333%2Ffilters%3Afill(auto%2C1)%2Ftamales-5830c7175f9b58d5b1792220.jpg&f=1&nofb=1&ipt=8991447e6d5f4a9cca42527949c508ebcc8f487feb37f4313aed7223d3a15e4d&ipo=images"
    )
    cuisine11 = Recipe(
        name="Kung Pao Chicken",
        description="Kung Pao Chicken is a classic Chinese stir-fry dish that combines tender chicken pieces, crunchy peanuts, and a medley of vegetables in a flavorful sauce. The dish originates from the Sichuan province and is known for its bold and spicy flavors. To make Kung Pao Chicken, you start by marinating the chicken in a mixture of soy sauce, vinegar, and cornstarch. Then, you stir-fry the chicken along with peanuts, bell peppers, and dried chili peppers. The sauce is made with soy sauce, vinegar, sugar, and a touch of sesame oil. Serve the Kung Pao Chicken over steamed rice for a satisfying and delicious meal.",
        category_id=2,
         user_id = 3,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.fussfreecooking.com%2Fwp-content%2Fuploads%2F2017%2F05%2Fimg.jpg&f=1&nofb=1&ipt=c2541591fd035d89f1f1a994a12ffb1441991af09847389c912f0164c16a7bd7&ipo=images"
    )

    cuisine12 = Recipe(
        name="Sweet and Sour Pork",
        description="Sweet and Sour Pork is a popular Chinese dish that features crispy pork pieces coated in a tangy and slightly sweet sauce. The dish is known for its vibrant colors and contrasting flavors. To make Sweet and Sour Pork, you start by marinating the pork in a mixture of soy sauce, ginger, and garlic. Then, you coat the pork with cornstarch and deep-fry until crispy. The sauce is made with vinegar, ketchup, sugar, and soy sauce, creating a perfect balance of sweet and tangy flavors. Serve the Sweet and Sour Pork with steamed rice and garnish with pineapple chunks and bell peppers for added freshness and color.",
        category_id=2,
         user_id = 4,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcafedelites.com%2Fwp-content%2Fuploads%2F2018%2F08%2Fsweet-and-sour-pork-5.jpg&f=1&nofb=1&ipt=574ce34cade76e7a410ee5f6ed71bf88e73cee48fa1851248cb3fcf2f9a4c569&ipo=images"
    )
    cuisine13 = Recipe(
        name="Peking Duck",
        description="Peking Duck is a famous Chinese dish that showcases succulent roasted duck with crispy skin, served with thin pancakes, scallions, and hoisin sauce. The dish is prized for its delicious flavors and elegant presentation. To make Peking Duck, the duck is first marinated with a mixture of soy sauce, honey, and Chinese five-spice powder. It is then air-dried and roasted until the skin turns golden and crispy. The duck is carved into thin slices and served with warm pancakes, sliced scallions, and hoisin sauce. The combination of tender duck meat, crispy skin, and the savory-sweet flavors of the sauce and pancakes make Peking Duck a delightful culinary experience.",
        category_id=1,
        user_id = 2,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffoodsguy.com%2Fwp-content%2Fuploads%2F2019%2F08%2FPeking-Duck.jpg&f=1&nofb=1&ipt=bd5f06a2fab1bc84c78cb3276e3eb432314a4c1628764ca31cf914310e96916b&ipo=images"
    )
    cuisine14 = Recipe(
        name="Mongolian Beef",
        description="Mongolian Beef is a classic Chinese stir-fry dish that features tender beef slices, stir-fried with green onions and garlic in a savory soy-based sauce. The dish is known for its rich flavors and tender texture. To make Mongolian Beef, you start by marinating the beef in a mixture of soy sauce, ginger, and cornstarch. The beef is then quickly stir-fried along with green onions and garlic, and the sauce is added to create a glossy coating. The sauce typically consists of soy sauce, hoisin sauce, brown sugar, and sesame oil. Serve the Mongolian Beef over steamed rice for a satisfying and delicious meal.",
        category_id=2,
        user_id=3,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsweetandsavorymeals.com%2Fwp-content%2Fuploads%2F2018%2F10%2FMongolian-Beef-Recipe-2.jpg&f=1&nofb=1&ipt=aaccfe03f03de9f2f678d9281f421a2a40686ee0464b3148878816cc6d8878e0&ipo=images"
    )
    cuisine15 = Recipe(
        name="Hot and Sour Soup",
        description="Hot and Sour Soup is a popular Chinese soup that combines spicy and tangy flavors with a variety of ingredients. The soup is known for its hearty texture and aromatic flavors. To make Hot and Sour Soup, you start by preparing a flavorful broth using chicken or vegetable stock, vinegar, soy sauce, and a combination of spices like ginger and white pepper. The soup is then filled with ingredients such as tofu, mushrooms, bamboo shoots, and sometimes shredded chicken or pork. Cornstarch is added to thicken the soup, while beaten eggs are drizzled in to create beautiful ribbons. Garnish with green onions and enjoy this comforting and delicious soup.",
        category_id=2,
        user_id=4,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdinnerthendessert.com%2Fwp-content%2Fuploads%2F2019%2F02%2FHot-and-Sour-Soup.jpg&f=1&nofb=1&ipt=a2b3b1ee0d214256135f2495d3f2b7897aa15a097cd3da733bbce820335a52b6&ipo=images"
    )

    cuisine16 = Recipe(
        name="Mapo Tofu",
        description="Mapo Tofu is a spicy Sichuan dish that combines silky tofu, ground pork, and a flavorful sauce. The dish is known for its numbing spiciness and complex flavors. To make Mapo Tofu, you start by frying ground pork with aromatic ingredients like ginger, garlic, and fermented black beans. Then, you add a combination of chili bean paste, doubanjiang, and Sichuan peppercorns to create a spicy and flavorful sauce. Cubes of soft tofu are gently added to the sauce, allowing them to soak up all the delicious flavors. Serve Mapo Tofu with steamed rice and garnish with chopped green onions for an authentic and satisfying Chinese meal.",
        category_id=2,
        user_id=1,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.maangchi.com%2Fwp-content%2Fuploads%2F2019%2F09%2Fmapotofu.jpg&f=1&nofb=1&ipt=0707b42df619689b8683e64133bcbdae67d508fd75de2da7556c2d963c1daccd&ipo=images"
    )

    cuisine17 = Recipe(
        name="Steamed Dumplings",
        description="Steamed Dumplings, also known as Jiaozi, are a popular Chinese dish that consists of delicate dumplings filled with a flavorful mixture of ground meat and vegetables. The dumplings are steamed until tender and juicy, making them a delicious and satisfying meal or appetizer. To make Steamed Dumplings, you start by preparing the filling using a combination of ground pork, cabbage, ginger, garlic, and seasonings like soy sauce and sesame oil. The filling is then placed in round dumpling wrappers, sealed, and steamed until cooked through. Serve the Steamed Dumplings with a dipping sauce made from soy sauce, vinegar, and chili oil for an authentic Chinese dining experience.",
        category_id=2,
        user_id=2,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffthmb.tqn.com%2F4XpujmtwGSMFv12YujeW83q6DpY%3D%2F1280x860%2Ffilters%3Afill(auto%2C1)%2F469872303-56a949605f9b58b7d0f9e962.jpg&f=1&nofb=1&ipt=148ffba91a1d0ba02cc85e39f6c5db9181ecdf6c45519dc7423c7a1c11e3f25f&ipo=images"
    )

    cuisine18 = Recipe(
        name="Egg Fried Rice",
        description="Egg Fried Rice is a classic Chinese dish that combines fluffy rice, scrambled eggs, and a variety of vegetables and seasonings. The dish is known for its simplicity and versatility, making it a popular choice for a quick and delicious meal. To make Egg Fried Rice, you start by cooking leftover or freshly cooked rice to remove excess moisture. Then, scrambled eggs are cooked in a wok or skillet and set aside. The vegetables, such as diced carrots, peas, and green onions, are stir-fried until tender. Finally, the cooked rice, scrambled eggs, and vegetables are combined in the wok and tossed together with soy sauce and seasonings. Serve Egg Fried Rice as a standalone dish or as a side to your favorite Chinese entrees.",
        category_id=2,
        user_id=3,
        image=
    )
    cuisine19 = Recipe(
        name="General Tso's Chicken",
        description="General Tso's Chicken is a popular Chinese dish that features crispy chicken bites tossed in a sweet and spicy sauce. The dish is known for its bold flavors and addictive taste. To make General Tso's Chicken, you start by coating chicken pieces in a mixture of cornstarch, soy sauce, and spices, then deep-frying them until golden and crispy. The sauce is made with a combination of soy sauce, vinegar, sugar, garlic, ginger, and chili peppers for a perfect balance of savory, tangy, and spicy flavors. The fried chicken is then tossed in the sauce and garnished with sesame seeds and sliced green onions. Serve General Tso's Chicken with steamed rice for a satisfying and flavorful meal.",
        category_id=2,
        user_id=4,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.tYqboVuXAsLIR9YjJbWWkAHaEK%26pid%3DApi&f=1&ipt=3356d7f66d991b82bae5189a7dedde8bd2928d6c1da9e3a29b709689e7c3d9e1&ipo=images"
    )
    cuisine20 = Recipe(
        name="Ma Po Eggplant",
        description="Ma Po Eggplant is a savory and spicy Sichuan dish that showcases stir-fried eggplant, garlic, and chili bean sauce. The dish is known for its rich flavors and satisfying texture. To make Ma Po Eggplant, you start by stir-frying eggplant until tender and slightly caramelized. Then, you add minced garlic, ginger, and fermented black beans to enhance the flavors. The sauce is made with chili bean sauce, soy sauce, and a touch of sugar for balance. Sichuan peppercorns are added to create a numbing sensation and enhance the overall taste. Serve Ma Po Eggplant with steamed rice and garnish with sliced green onions for a delicious and aromatic Chinese dish.",
        category_id=2,
        user_id=1,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fasian-recipe.com%2Fwp-content%2Fuploads%2F2017%2F10%2Fma-po-eggplant-recipe.jpg&f=1&nofb=1&ipt=d16cfdabd4b44e5177e0566feb4fb52f4f6027de675b0f7ec8165a79a7b3da90&ipo=images"
    )
    cuisine21 = Recipe(
        name="Caprese Salad",
        description="A classic Italian salad made with fresh tomatoes, mozzarella cheese, basil leaves, and a drizzle of balsamic glaze. This vibrant salad is a perfect appetizer or side dish, showcasing the flavors of summer. The combination of ripe tomatoes, creamy mozzarella, and aromatic basil creates a refreshing and light dish. To prepare, simply slice the tomatoes and mozzarella, arrange them on a plate, sprinkle with torn basil leaves, and drizzle with balsamic glaze. Serve the Caprese Salad as a starter before a delicious Italian meal or enjoy it on its own for a quick and healthy snack.",
        category_id=3,
        user_id=2,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.cookingclassy.com%2Fwp-content%2Fuploads%2F2020%2F07%2Fcaprese-salad-08.jpg&f=1&nofb=1&ipt=e086b33ef31853de7e7ad54f57e1d990421064ae412f6d21cff97389f07d7df3&ipo=images"
    )

    cuisine22 = Recipe(
        name="Spaghetti Aglio e Olio",
        description="Spaghetti Aglio e Olio is a simple and flavorful Italian pasta dish that features spaghetti tossed with garlic, olive oil, chili flakes, and parsley. This dish is perfect for when you're short on time but still want a delicious meal. To make Spaghetti Aglio e Olio, cook the spaghetti until al dente, then sauté minced garlic and chili flakes in olive oil until fragrant. Toss the cooked spaghetti in the garlic-infused oil, sprinkle with chopped parsley, and season with salt and pepper. Serve this quick and satisfying pasta dish as is or add grated Parmesan cheese for an extra touch of flavor.",
        category_id=3,
        user_id=3,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F92%2F5c%2F57%2F925c570ce246cc82c593a39c7d5b2f1c.jpg&f=1&nofb=1&ipt=30d39b0264a4aa71bbaba12b1f3e92ff1ce639963ebbc93334bac4d5070d56e6&ipo=images"
    )

    cuisine23 = Recipe(
        name="Margherita Pizza",
        description="Margherita Pizza is a classic Italian pizza that showcases the flavors of fresh tomatoes, mozzarella cheese, and basil leaves. This simple yet delicious pizza is a favorite for many pizza lovers. To make Margherita Pizza, spread tomato sauce over the pizza dough, top it with slices of fresh mozzarella cheese, and place basil leaves on top. Drizzle with olive oil and season with salt and pepper. Bake the pizza in a hot oven until the crust is crispy and the cheese is melted and bubbly. Slice and serve this timeless Italian pizza for a satisfying meal that captures the essence of Italian cuisine.",
        category_id=3,
        user_id=4,
        image="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpoormansgourmetkitchen.com%2Fwp-content%2Fuploads%2F2014%2F06%2FIMG_0861.jpg&f=1&nofb=1&ipt=04ed3fa0e1e87b571c2a85d365b74f9d15eb93144ac37a531986b6a6484b9456&ipo=images"
    )

    cuisine24 = Recipe(
        name="Chicken Parmesan",
        description="Chicken Parmesan, or Chicken Parmigiana, is a classic Italian dish that features breaded and fried chicken cutlets topped with tomato sauce and melted cheese. This hearty and flavorful dish is a true comfort food. To make Chicken Parmesan, bread chicken cutlets in a mixture of breadcrumbs, grated Parmesan cheese, and Italian seasoning, then pan-fry them until golden and crispy. Place the cooked chicken cutlets in a baking dish, top with tomato sauce and shredded mozzarella cheese, and bake until the cheese is melted and bubbly. Serve the Chicken Parmesan over cooked spaghetti or alongside a fresh green salad for a satisfying Italian meal.",
        category_id=3,
        user_id=1,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbigoven-res.cloudinary.com%2Fimage%2Fupload%2Ft_recipe-1280%2Fchicken-parmesan-dc40a8.jpg&f=1&nofb=1&ipt=67bde2d349a1ab3f26775377a6f6a9956829f98154e24351750e2a9abfa14a52&ipo=images"
    )
    cuisine25 = Recipe(
        name="Panna Cotta",
        description="Panna Cotta is a creamy and luscious Italian dessert made with sweetened cream, gelatin, and vanilla. This elegant dessert is simple to prepare and can be customized with various toppings. To make Panna Cotta, heat cream, sugar, and vanilla extract in a saucepan until the sugar is dissolved. Soften gelatin in cold water, then stir it into the warm cream mixture until fully dissolved. Pour the mixture into ramekins or molds and refrigerate until set. Once chilled and firm, unmold the Panna Cotta onto serving plates and garnish with fresh berries, fruit coulis, or a drizzle of caramel sauce. Enjoy this silky and indulgent dessert that's sure to impress.",
        category_id=3,
        user_id=2,
        image="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fassets.epicurious.com%2Fphotos%2F5761d0268accf290434553aa%2Fmaster%2Fpass%2Fpanna-cotta.jpg&f=1&nofb=1&ipt=be42abfcf585d0753b135fb9e7ede7adf0e838528a12edb60d20b90ad9fbf353&ipo=images"
    )

    cuisine26 = Recipe(
        name="Gnocchi with Pesto",
        description="Gnocchi with Pesto is a delightful Italian dish that features tender potato dumplings tossed in a vibrant and aromatic pesto sauce. This flavorful combination is perfect for pasta lovers. To make Gnocchi with Pesto, cook the gnocchi until they float to the surface of boiling water, then drain. In a separate bowl, blend fresh basil leaves, pine nuts, garlic, Parmesan cheese, and olive oil to create a smooth pesto sauce. Toss the cooked gnocchi in the pesto sauce until well coated. Garnish with additional grated Parmesan cheese and a sprinkle of toasted pine nuts. Serve this delicious and comforting dish as a main course or as a side dish.",
        category_id=3,
        user_id=3,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.mumslounge.com.au%2Fwp-content%2Fuploads%2F2016%2F10%2FPesto-Chicken-Gnochhi-01.jpg&f=1&nofb=1&ipt=b679f38063c06ad111a836f341e8ca2a15d18befdc4384fbe514495ec8a17129&ipo=images"
    )

    cuisine27 = Recipe(
        name="Tiramisu",
        description="Tiramisu is a classic Italian dessert that features layers of espresso-soaked ladyfingers and creamy mascarpone filling, dusted with cocoa powder. This indulgent treat is perfect for coffee and dessert lovers. To make Tiramisu, whip together egg yolks and sugar until creamy, then fold in mascarpone cheese to create a smooth filling. Dip ladyfinger biscuits into a mixture of espresso and liqueur, and layer them with the mascarpone filling. Repeat the layers and finish with a dusting of cocoa powder. Refrigerate the Tiramisu for a few hours to allow the flavors to meld together. Serve chilled and savor the rich and irresistible flavors of this classic Italian dessert.",
        category_id=3,
        user_id=4,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.simplyrecipes.com%2Fthmb%2Fn29cy_Z8pl8r8Au-MpA1Lp08kdg%3D%2F2000x1333%2Ffilters%3Afill(auto%2C1)%2F__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2017__10__2017-10-28-Tiramisu-21-7de4673191d542039f47927fde4fee82.jpg&f=1&nofb=1&ipt=178f97e7eb45724037e53c988e2b08e85f591b7c4ec659429dc925f5a0d092e2&ipo=images"
    )
    cuisine28 = Recipe(
        name="Butter Chicken",
        description="Butter chicken is a popular North Indian dish made with tender chicken pieces cooked in a creamy tomato-based sauce. The chicken is marinated in a mixture of yogurt, spices, and lemon juice before being cooked in a tandoor oven or on a grill. The sauce is prepared by simmering tomatoes, cream, butter, and a blend of aromatic spices like cumin, coriander, and garam masala. The chicken is then added to the sauce and cooked until tender. Butter chicken is typically served with naan bread or steamed rice.",
        category_id=4,
        user_id=1,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Feasychickenrecipes.com%2Fwp-content%2Fuploads%2F2019%2F11%2Fbutter-chicken-reshoot-6-of-8.jpg&f=1&nofb=1&ipt=3f7e8dc8f7db976149e4e65acc3186b61c07191ea619edb56465896c44b7f3b3&ipo=images"
    )

    cuisine29 = Recipe(
        name="Palak Paneer",
        description="Palak paneer is a popular vegetarian dish from North India made with spinach and paneer (Indian cottage cheese). The spinach is blanched and pureed into a smooth paste, which is then cooked with onions, garlic, ginger, and a blend of spices like cumin, coriander, and garam masala. The paneer is cubed and added to the spinach mixture, where it absorbs the flavors and becomes tender. Palak paneer is typically served with naan bread or steamed rice.",
        category_id=4,
        user_id=2,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thechaipress.com%2Fwp-content%2Fuploads%2F2017%2F08%2FPalak-Paneer.jpg&f=1&nofb=1&ipt=854901938cf8ed0f20d515e87f2c9cd34e9107997df98b5e9477da86e70b0e4a&ipo=images"
    )

    cuisine30 = Recipe(
        name="Biryani",
        description="Biryani is a flavorful and aromatic Indian rice dish that is popular throughout the country. The rice is typically cooked with a blend of aromatic spices like saffron, cumin, and cardamom, and layered with meat or vegetables. The meat is often marinated in a mixture of yogurt and spices before being cooked with the rice, which infuses it with rich flavor. Biryani is typically served with raita (a yogurt-based condiment) and papadum (a crispy lentil wafer).",
        category_id=4,
        user_id=3,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs4.scoopwhoop.com%2Fanj%2Fsw%2F5312bf12-5ba7-444f-b13e-b7fc0b6aabfb.jpg&f=1&nofb=1&ipt=ce571e18491f5ec935c697585932c51fb2240d1e2c7816e1e05d0451a87597a1&ipo=images"
    )

    cuisine31 = Recipe(
        name="Masala Dosa",
        description="Masala dosa is a popular South Indian breakfast dish that consists of a thin, crispy crepe-like shell made from fermented rice and lentil batter, filled with a spiced potato filling. The potato filling is prepared by sautéing boiled and mashed potatoes with onions, mustard seeds, cumin, and other spices. Masala dosa is typically served with coconut chutney and sambar (a lentil and vegetable stew).",
        category_id=4,
        user_id=4,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FCCab5oh0ZOc%2Fmaxresdefault.jpg&f=1&nofb=1&ipt=0d588474b524038e0d62a9ed2d80faaa59b7d6d103ca828dc3cb05f95132ca73&ipo=images"
    )

    cuisine32 = Recipe(
        name="Chana Masala",
        description="Chana masala is a spicy and tangy North Indian dish made with chickpeas and a blend of aromatic spices like cumin, coriander, and garam masala. The chickpeas are simmered in a tomato-based sauce that is flavored with ginger, garlic, and a variety of spices. Chana masala is typically served with rice or naan bread.",
        category_id=4,
        user_id=1,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Frealandvibrant.com%2Fwp-content%2Fuploads%2F2019%2F05%2FIndian-Chana-Masala-2.jpg&f=1&nofb=1&ipt=69bfc86cecbfa9a0c13e807a2998f117cb9281021b78815e7e2c22fa634446d4&ipo=images"
    )

    cuisine33 = Recipe(
        name="Aloo Gobi",
        description="Aloo gobi is a popular vegetarian dish from North India made with potatoes and cauliflower, cooked with a blend of aromatic spices like cumin, coriander, and turmeric. The dish is typically prepared by sautéing onions, garlic, and ginger in oil, then adding the potatoes and cauliflower and cooking until tender. Aloo gobi is often served with roti (Indian flatbread) or rice.",
        category_id=4,
        user_id=2,
        image="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F-yLQujmLmx8o%2FURs9pnMZZWI%2FAAAAAAAADuw%2FfXQRn-cw9Mg%2Fw1200-h630-p-nu%2Faloo%2Bgobi1.jpg&f=1&nofb=1&ipt=b8f4129186dc3ee895bcd6c5900a3535c9b2dd8e217a0cef182d12638ca5d6d3&ipo=images"
    )
    cuisine34 = Recipe(
        name="Rogan Josh",
        description="Rogan josh is a flavorful Kashmiri dish made with tender chunks of meat, typically lamb or goat, cooked in a rich and aromatic sauce made with onions, tomatoes, yogurt, and a blend of spices like fennel, cardamom, and cinnamon. The dish has a vibrant red color and a distinctive flavor. Rogan josh is typically served with rice or naan bread.",
        category_id=4,
        user_id=3,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Frecipes.timesofindia.com%2Fphoto%2F53192600.cms%3Fimgsize%3D130791&f=1&nofb=1&ipt=1eb242b405d2cf7a0482b418b5367abd6fd1e85efe4c8179f4b571fb2a0a7284&ipo=images"
    )
    cuisine35 = Recipe(
        name="Hamburger",
        description="The hamburger is an iconic American dish consisting of a grilled or fried ground beef patty served between two buns. It is a classic favorite at barbecues, cookouts, and fast-food restaurants. The patty is typically seasoned with salt and pepper and can be customized with various toppings like lettuce, tomatoes, onions, pickles, and cheese. Condiments such as ketchup, mustard, and mayonnaise are commonly added to enhance the flavor. The hamburger is often served with a side of French fries or potato chips for a complete meal.",
        category_id=5,
        user_id=4,
        image="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimages.huffingtonpost.com%2F2013-05-27-IMG_3321.jpg&f=1&nofb=1&ipt=2032d978b4dd69cabc8d1fe9e2352b7687394d42201edf7237e893aeae124878&ipo=images"
    )

    cuisine36 = Recipe(
        name="BBQ Ribs",
        description="BBQ ribs are a popular American dish that features tender and flavorful pork ribs cooked low and slow on a grill or smoker. The ribs are typically seasoned with a dry rub mixture of spices, such as paprika, brown sugar, garlic powder, and chili powder. They are then cooked over indirect heat, allowing the flavors to develop and the meat to become tender. BBQ sauce is often applied during the cooking process or served on the side for dipping. BBQ ribs are a delicious and satisfying dish, perfect for backyard gatherings and summer cookouts.",
        category_id=5,
        user_id=1,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmoesdenver.com%2Fwp-content%2Fuploads%2F2015%2F10%2F30741_easy_bbq_baby_back_ribs_3000x2000-1.jpg&f=1&nofb=1&ipt=60766ffc857efcd5204e5b4c91892d7e8a6c0cb9af6e6bc35560842ddda02200&ipo=images"
    )

    cuisine37 = Recipe(
        name="Mac and Cheese",
        description="Mac and cheese is a classic comfort food dish in American cuisine. It consists of cooked macaroni pasta tossed in a creamy cheese sauce. The cheese sauce is typically made with a combination of cheddar or American cheese, milk, butter, and flour. The cooked pasta is mixed with the cheese sauce and then baked until golden and bubbly. Mac and cheese can be enjoyed as a main dish or as a side dish. It is a popular choice for family dinners, potlucks, and kids' meals.",
        category_id=5,
        user_id=2,
        image="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcantstayoutofthekitchen.com%2Fwp-content%2Fuploads%2FSouthern-Style-Macaroni-and-Cheese-IMG_5837.jpg&f=1&nofb=1&ipt=d3ec46db3eec39b3249fe75e228b1ead086cf24e03cbeed7dd26ee613bf05ec3&ipo=images"
    )

    cuisine38 = Recipe(
        name="Fried Chicken",
        description="Fried chicken is a beloved American dish that features chicken pieces coated in a seasoned flour or breadcrumb mixture and deep-fried until golden and crispy. The chicken is often marinated in buttermilk or seasoned with a blend of spices before being coated and fried. The result is juicy, flavorful meat with a crunchy exterior. Fried chicken is commonly served with sides like mashed potatoes, coleslaw, and biscuits. It is a popular choice for picnics, parties, and casual dining.",
        category_id=5,
        user_id=3,
        image="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fyesofcorsa.com%2Fwp-content%2Fuploads%2F2015%2F07%2F1032_fried_chicken.jpg&f=1&nofb=1&ipt=d8b73f63e3c97397f6ca358f60eba3c311710a6d94ca2a1fce87423b46232e6b&ipo=images"
    )

    cuisine39 = Recipe(
        name="Apple Pie",
        description="Apple pie is a classic American dessert that features a sweet and spiced apple filling baked inside a buttery pastry crust. The filling is made by combining sliced apples with sugar, cinnamon, and sometimes other spices like nutmeg or cloves. The mixture is then poured into a prepared pie crust, topped with a second crust or a lattice pattern, and baked until golden and bubbling. Apple pie is often served with a scoop of vanilla ice cream or a dollop of whipped cream. It is a quintessential dessert during holidays and special occasions.",
        category_id=5,
        user_id=4,
        image="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.raisingsupaman.com%2Fwp-content%2Fuploads%2F2014%2F11%2FHomemade-Organic-Apple-Pie-Dessert.jpg&f=1&nofb=1&ipt=6438213ad8ce0815069ef1dfef8c5ecdade93c4095495fc2963eb2884f5785b8&ipo=images"
    )

    cuisine40 = Recipe(
        name="New York Style Pizza",
        description="New York style pizza is a classic American pizza known for its thin and crispy crust, foldable slices, and generous toppings. The dough is typically made with high-gluten bread flour, water, yeast, and olive oil, resulting in a chewy and flavorful crust. The pizza is traditionally topped with tomato sauce, mozzarella cheese, and various toppings like pepperoni, mushrooms, onions, and peppers. It is baked in a hot oven, resulting in a delicious and satisfying pizza. New York style pizza is a favorite among pizza lovers and is synonymous with the bustling streets of New York City.",
        category_id=5,
        user_id=1,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.asenzya.com%2Fwp-content%2Fuploads%2F2020%2F03%2FNYCPizza_FB.png&f=1&nofb=1&ipt=1362799f54e5e9e6ed5161186f268ddbf23844543b5f20b0566e51e18913a548&ipo=images"
    )
    cuisine41 = Recipe(
        name="Cheeseburger",
        description="The cheeseburger is a variation of the classic hamburger, featuring a beef patty topped with cheese. It is a popular American fast-food item and can also be found in diners and restaurants. The cheeseburger follows the same preparation method as a hamburger, with the addition of a slice of cheese, typically American or cheddar, placed on top of the cooked patty. The cheese melts slightly from the residual heat of the patty, adding a creamy and savory element to the burger. Cheeseburgers are often served with condiments, vegetables, and a side of fries or a salad.",
        category_id=5,
        user_id=2,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.sargento.com%2Fassets%2FUploads%2FRecipe%2FImage%2Fburger_0.jpg&f=1&nofb=1&ipt=75bfb3cf06e0e8376956910b9130947f9824837f1e7ce4618522c4409080ecfa&ipo=images"
    )
    cuisine42 = Recipe(
        name="Croissant",
        description="The croissant is a classic French pastry known for its flaky and buttery texture. It is made from a yeast-leavened dough layered with butter, then rolled and folded multiple times to create thin layers. The croissant is then baked until golden and crisp. It is a versatile pastry that can be enjoyed plain or filled with various sweet or savory fillings like chocolate, almond paste, or ham and cheese. Croissants are a popular choice for breakfast or as a snack with a cup of coffee.",
        category_id=6,
        user_id=3,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsecureservercdn.net%2F198.71.233.51%2F8zq.a8c.myftpupload.com%2Fwp-content%2Fuploads%2F2020%2F03%2FCroissant.jpg&f=1&nofb=1&ipt=655d0db9e8eae6094200da7b6ab8d35a4be1d529abe98f9add48863a019dff3a&ipo=images"
    )

    cuisine43 = Recipe(
        name="Coq au Vin",
        description="Coq au Vin is a classic French dish that features chicken cooked in red wine, typically Burgundy, along with bacon, mushrooms, onions, and aromatic herbs. The chicken is first marinated in the wine along with herbs and spices to enhance the flavor. It is then browned and slowly braised in the marinade, resulting in tender and flavorful meat. The dish is often served with mashed potatoes, rice, or crusty bread. Coq au Vin is a hearty and comforting dish, perfect for special occasions and gatherings.",
        category_id=6,
        user_id=4,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.traiteurs-resto.fr%2Fwp-content%2Fuploads%2F2018%2F10%2Fcoq-au-vin.jpeg&f=1&nofb=1&ipt=d8438d0ec62bb188c7ee237705877ac836030440ba6caf3958d0a196a4f43646&ipo=images"
    )

    cuisine44 = Recipe(
        name="Ratatouille",
        description="Ratatouille is a traditional French vegetable stew that originated in the Provence region. It is made with a combination of summer vegetables such as eggplant, zucchini, bell peppers, tomatoes, and onions. The vegetables are typically sautéed in olive oil with garlic and herbs like thyme and basil until they are tender and flavorful. Ratatouille can be served as a side dish or as a main course, and it pairs well with crusty bread or rice. This vibrant and colorful stew showcases the freshness and simplicity of French cuisine.",
        category_id=6,
        user_id=1,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcleanfoodcrush.com%2Fwp-content%2Fuploads%2F2017%2F08%2FEat-Clean-Classic-Summertime-Ratatouille--1024x683.jpg&f=1&nofb=1&ipt=ca05e4c7a7e91893a98651c9854c7656b14d6d1d0005ee0e0a7b19211a1c4e57&ipo=images"
    )

    cuisine45 = Recipe(
        name="Beef Bourguignon",
        description="Beef Bourguignon is a classic French beef stew made with tender pieces of beef braised in red wine, usually Burgundy, along with carrots, onions, mushrooms, and herbs. The beef is first seared to develop a rich crust, then simmered in the wine and stock until it becomes meltingly tender. The stew is deeply flavored and aromatic, thanks to the wine and herbs. Beef Bourguignon is often served with crusty bread, mashed potatoes, or buttered noodles. It is a comforting and hearty dish, perfect for colder months.",
        category_id=6,
        user_id=2,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstorage.googleapis.com%2Fgen-atmedia%2F3%2F2019%2F03%2Fa640998e0b8145ca00ac5a562381fff6def21a78.jpeg&f=1&nofb=1&ipt=da626e61217c4dcbff5e2ab4929e59e8cc69bda5ee3a55517b9a99632e457443&ipo=images"
    )

    cuisine46 = Recipe(
        name="Crème Brûlée",
        description="Crème Brûlée is a classic French dessert consisting of a creamy custard base topped with a layer of caramelized sugar. The custard is made by combining egg yolks, cream, sugar, and vanilla, then baked in individual ramekins in a water bath until set. Before serving, a thin layer of sugar is sprinkled on top and caramelized with a culinary torch or broiler, creating a satisfying crunchy crust. Crème Brûlée is best enjoyed chilled and is a luxurious and elegant dessert that never fails to impress.",
        category_id=6,
        user_id=3,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fblog.thermoworks.com%2Fwp-content%2Fuploads%2F2016%2F02%2Fcreme_brulee3-20-of-27.jpg&f=1&nofb=1&ipt=23652824fe83ecab71e24da0ac084b0e46999fe809c581baa075628e19b41cf1&ipo=images"
    )

    cuisine47 = Recipe(
        name="Quiche Lorraine",
        description="Quiche Lorraine is a classic French savory tart made with a buttery pastry crust filled with a mixture of eggs, cream, cheese, and bacon. The filling is seasoned with salt, pepper, and sometimes nutmeg. The quiche is baked until the filling is set and the crust is golden and crisp. Quiche Lorraine can be enjoyed warm or at room temperature and is often served as a brunch or lunch dish. It pairs well with a side salad and is a delicious and versatile recipe that can be customized with different ingredients.",
        category_id=6,
        user_id=4,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.simplyrecipes.com%2Fthmb%2FrfneTPyP3cUFVJ06Uqs9p5OkDOk%3D%2F3900x0%2Ffilters%3Ano_upscale()%3Amax_bytes(150000)%3Astrip_icc()%2FSimply-Recipes-Quiche-Lorraine-LEAD-4-bbc2620b4ce444629038f602b6f1b533.jpg&f=1&nofb=1&ipt=2471bd8644e45eaf178a081394c1d4e351e0abfd48fbc09c1bbf7185e4700e7f&ipo=images"
    )

    cuisine48 = Recipe(
        name="Crêpes",
        description="Crêpes are thin and delicate French pancakes made from a simple batter of flour, eggs, milk, and butter. They are cooked in a flat pan or crêpe pan until golden and lacy. Crêpes can be enjoyed with both sweet and savory fillings. Popular sweet fillings include Nutella, fresh fruits, whipped cream, or maple syrup. Savory options may include cheese, ham, mushrooms, or spinach. Crêpes are a versatile and delicious treat, perfect for breakfast, dessert, or a light meal.",
        category_id=6,
        user_id=1,
        image="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F3.bp.blogspot.com%2F-_T_2dNQJzqc%2FUQ1NtQ6SyRI%2FAAAAAAAAEN8%2FLG_LKu-ZP6c%2Fs1600%2Ffrench%2Bcrepes.jpg&f=1&nofb=1&ipt=273ae4df4abe5fb718ab45d77bed7aa0ddd5d82330081b8f9261e5d51c193634&ipo=images"
    )
    cuisine49 = Recipe(
        name="Sushi",
        description="Sushi is a traditional Japanese dish consisting of vinegared rice combined with various ingredients, such as raw or cooked seafood, vegetables, and sometimes tropical fruits. It is often presented as bite-sized pieces and served with soy sauce, wasabi, and pickled ginger. Popular types of sushi include nigiri (hand-pressed rice topped with fish or seafood), maki (rolled sushi with rice and fillings wrapped in seaweed), and sashimi (thinly sliced raw fish or seafood). Sushi is known for its fresh flavors, delicate presentation, and the artistry involved in its preparation.",
        category_id=7,
        user_id=2,
        image="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fblogs.biomedcentral.com%2Fbugbitten%2Fwp-content%2Fuploads%2Fsites%2F11%2F2017%2F05%2FSUSHI-02.jpg&f=1&nofb=1&ipt=8109740dfaf90992909719c7877b5bf61c491a4c75545de613e8c4b5557f7a40&ipo=images"
    )

    cuisine50 = Recipe(
        name="Ramen",
        description="Ramen is a popular Japanese noodle soup dish consisting of wheat noodles served in a flavorful broth, often flavored with soy sauce, miso, or pork bone broth. It is typically topped with ingredients like sliced pork, green onions, bamboo shoots, nori, and a soft-boiled egg. Ramen comes in various styles and regional variations, each with its own unique broth and toppings. It is a comforting and satisfying meal, enjoyed by people of all ages. Ramen shops can be found throughout Japan and have gained popularity worldwide.",
        category_id=7,
        user_id=3,
        image="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgirlontherange.com%2Fwp-content%2Fuploads%2F2015%2F12%2Framen-bowl-again-www.girlontherange.com_.jpg&f=1&nofb=1&ipt=2c7278018d2f96ef561aebb8797e866a00f7dff574a86934dea9471f11b351cc&ipo=images"
    )

    cuisine51 = Recipe(
        name="Tempura",
        description="Tempura is a Japanese dish that consists of battered and deep-fried seafood, vegetables, or even tofu. The ingredients are coated in a light and crispy batter made from flour, water, and sometimes egg. Tempura is typically served with a dipping sauce called tentsuyu, which is made from dashi, soy sauce, and mirin. The dish is known for its delicate and crispy texture, as well as its vibrant presentation. Tempura is a popular choice in Japanese cuisine and is often enjoyed as an appetizer or part of a larger meal.",
        category_id=7,
        user_id=4,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffthmb.tqn.com%2Fu2Cwl5eo951nG4rmIoP20hvC2O0%3D%2F1500x1000%2Ffilters%3Afill(auto%2C1)%2Ftempura-batter-recipe-2031529-8_preview-5aff3fef18ba010037304705.jpeg&f=1&nofb=1&ipt=8d1b1289ac45402b0095d5fa10c106febcc170f1db56f8b0a3e76da44052f7eb&ipo=images"
    )

    cuisine52 = Recipe(
        name="Yakitori",
        description="Yakitori is a popular Japanese dish made of skewered and grilled bite-sized pieces of chicken. The chicken is typically marinated in a sauce made from soy sauce, mirin, sake, and sugar before being cooked over charcoal or a grill. Yakitori can be seasoned with salt or brushed with a sweet and savory sauce called tare while grilling. It is often enjoyed as a snack or appetizer and pairs well with a cold beer or sake. Yakitori is a flavorful and satisfying dish that showcases the simplicity and versatility of Japanese cuisine.",
        category_id=7,
        user_id=1,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.tasteatlas.com%2Fimages%2Fdishes%2F9473009b6d2a4337a34da391c1c948b8.jpg%3Fmw%3D1300&f=1&nofb=1&ipt=502c79e404b65eb1613075ede1cd061a2f7ff3c1534cd558731b1025e059b7db&ipo=images"
    )

    cuisine53 = Recipe(
        name="Udon",
        description="Udon is a type of thick wheat noodle that is commonly used in Japanese cuisine. It is often served in a hot broth made from soy sauce, mirin, and dashi, and can be accompanied by various toppings such as sliced green onions, tempura, or kamaboko (fish cake). Udon noodles have a chewy texture and can be enjoyed in both hot and cold dishes. Whether in a comforting bowl of soup or in a refreshing noodle salad, udon is a versatile ingredient that is beloved in Japanese cuisine.",
        category_id=7,
        user_id=2,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.tasteatlas.com%2Fimages%2Fdishes%2Ff3bfe4b884b7499180d570866c169a5d.jpg&f=1&nofb=1&ipt=53e8c0a18f7be16286a0a3a9bddf4b580947fc1d8d9e286a27b8bbaa350454df&ipo=images"
    )
    cuisine54 = Recipe(
        name="Miso Soup",
        description="Miso soup is a traditional Japanese soup made from fermented soybean paste called miso, along with dashi (a broth made from dried bonito flakes or kelp), tofu, and various ingredients like seaweed, green onions, and mushrooms. Miso soup is commonly enjoyed as a side dish or as a starter in Japanese meals. It has a rich and savory flavor, and the miso paste provides a depth of umami taste. Miso soup is comforting, nourishing, and a staple in Japanese cuisine.",
        category_id=7,
        user_id=3,
        image=https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.chopstickchronicles.com%2Fwp-content%2Fuploads%2F2020%2F10%2FMiso-Soup-update-22-1024x1024.jpg&f=1&nofb=1&ipt=4c563e9a4e992fe9a73fcfa580796ca8d14afb66b14046af043b3e5e69d7a630&ipo=images"
    )

    cuisine55 = Recipe(
        name="Okonomiyaki",
        description="Okonomiyaki is a savory pancake-like dish that is a popular street food in Japan. It is made with a batter of flour, grated yam, water, and shredded cabbage, along with various fillings like pork belly, shrimp, or octopus. The ingredients are mixed together and cooked on a griddle or hot plate. Okonomiyaki is often topped with a sweet and tangy sauce, mayonnaise, bonito flakes, and dried seaweed. It is a versatile dish that can be customized to individual preferences and is enjoyed by people of all ages.",
        category_id=7,
        user_id=4,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.sbs.com.au%2Ffood%2Fsites%2Fsbs.com.au.food%2Ffiles%2Fasia-unplated_ep03_okonomiyaki_mg_5646.jpg&f=1&nofb=1&ipt=a2df9742fb380225670e302d120149075c5a7a86502609a402b7ec6b4aab0be3&ipo=images"
    )

    all_recipes = [
    cuisine1, cuisine2, cuisine3, cuisine4, cuisine5, cuisine6, cuisine7, cuisine8, cuisine9, cuisine10,
    cuisine11, cuisine12, cuisine13, cuisine14, cuisine15, cuisine16, cuisine17, cuisine18, cuisine19, cuisine20,
    cuisine21, cuisine22, cuisine23, cuisine24, cuisine25, cuisine26, cuisine27, cuisine28, cuisine29, cuisine30,
    cuisine31, cuisine32, cuisine33, cuisine34, cuisine35, cuisine36, cuisine37, cuisine38, cuisine39, cuisine40,
    cuisine41, cuisine42, cuisine43, cuisine44, cuisine45, cuisine46, cuisine47, cuisine48, cuisine49, cuisine50,
    cuisine51, cuisine52, cuisine53, cuisine54, cuisine55
]
    add_recipes = [db.session.add(recipe) for recipe in all_recipes]
    db.session.commit()



def undo_recipes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM recipes"))

    db.session.commit()
