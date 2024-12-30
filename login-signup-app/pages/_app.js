import "../styles/globals.css";
import "../styles/navbar.css";
import { AuthProvider } from "../pages/AuthContext"; 

function MyApp({Component, pageProps}) {
  return (
    <div>
      <AuthProvider>
      <Component {...pageProps} />
      </AuthProvider>
    </div>
  );
}

export default MyApp;
