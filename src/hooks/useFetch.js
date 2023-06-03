import { useState, useEffect } from "react";

export const useFetch = (url) => {
    const [data, setData] = useState(null)

    const [config, setConfig] = useState(null)
    const [method, setMethod] = useState(null)
    const [callFetch, setCallFetch] = useState(null)

    const [itemId, setItemId] = useState(null) // Delete
    const [itemIdEdit, setItemIdEdit] = useState(null) // Patch

    const [error, setError] = useState(null)

    // GET
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url)
                const json = await res.json() 
                setData(json)
            } catch (e) {
                console.log(e.message)
                setError('Houve algum erro ao carregar os dados!')
            }
        }

        fetchData();
    }, [url, callFetch, data])

    const httpConfig = (data, method, id) => {
        if (method === 'POST') {
            setConfig({
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            setMethod(method)
        } else if (method === 'DELETE') {
            setConfig({
                method,
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            setMethod(method)
            setItemId(data)
        } else if (method === 'PATCH') {
            setConfig({
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            setMethod(method)
            setItemIdEdit(id)
        }
    }

    useEffect(() => {
        const httpRequest = async () => {
            let json

            if (method === 'POST') {
                let fetchOptions = [url, config]

                const res = await fetch(...fetchOptions)
                json = await res.json()
            } else if (method === 'DELETE') {
                const deleteUrl = `${url}/${itemId}`

                const res = await fetch(deleteUrl, config)
                json = await res.json()
            } else if (method === 'PATCH') {
                const editUrl = `${url}/${itemIdEdit}`;

                const res = await fetch(editUrl, config);
                json = await res.json();
            }

            setCallFetch(json);
        };

        httpRequest()
    }, [config, method, url])

    return { data, httpConfig, error }
}   
