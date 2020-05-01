const BASE_URL = 'http://localhost:8000';

let headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export const setToken = (token: string | null) => {
    if (token) {
        headers = {
            ...headers,
            Authorization: 'bearer ' + token,
        };
    } else {
        let { Authorization, ...otherHeaders } = headers;
        headers = otherHeaders;
    }
};

export const apiCall = async (
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    content: any = null
) => {
    if (content && (method === 'GET' || method === 'DELETE')) {
        path = path + '?' + new URLSearchParams(content).toString();
        content = null;
    }
    return fetch(BASE_URL + path, {
        method,
        headers,
        body: content ? JSON.stringify(content) : null,
    }).then((response) => response.json());
};
