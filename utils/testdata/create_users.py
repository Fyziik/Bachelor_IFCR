#Anvend https & faker bibliotek til oprettelse af falske brugere som testdata

def create_user(fake, random) -> dict:
    my_dict = {
        "name": fake.name(),
        "password": fake.password(),
        "cpr": f'{random.randint(100000, 999999)}-{random.randint(1000, 9999)}',
        "email": fake.email(),
    }
    return my_dict