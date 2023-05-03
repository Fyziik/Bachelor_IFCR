#Anvend https & faker bibliotek til oprettelse af falske vulnerabilities som testdata

existing_vulnerabilities = [
    {
        "vuln_name": "SSL/TLS: Report Vulnerable Cipher Suites for HTTPS",
        "solution": "The configuration of this services should be changed so that it does not accept the listed cipher suites anymore",
        "references": "CVE-something",
        "proof": "cipher suites accepted by this service via the TLSv1.2 protocol: TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32)"
    },
    {
        "vuln_name": "SSL/TLS: Renegotiation DoS Vulnerability (CVE-2011-1473, CVE-2011-5094)",
        "solution": "Users should contact their vendors for specific patch information. A general solution is to remove/disable renegotiation capabilities altogether from/in the affected",
        "references": "CVE-2011-1473, CVE-2011-5094",
        "proof": "Successful re-done SSL/TLS handshakes (Renegotiation) over an existing / already established SSL/TLS connection"
    },
    {
        "vuln_name": "Network Time Protocol (NTP) Mode 6 Query Response Check",
        "solution": "The following mitigation possibilities are currently available: - Generally disable public access to the UDP port of this NTP service.",
        "references": "CVE-something2",
        "proof": "The remote NTP service responded on Mode 6 queries. We have sent a query request of 12 bytes and received a response of 324 bytes"
    }
]

def generate_random_bool(random) -> bool:
    return bool(random.randint(0, 1))

def generate_random_importance(random) -> str:
    random_num = random.randint(0, 10)
    if random_num < 3:
        return 'low'
    elif random_num > 2 and random_num < 7:
        return 'medium'
    else:
        return 'high'


def create_vuln(fake, random, time_now) -> dict:
    chosen_vuln = random.choice(existing_vulnerabilities)
    my_dict = {
        "vulnerability_name": chosen_vuln['vuln_name'],
        "target_ip": f'{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}',
        "target_name": fake.bs(),
        "port": random.randint(0, 65536),
        "importance": generate_random_importance(random),
        "qod": f'{random.randint(0, 100)}%',
        "date_found": time_now,
        "solution": chosen_vuln['solution'],
        "references": chosen_vuln['references'],
        "proof": chosen_vuln['proof'],
        "status": generate_random_bool(random),
        "archived": generate_random_bool(random),
        "false_positive": generate_random_bool(random),
        "step_guide_link": fake.url(),
    }
    return my_dict