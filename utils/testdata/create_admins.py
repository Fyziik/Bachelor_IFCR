#Anvend https & faker bibliotek til oprettelse af falske admins som testdata

def create_admin(fake, time_now, time_changed) -> dict:
    my_dict = {
        "name": fake.name(),
        "password": fake.password(),
        "date_created": time_now,
        "date_changed": time_changed
    }
    return my_dict