import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './routes.jsx';
import { SessionProvider } from './context/SessionContext.jsx';

function App() {
  return (
    <div className="bg-blue-100 min-h-screen">
      <SessionProvider>
        <RouterProvider router={router}/>
      </SessionProvider>
      <RouterProvider router={router} />
    </div>
    
  );
}

export default App;
