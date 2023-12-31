import './App.css';
import PlanetProvider from './context/PlanetProvider';
import Table from './components/Table';

function App() {
  return (
    <PlanetProvider className="App">
      <Table />
    </PlanetProvider>
  );
}

export default App;
