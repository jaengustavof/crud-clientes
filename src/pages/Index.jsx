import { useLoaderData } from "react-router-dom"; //la informacion del loader se define en main.jsx loader: clientesLoader
import Cliente from "../componentes/Cliente";
import { obtenerClientes } from "../data/clientes";

//TODO npx json-server db.json to connect API //

export function loader() { //actua como un useEffect, es una funcion propia de React Router Dom. Se importa desde main y de define como loader de la seccion. Se activa con useLoaderData

    const clientes = obtenerClientes();

    return clientes;
}

const Index = () => {

    const clientes = useLoaderData();
    
    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Clients</h1>
            <p className="mt-3">Manage your clients</p>

            {clientes.length ? (
                <table className="w-full bg-white shadow mt-5 table-auto">
                    <thead className="bg-blue-800 text-white">
                        <tr>
                            <th className="p-2">Clients</th>
                            <th className="p-2">Contacts</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                            {clientes.map((cliente) => (

                                <Cliente 
                                    cliente={cliente}
                                    key={cliente.id}
                                />
                                
                            ))}
                        </tbody>
                </table>
            ) : (
                <p className="text-center mt-10"></p>
            )}
        </>
    );
}

export default Index;
