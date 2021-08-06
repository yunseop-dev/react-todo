export default async function fetchPost(url, body, headers) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify(body)
    }).then(async response => {
        const result = await response.json()
        if (response.status >= 400 && typeof result === 'string') throw new Error(result)
        return result;
    })
}