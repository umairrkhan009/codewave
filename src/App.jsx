import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/room/:roomId",
    element: (
      <ProtectedRoute>
        <Room />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <div className="h-[100dvh] font-inter">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
