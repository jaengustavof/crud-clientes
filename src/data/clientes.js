//TODO npx json-server db.json to connect API //

export const obtenerClientes = async () => {

    const response = await fetch(import.meta.env.VITE_API_URL);
    const result = await response.json()
    
    return result;
}

export const obtenerCliente = async (id) => {

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
        const result = await response.json()
        return result;
    } catch (error) {

        throw new Response('', {
            status: 404,
            statusText: 'No client with this ID'
        })
        
    }

}

export const agregarCliente = async (datos) => {

    try {

        const response = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-type': 'application/json'
            }
        });

        await response.json();

    } catch (error) {

        console.log(error);

    }
}

export const actualizarCliente = async (id, datos) => {

    try {

        const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: {
                'Content-type': 'application/json'
            }
        });

        await response.json();

    } catch (error) {

        console.log(error);

    }

}

export const eliminarCliente = async (id) => {
    try {

        const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'DELETE',

        });

        await response.json();

    } catch (error) {

        console.log(error);

    }
}