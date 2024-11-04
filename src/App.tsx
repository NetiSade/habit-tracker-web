import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./auth/context/AuthContext";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
