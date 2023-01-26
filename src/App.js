import './App.css';
import { FilteringTable } from './components/FilteringTable';
// import { SortingTable } from './components/SortingTable';
import { PaginationTable } from './components/PaginationTable';
function App() {
  return (
    <div className='App'>
      <PaginationTable />
    </div>
  )
}

export default App;
