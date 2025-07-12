import './App.css'
import Banner from './components/Pagina_main/Banner/Banner';
import Categories from './components/Pagina_main/Categories/Categories';
import MostSold from './components/Pagina_main/MostSold/MostSold';
import NewSeries from './components/Pagina_main/NewSeries/NewSeries';
import NewProducts from './components/Pagina_main/NewProducts/NewProducts';

function App() {
  return (
    <>
      <Banner />
      <Categories />
      <MostSold />  
      <NewSeries />
      <NewProducts />
    </>
  )
}

export default App


