import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import Formulario from "../componentes/Formulario";
import Error from "../componentes/Error";
import { agregarCliente } from "../data/clientes";

//TODO npx json-server db.json to connect API //

export async function action ({request}) { // function de accion del formulario. Se importa en main.jsx y se configura dentro de createBrowserRouter
    
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

    await agregarCliente(datos);


    return redirect('/')
}

const NuevoCliente = () => {

    const navigate = useNavigate();
    const errores = useActionData(); //obtiene el return de los errores de la funcion action

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">New Client</h1>
            <p className="mt-3">All fields are mandatory</p>

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
                    <Formulario />

                    <input 
                        type="submit"
                        className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
                        value="Add new client"
                    />
                </Form>
            </div>
        </>
    );
}

export default NuevoCliente;
