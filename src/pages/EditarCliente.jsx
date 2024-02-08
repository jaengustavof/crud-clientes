import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom";
import { obtenerCliente, actualizarCliente } from "../data/clientes";
import Formulario from "../componentes/Formulario";
import Error from "../componentes/Error";

export async function loader({params}) {

    const cliente = await obtenerCliente(params.clienteid)
    
    return cliente
}

export async function action({request, params}) {
    
    const formData = await request.formData();
    const datos = Object.fromEntries(formData);
    const email = formData.get('email')

    //Validacion del formulario
    const errores = [];
    if(Object.values(datos).includes('')) {
        errores.push('Todos los campos son obligatorios')
    }

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if(!regex.test(email)) {
        errores.push('El Email no es válido')
    }

    if(Object.keys(errores).length) {
        return errores
    }

    //actualizar cliente
    await actualizarCliente(params.clienteid, datos);

    return redirect('/')
}

const EditarCliente = () => {

    const navigate = useNavigate();
    const client = useLoaderData();
    const errores = useActionData();

    //console.log(client)

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Edit Client Details</h1>
            <div className="flex justify-end">
                <button
                    className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
                    onClick={() => navigate('/')}
                >
                    Back
                </button>
            </div>

            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10">

                {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error> //tiene apertura y cierre porque es un componente con {children}
                )} 
                <Form
                    method="POST"
                >
                    <Formulario 
                        cliente={client}
                    />

                    <input 
                        type="submit"
                        className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
                        value="Edi client"
                    />
                </Form>
            </div>
        </>
    );
}

export default EditarCliente;
