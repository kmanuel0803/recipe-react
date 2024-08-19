// App.tsx
import './App.css';
import { Navbar } from './components/layout/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
