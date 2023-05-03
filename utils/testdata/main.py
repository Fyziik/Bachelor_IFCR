import faker, random, requests, json
from datetime import date, timedelta
import create_vulns, create_admins,create_companies, create_users, create_devices

fake = faker.Faker('da_DK')

if __name__ == "__main__":
    time_now = date.today()
    time_changed = time_now + timedelta(days=20)

    #Create random vulnerability
    random_vuln = create_vulns.create_vuln(fake, random, time_now)
    
    #Create random admin | moved to the post section
    #random_admin = create_admins.create_admin(fake, time_now.strftime('%m/%d/%Y'), time_changed.strftime('%m/%d/%Y'))
    
    #Create random company
    random_company = create_companies.create_company(fake, random)

    #Create random user
    random_user = create_users.create_user(fake, random)

    #Create random device
    random_device = create_devices.create_device(fake, random)

    #Post data to backend
    url = "http://localhost:5000/admin"
    headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
    for x in range(int(input('How many times?: '))):
        random_admin = create_admins.create_admin(fake, time_now.strftime('%m/%d/%Y'), time_changed.strftime('%m/%d/%Y'))
        r = requests.post(url, data=json.dumps(random_admin, indent=4, sort_keys=True, default=str), headers=headers)
        print(r.status_code)
    pass