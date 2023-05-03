import faker, random, requests, json
from datetime import date, timedelta
import create_vulns, create_admins,create_companies, create_users, create_devices

'''
        COMPANY - 1:1 relationship with admin
            - id: num
            - name: str
            - cvr: str

        ADMIN - 1:many relationship with users
            - id: num
            - name: str
            - password: str
            - creation_date: str
            - changed_date: str
        
        USER - 1:many relationship with devices
            - id: num
            - name: str
            - password: str
            - cpr: str
            - email: str
        
        DEVICES - 1:many relationship with vulnerabilities
            - id: num
            - ip: str
            - hostname: str 
        
        VULNERABILITIES
            - id: num
            - vuln_name: str
            - target_ip: str (could be retrieved from device "table")
            - target_name: str (could be retrieved from device "table")
            - port: str
            - importance: str
            - qod: num
            - first_occurance: str
            - solution: str
            - external_references: str / array / delimiter
            - proof: str
            - status: str
            - is_archived: bool
            - is_false_positve: bool
            - stepguide_link: str
'''

fake = faker.Faker('da_DK')

if __name__ == "__main__":
    time_now = date.today()
    time_changed = time_now + timedelta(days=20)
    
    #Create random admin
    random_admin = create_admins.create_admin(fake, time_now.strftime('%m/%d/%Y'), time_changed.strftime('%m/%d/%Y'))
    
    #Create random company
    random_company = create_companies.create_company(fake, random)

    def generate_user_with_random_devices_and_random_vulnerabilities() -> list: #All of this could probably be redone, so a user already comes with pre-defined devices & vulns
        user = create_users.create_user(fake, random)
        array_of_devices = [create_devices.create_device(fake, random) for x in range(random.randint(1, 5))]
        for device in array_of_devices:
            device['vulnerabilities'] = [create_vulns.create_vuln(fake, random, time_now) for x in range(random.randint(1, 5))]
        collected_user = {
            "user_data": user,
            "device_data": array_of_devices
        }
        return collected_user

    to_add_to_db = { #Users should have their own devices, and devices should have their own vulns
        "company_data": random_company,
        "admin_data": random_admin,
        "user_data": [generate_user_with_random_devices_and_random_vulnerabilities() for x in range(random.randint(1, 3))]
    }

    #Post data to backend
    url = "http://localhost:5000/test"
    headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
    r = requests.post(url, data=json.dumps(to_add_to_db, indent=4, sort_keys=True, default=str), headers=headers)
    print(r.status_code)
    pass