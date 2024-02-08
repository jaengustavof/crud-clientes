import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from './componentes/Layout';
import NuevoCliente, { action as nuevoClienteAction } from './pages/NuevoCliente';
import Index, { loader as clientesLoader } from './pages/Index';
import ErrorPage from './componentes/ErrorPage';
import EditarCliente, { loader as editarClienteLoader, action as editarClienteAction } from './pages/EditarCliente';
import { action as eliminarClienteAction } from './componentes/Cliente';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [ //Como hemos definido un Outlet en el componente Layout, todo lo que pongamos dentro de children sera la ruta y lo que Outlet mostrara
      {
        index: true, //Asi podemos definir elements en la pagina principal, sin modificar el Layout
        element: <Index />,
        loader: clientesLoader,
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente />,
        action: nuevoClienteAction,
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/:clienteid/editar',
        element: <EditarCliente />,
        loader: editarClienteLoader,
        action: editarClienteAction,
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/:clienteid/eliminar',
        action: eliminarClienteAction

      }
    ]
  }
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
