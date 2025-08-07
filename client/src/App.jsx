import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './routes.jsx';

function App() {
  return (
    <div className="bg-blue-100 min-h-screen">
      <RouterProvider router={router} />
    </div>
    
  );
}

export default App;
