from app.models import db, User, Ingredient, Recipe, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_ingredients():
    ingredient1 = Ingredient(
        name="Tomato",
        details="The tomato is a versatile ingredient used in various cuisines around the world...",
        user_id=1,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.F9aRYx1h2NsFqWUcOu3qvwHaFj%26pid%3DApi&f=1&ipt=5c72e40bf2b28b921636ed77aaec023cd29efbb786157009c7f578d054af2518&ipo=images"
    )

    ingredient2 = Ingredient(
        name="Rice",
        details="Rice is a staple ingredient in many cuisines, including Japanese, Chinese, Indian, and Mexican...",
        user_id=2,
        image="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F4%2F4b%2FThai_jasmine_rice_uncooked.jpg&f=1&nofb=1&ipt=faf922e058a24a193a6eb37e82231b76429e76a3f916feb7a68238da3c79f65b&ipo=images"
    )

    ingredient3 = Ingredient(
        name="Onion",
        details="Onions are a fundamental ingredient in many cuisines worldwide...",
        user_id=3,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.gardeningknowhow.com%2Fwp-content%2Fuploads%2F2020%2F09%2Fonions.jpg&f=1&nofb=1&ipt=dae2a9fb63d8e4cdb6ade0b5d586c5244e503e9511d22cc2c30376c0a107565a&ipo=images"
    )

    ingredient4 = Ingredient(
        name="Chicken",
        details="Chicken is a versatile protein used in a wide range of cuisines...",
        user_id=4,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.bowrivermeatmarket.ca%2Fwp-content%2Fuploads%2F2020%2F04%2FBLESS-SKINLES-CHICKEN-BREAST-NATURAL-scaled.jpeg&f=1&nofb=1&ipt=1d1a21c047a7172531c9b2bd6ead10afb69e9a70e7e4d40716c7400495b84765&ipo=images"
    )

    ingredient5 = Ingredient(
        name="Soy Sauce",
        details="Soy sauce is a key ingredient in Asian cuisines, particularly Chinese and Japanese...",
        user_id=1,
        image="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgourmetvegetariankitchen.com%2Fwp-content%2Fuploads%2F2019%2F01%2Fhow-to-make-soy-sauce-10.jpeg&f=1&nofb=1&ipt=35f79197d8d988ab363084255ee7d95497cad0e7bdf24b7dc49067ea8bd92a10&ipo=images"
    )

    ingredient6 = Ingredient(
        name="Garlic",
        details="Garlic is a pungent and flavorful ingredient used in a wide range of cuisines...",
        user_id=2,
        image="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F2%2F22%2FGarlic.jpg&f=1&nofb=1&ipt=12bdc8de2d65bc85e5daf871f356c67a8485aae3d3de9b4ab51a502ccd3236f7&ipo=images"
    )

    ingredient7 = Ingredient(
        name="Basil",
        details="Basil is a fragrant herb used in various cuisines around the world...",
        user_id=3,
        image="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Finclusions.org%2Fwp-content%2Fuploads%2F2014%2F09%2Fsweet-basil-plant.jpg&f=1&nofb=1&ipt=6054185bc6c0c03cb6fd6f40cf77c95b9ddd56fd447255e08921b207d7b10ad3&ipo=images"
    )

    ingredient8 = Ingredient(
        name="Cumin",
        details="Cumin is a widely used spice in various cuisines, known for its warm and earthy flavor...",
        user_id=4,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.OFNNXUePfjq7Hpb27R09MQHaFo%26pid%3DApi&f=1&ipt=bb7bacd38dd66f1c54ffd08ef0a799100430c2f6461d78dce3ab69c144cc2b8b&ipo=images"
    )

    ingredient9 = Ingredient(
        name="Olive Oil",
        details="Olive oil is a staple cooking oil used in Mediterranean cuisines...",
        user_id=1,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimporting-house.com%2Fwp-content%2Fuploads%2F2021%2F01%2Fimported-Italian-olive-oil.jpeg&f=1&nofb=1&ipt=4e8cfa53ef68447df7d9b047a2b0549cd00cb3913ad3cdcb46807b339b19c60e&ipo=images"
    )

    ingredient10 = Ingredient(
        name="Sesame Oil",
        details="Sesame oil is a flavorful oil commonly used in Asian cuisines...",
        user_id=2,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.spiceography.com%2Fwp-content%2Fuploads%2F2020%2F05%2FSesame-Oil.jpg&f=1&nofb=1&ipt=e2c089560d17b512d05c8d3ed06fae7dab7ad3dc79c5740eebcecd54916f4895&ipo=images"
    )

    ingredient11 = Ingredient(
        name="Parmesan Cheese",
        details="Parmesan cheese is a hard, aged cheese originating from Italy...",
        user_id=3,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.boingboing.net%2Fwp-content%2Fuploads%2F2016%2F02%2Fshutterstock_133655951.jpg&f=1&nofb=1&ipt=ae4b3cf2139baab6ce27a93a60c7c7bcb0dba2e89a4d8a14f80d1e9460d6451e&ipo=images"
    )

    ingredient12 = Ingredient(
        name="Turmeric",
        details="Turmeric is a vibrant yellow spice commonly used in Indian cuisine...",
        user_id=4,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.dorwest.com%2Fwp-content%2Fuploads%2F2018%2F03%2Fshutterstock_557946919-scaled.jpg&f=1&nofb=1&ipt=5f5b902659e29245c13222481759ce0776b32d27773329e8f861ca9e5e651602&ipo=images"
    )

    ingredient13 = Ingredient(
        name="Baguette",
        details="A baguette is a long, narrow loaf of bread originating from France...",
        user_id=1,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffthmb.tqn.com%2Frsla6Q8gz21EZl7__jch27bbWcI%3D%2F2550x1694%2Ffilters%3Afill(auto%2C1)%2Fbaguette-2500-56a20ec75f9b58b7d0c61ca9.JPG&f=1&nofb=1&ipt=f2d9694253cf5a208e526a1167e5cc4b9773aa2115dfa8ff7ad89594400d7b3e&ipo=images"
    )

    ingredient14 = Ingredient(
        name="Nori",
        details="Nori is a type of edible seaweed used in Japanese cuisine...",
        user_id=2,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thesprucepets.com%2Fthmb%2FX08yW5iHekYRQ3cz8LmN0SUhFMM%3D%2F960x0%2Ffilters%3Ano_upscale()%3Amax_bytes(150000)%3Astrip_icc()%2FGettyImages-615622960-5ae07faa642dca0037e01764.jpg&f=1&nofb=1&ipt=bddfe59c3ed7ab0458e54dc5fc702594742db45a76c963fb76d99fa634e712ae&ipo=images"
    )

    ingredient15 = Ingredient(
        name="Thyme",
        details="Thyme is a versatile herb commonly used in American, French, and Mediterranean cuisines...",
        user_id=3,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhorticulture.co.uk%2Fwp-content%2Fuploads%2F2020%2F11%2Fthyme-header.jpg&f=1&nofb=1&ipt=bc1f604ea567341eb88d5881d37e1cfc7028df513a606c20bf4db152333d5912&ipo=images"
    )

    ingredient16 = Ingredient(
        name="Miso",
        details="Miso is a traditional Japanese seasoning made from fermented soybeans...",
        user_id=4,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fquestionjapan.com%2Fwp-content%2Fuploads%2F2020%2F02%2FMiso-5.jpg&f=1&nofb=1&ipt=8fe22c524a75130f0ee2f98c76dc7b55e8deed871c17eb65ca305ec01eac414a&ipo=images"
    )

    ingredient17 = Ingredient(
        name="Brie Cheese",
        details="Brie cheese is a soft, creamy cheese originating from France...",
        user_id=1,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F8%2F88%2FBrie_01.jpg&f=1&nofb=1&ipt=79736408246c948ed8a54a2e4552a43a6f4ec9bcd600dfe88264c0305bde71a0&ipo=images"
    )

    ingredient18 = Ingredient(
        name="Paneer",
        details="Paneer is a type of fresh cheese commonly used in Indian cuisine...",
        user_id=2,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F-ne0SBRSv-M8%2FWNQ-pUA6NrI%2FAAAAAAAADCE%2FCHsD8u7amZ4VgVc1ytkW7agXG1XAYQOOwCLcB%2Fs1600%2Fhow%252Bto%252Bmake%252Bpaneer.JPG&f=1&nofb=1&ipt=3f5f16ae5ad2ee0c3f0c57fd5524a37038ddb3daa671c21e03a4338435f63342&ipo=images"
    )

    ingredient19 = Ingredient(
        name="Rosemary",
        details="Rosemary is a fragrant herb commonly used in Mediterranean and Italian cuisines...",
        user_id=3,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgardenculturemagazine.com%2Fwp-content%2Fuploads%2Fhow-to-grow-hydroponic-rosemary.png&f=1&nofb=1&ipt=4fcd9698cd64d015fcbf3e6ab01bf459a945c6564ec75586e8c9087be97ec407&ipo=images"
    )
    ingredient20 = Ingredient(
        name="Coconut Milk",
        details="Coconut milk is a creamy liquid extracted from the grated flesh of mature coconuts...",
        user_id=3,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsavingdinner.com%2Fwp-content%2Fuploads%2F2015%2F03%2FCoconut-Milk-smoothie.jpg&f=1&nofb=1&ipt=cdf5c04d89a90e8be923c1f96d1d8ec85da932c1bf2669412ba7c779cfb082b9&ipo=images"
    )

    ingredient21 = Ingredient(
        name="Lemon",
        details="Lemons are citrus fruits known for their sour taste and aromatic zest...",
        user_id=4,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.freefoodphotos.com%2Fimagelibrary%2Ffruit%2Flemon_slices_on_white.jpg&f=1&nofb=1&ipt=d3b6f26dfa5762f2ec156c0761301a0fe30c2227357674a5ab82338001ea3d77&ipo=images"
    )

    ingredient22 = Ingredient(
        name="Ginger",
        details="Ginger is a pungent and spicy root used in many cuisines for its unique flavor...",
        user_id=1,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.homestratosphere.com%2Fwp-content%2Fuploads%2F2020%2F12%2Fginger-root-Dec82020-2-min.jpg&f=1&nofb=1&ipt=3938f18a825f4e531e6c01f8a8468e3b2db77466fc81075573121d424fae1c06&ipo=images"
    )

    ingredient23 = Ingredient(
        name="Black Beans",
        details="Black beans are legumes that are popular in Latin American and Caribbean cuisines...",
        user_id=2,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.gourmetfoodworld.com%2Fimages%2FProduct%2Flarge%2Fblack-beans-dry-1S-927.jpg&f=1&nofb=1&ipt=9ff6dc9eba2481f3738afe654195375c9527ae2beedb0399985e65dd0be094d5&ipo=images"
    )

    ingredient24 = Ingredient(
        name="Paprika",
        details="Paprika is a vibrant red spice made from dried and ground bell peppers...",
        user_id=3,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fprojectwellnessnow.com%2Fwp-content%2Fuploads%2F2020%2F12%2FPAPRIKA-POWDER-.jpeg&f=1&nofb=1&ipt=8093946ec533e8a831fc011b43c597e2a9a76309970ebef8a5c921b0eb441503&ipo=images"
    )

    ingredient25 = Ingredient(
        name="Honey",
        details="Honey is a sweet and viscous substance produced by bees from flower nectar...",
        user_id=4,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbeekeepclub.com%2Fwp-content%2Fuploads%2F2020%2F02%2FHow-to-Harvest-Honey.jpg&f=1&nofb=1&ipt=2e20e56ebea44cc8fada19aa1548023e511ab650c558f9f5422eab81bba9c836&ipo=images"
    )
    ingredient26 = Ingredient(
        name="Quinoa",
        details="Quinoa is a nutritious grain-like seed that is often used as a gluten-free alternative to grains...",
        user_id=1,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.jessicagavin.com%2Fwp-content%2Fuploads%2F2018%2F01%2Fquinoa-8-1200.jpg&f=1&nofb=1&ipt=c7426f735d25b7381da1aecfcf7d862db98981fa84e12fde2b9e36c030ba5d19&ipo=images"
    )

    ingredient27 = Ingredient(
        name="Avocado",
        details="Avocado is a creamy fruit known for its rich, buttery texture and mild taste...",
        user_id=2,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftoday.ttu.edu%2Fposts%2F2019%2F08%2FImages%2Favocados-lg.jpg&f=1&nofb=1&ipt=5777941191aba6ae3164d3fc2ae5429fab48a078e80a06e14fc9afd979256961&ipo=images"
    )

    ingredient28 = Ingredient(
        name="Chickpeas",
        details="Chickpeas, also known as garbanzo beans, are legumes that are commonly used in Mediterranean and Middle Eastern cuisines...",
        user_id=3,
        image="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fhealthyliving.natureloc.com%2Fwp-content%2Fuploads%2F2015%2F11%2Fchickpea-health-benefits.jpg&f=1&nofb=1&ipt=6c8a51ea5b90d2a1aacb59d6da04774a415e539785ac9fe97c2850a28c30c016&ipo=images"
    )

    ingredient29 = Ingredient(
        name="Pineapple",
        details="Pineapple is a tropical fruit known for its sweet and tangy flavor...",
        user_id=4,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.theproducemoms.com%2Fwp-content%2Fuploads%2F2018%2F08%2Fpineapple.jpg&f=1&nofb=1&ipt=7ca6a2ab6b6807f3741765da37193cb450af324dba32534537f87a1b51e4d8ee&ipo=images"
    )
    ingredient30 = Ingredient(
        name="Maple Syrup",
        details="Maple syrup is a natural sweetener made from the sap of maple trees. It has a distinct and rich flavor that is often enjoyed on pancakes, waffles, and desserts...",
        user_id=2,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3.bukalapak.com%2Fbukalapak-kontenz-production%2Fcontent_attachments%2F58873%2Foriginal%2FMaple_Syrup_1.jpg&f=1&nofb=1&ipt=b57a05b1811d04c0e4008baf74e44d7eb9c553a063922e96b7cbe3c8398416d0&ipo=images"
    )
    ingredient31 = Ingredient(
        name="Cilantro",
        details="Cilantro, also known as coriander leaves, is a fresh and aromatic herb commonly used in Mexican, Indian, and Southeast Asian cuisines...",
        user_id=2,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F8b%2F86%2Fbf%2F8b86bf7c39597a178401748bb7689260.jpg&f=1&nofb=1&ipt=07edefc735d3f84b5909636b98610cbb4a336556b2e5baa82de19d619460dee3&ipo=images"
    )

    ingredient32 = Ingredient(
        name="Lime",
        details="Lime is a citrus fruit known for its tangy and acidic taste. It adds a refreshing flavor to dishes and is commonly used in Mexican, Thai, and Vietnamese cuisines...",
        user_id=3,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.newenglandsalts.com%2Fwp-content%2Fuploads%2F2019%2F05%2Flime.jpg&f=1&nofb=1&ipt=beebac9e3dffb03071e6f57d28ba7bc6c32c5f86ad791efa9abd5385a56716c4&ipo=images"
    )

    ingredient33 = Ingredient(
        name="Spinach",
        details="Spinach is a leafy green vegetable that is packed with nutrients. It has a mild and slightly earthy flavor, making it a versatile ingredient in salads, soups, and stir-fries...",
        user_id=4,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.treehugger.com%2Fthmb%2FQqzRcs4_WSSmFWZk6ePBU3QA6K0%3D%2F2121x1414%2Ffilters%3Afill(auto%2C1)%2FGettyImages-914241562-14a45a7d90f04701b48eaf26dac309cd.jpg&f=1&nofb=1&ipt=6f6db8145153e976f9646dd248c075a4d3c5377c4785f6afe4ca846595971d1c&ipo=images"
    )

    ingredient34 = Ingredient(
        name="Cinnamon",
        details="Cinnamon is a warm and aromatic spice that adds a sweet and slightly spicy flavor to both sweet and savory dishes. It is commonly used in baking, desserts, and warm beverages...",
        user_id=1,
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.tasteofhome.com%2Fwp-content%2Fuploads%2F2019%2F02%2Fcinnamon-shutterstock_646377511.jpg&f=1&nofb=1&ipt=1de8f986b34a1b419c72d941753cb55d21bea917bbb4d80bcbb0542d7a5020a7&ipo=images"
    )




    all_ingredients=[ingredient1, ingredient2, ingredient3, ingredient4, ingredient5, ingredient6, ingredient7, ingredient8, ingredient9, ingredient10, ingredient11, ingredient12, ingredient13, ingredient14, ingredient15, ingredient16, ingredient17, ingredient18, ingredient19, ingredient20, ingredient21, ingredient22, ingredient23, ingredient24, ingredient25, ingredient26, ingredient27, ingredient28, ingredient29, ingredient30, ingredient31, ingredient32, ingredient33, ingredient34]
    add_ingredients=[db.session.add(ingredient) for ingredient in all_ingredients]
    db.session.commit()


def undo_ingredients():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.ingredients RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM ingredients"))

    db.session.commit()
