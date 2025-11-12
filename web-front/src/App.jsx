import AppRoutes from './routes/AppRoutes';
import './App.css';

import { Toaster } from "sonner";

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster richColors />
    </>
  );
}

export default App;