
import '../app.css'
import Body from './Body'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import Feed from './Feed';
import Connections from './Connections'
import Requests from './Requests'
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/",
          element: <Feed />,
        },
        {
          path: "/home",
          element: <h1>Home</h1>,
        },
        {
          path: "/about",
          element: <h1>About</h1>,
        }, {
          path: "/login",
          element: <Login />,
        }, {
          path: "/signup",
          element: <Signup />,
        }, {
          path: "/profile",
          element: <Profile />,
        }, {
          path: "/connections",
          element: <Connections />,
        }, {
          path: "/requests",
          element: <Requests />,
        }
      ],
    },
  ])
  return (
    <Provider store={appStore}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
