#Anvend https & faker bibliotek til oprettelse af falske enheder som testdata

def create_device(fake, random) -> dict:
    my_dict = {
        "ip": f'{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}',
        "hostname": fake.bs()
    }
    return my_dict