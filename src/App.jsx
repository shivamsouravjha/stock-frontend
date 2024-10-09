import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "tailwindcss/tailwind.css";
import Homepage from "./pages/homepage";
import AppWrapper from "./components/AppWrapper";
import Agreement from "./pages/agreement";
import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createBrowserRouter([
  {
    element: <AppWrapper />,
    children: [
      {
        element: <Homepage />,
        path: "/",
      },
      {
        element: <Agreement />,
        path: "/agreement",
      },
    ],
  },
]);

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} redirect={import.meta.env.VITE_GOOGLE_REDIRECT_URL}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  )
}

export default App;
