import { Outlet, Link, useLocation } from "react-router-dom";

//Este es el layout para toda la aplicacion. Se manendra igual para todas las paginas y lo que cambiara es el contenido del Outlet
const Layout = () => {

    const location = useLocation();

    return (
        <div className="md:flex md:min-h-screen">
            <aside className="md:w-1/4 bg-blue-900 px-5 py-10">
                <h2 className="text-4xl font-black text-center text-white">CRM - Clients</h2>

                <nav className="mt-10">
                    <Link 
                        className={`${location.pathname === '/' ? 'text-blue-300': 'text-white'} text-2xl block mt-2 hover:text-blue-300`} 
                        to="/">Clients</Link>

                    <Link 
                        className={`${location.pathname === '/clientes/nuevo' ? 'text-blue-300': 'text-white'} text-2xl block mt-2 hover:text-blue-300`} 
                        to="/clientes/nuevo">New Client</Link>

                </nav>
            </aside>
            <main className="md:w-3/4 p-10 md:h-screen overflow-scroll">
                <Outlet/>
            </main>
        </div>

        
    );
}

export default Layout;
