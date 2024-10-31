import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmailVerification from "./pages/EmailVerification";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
