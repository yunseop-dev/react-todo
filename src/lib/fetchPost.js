export default async function fetchPost(url, body) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(async response => {
        const json = await response.json()
        if (response.status >= 400 && typeof json === 'string') throw new Error(result)
        return json;
    })
}