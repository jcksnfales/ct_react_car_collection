let token = "142803f7cafba445e5fcee3c160ae226d3f41b7809b4ed36"

export const server_calls = {
    get: async () => {
        const response = await fetch(`https://car-inventory-6im3.onrender.com/api/cars`,
        {
            method: 'GET',
            headers: {
                'x-access-token': `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*',
            }
        })

        if (!response.ok) {
            throw new Error('Failed to fetch data from the server')
        }

        return await response.json()
    },

    create: async (data:any = {}) => {
        const response = await fetch(`https://car-inventory-6im3.onrender.com/api/cars`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error('Failed to create new data on server')
        }

        return await response.json()
    },

    update: async (id:string, data:any = {}) => {
        const response = await fetch(`https://car-inventory-6im3.onrender.com/api/cars/${id}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error('Failed to update data on server')
        }

        return await response.json()
    },

    delete: async (id:string) => {
        const response = await fetch(`https://car-inventory-6im3.onrender.com/api/cars/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'x-access-token': `Bearer ${token}`
            }
        })

        if (!response.ok) {
            throw new Error('Failed to delete data on server')
        }

        return;
    }
}