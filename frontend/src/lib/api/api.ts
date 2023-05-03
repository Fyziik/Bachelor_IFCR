const base = 'http://localhost:5000';

export const getAllAdmins = async () => {
  return httpGet(`${base}/admin`).then(res => res.json());
}

function httpGet(url) {
  return fetch(url);
}

async function httpPost(url, body) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

async function httpPut(url, body) {
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
};

async function httpDelete(url) {
  return fetch(url, { 
    method: 'delete',
  })
}