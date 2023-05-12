const base = 'http://localhost:5000'

export const getAllAdmins = async () => {
  return httpGet(`${base}/admins`).then(res => res.json())
}

export const getTestData = async () => {
  return httpGet(`${base}/test`).then(res => res.json())
}

function httpGet(url: string) {
  return fetch(url)
}

async function httpPost(url: string, body: JSON) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

async function httpPut(url: string, body: JSON) {
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

async function httpDelete(url: string) {
  return fetch(url, {
    method: 'delete'
  })
}
