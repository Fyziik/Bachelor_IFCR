#Anvend https & faker bibliotek til oprettelse af falske virksomheder som testdata

def create_company(fake, random) -> dict:
    my_dict = {
        "name": fake.bs(),
        "CVR": random.randint(1000, 10000),
    }
    return my_dict