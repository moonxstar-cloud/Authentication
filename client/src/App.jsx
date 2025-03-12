import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-in/Signup";

import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyProfile from "./components/MyProfile";
import MyDashboard from "./components/MyDashboard";
import AppTheme from "./components/shared-theme/AppTheme";
import ColorModeIconDropdown from "./components/shared-theme/ColorModeIconDropdown";

function App() {
  return (
    <AuthProvider>

  


      <Router>
        <Routes>
        
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<SignIn />} />

          <Route path="/signup" element={<SignUp />} />

          <Route path="/profile" element={<MyProfile />} />

          <Route path="/dashboard" element={< MyDashboard />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    
    

    </AuthProvider>
  );
}

export default App;
