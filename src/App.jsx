import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "tailwindcss/tailwind.css";
import Homepage from "./pages/homepage";
import AppWrapper from "./components/AppWrapper";
import Agreement from "./pages/agreement";

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
  return <RouterProvider router={router} />;
}

export default App;
