'use server'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers"
import { cache } from "react"

const server_url = process.env.SERVER_URL + '/'
export const cache_post = cache(async (url: any, data: any) => {
    url = server_url + url

    const response = await fetch(
        url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            cache: 'force-cache',
            next: { revalidate: 30000 }
        },
    )
    try {
        const json = await response.json()
        return json
    } catch (error) {
        console.error('Error:', error)
        throw Error('An error occurred')
    }
})

export const post = async (url: any, data: any) => {
    url = server_url + url

    const response = await fetch(
        url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        },
    )
    try {
        const json = await response.json()
        return json
    } catch (error) {
        console.error('Error:', error)
        throw Error('An error occurred')
    }
}

export const basic_post = cache(async (url: any, data: any) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    try {
        const json = await response.json()
        return json
    } catch (error) {
        console.error('Error:', error)
    }
})

export const get = cache(async (url: any, c: boolean = true) => {
    url = server_url + url

    const response = await fetch(
        url,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

            ...(c ? { cache: 'force-cache', next: { revalidate: 30000 } } : {})
        },

    )
    try {
        const json = await response.json()
        return json
    } catch (error) {
        console.error('Error:', error)
    }
})


export const post_with_token = cache(async (url: any, data: any) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    if (token === undefined)
        return {
            error: 'Unauthorized',
        }

    const response = await fetch(
        server_url + url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.value}`,
            },
            body: JSON.stringify(data),
            cache: 'force-cache',
            next: { revalidate: 30000 }
        },

    )
    try {
        const json = await response.json()
        return json
    } catch (error) {
        console.error('Error:', error)
        return {
            error: 'An error occurred',
        }
    }
})

export const get_with_token = cache(async (url: any, c: boolean = true) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    if (token === undefined)
        return {
            error: 'Unauthorized',
        }

    const response = await fetch(
        server_url + url,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.value}`,
            },
            ...(c ? { cache: 'force-cache', next: { revalidate: 30000 } } : {})
        },

    )
    try {
        const json = await response.json()
        return json
    } catch (error) {
        return {
            error: 'An error occurred ' + error,
        }
    }
})