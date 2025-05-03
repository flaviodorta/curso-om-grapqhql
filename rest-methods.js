import fetch from 'node-fetch';

const API_URL = process.env.API_URL;

const get = (endPoint, urlParam, requestInit = {}) => {
  const url =
    API_URL + '/' + endPoint + '?' + new URLSearchParams(urlParam).toString();
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...requestInit,
  });
};

const post = (endPoint, body, requestInit = {}) => {
  const url = API_URL + '/' + endPoint;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...requestInit,
  });
};

const put = (endPoint, body, requestInit = {}) => {
  const url = API_URL + '/' + endPoint;
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...requestInit,
  });
};

const patch = (endPoint, body, requestInit = {}) => {
  const url = API_URL + '/' + endPoint;
  return fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...requestInit,
  });
};

const del = (endPoint, body, requestInit = {}) => {
  const url = API_URL + '/' + endPoint;
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...requestInit,
  });
};

// (async () => {
//   const userGetResponse = await get('users/1000');
//   const user = await userGetResponse.json();
//   console.log(user);
// })();

// (async () => {
//   const userResponse = await put('users/1000', {
//     id: '1000',
//     firstName: 'Jimmy',
//     lastName: 'Zenek',
//   });
//   const user = await userResponse.json();
//   console.log(user);
// })();

// (async () => {
//   const userResponse = await del('users/1000', {
//     id: '1000',
//     firstName: 'Jimmy',
//     lastName: 'Zenek',
//   });
//   const user = await userResponse.json();
//   console.log(user);
// })();
