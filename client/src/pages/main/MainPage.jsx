import { Outlet } from 'react-router-dom'
import Menu from '../../components/menu/Menu';
import './MainPage.css'

const MainPage = () => {
  return (
    <div className="main-container">
      <aside>
        <Menu />
      </aside>
      <main>
       <Outlet/>
      </main>
    </div>
  )
}

export default MainPage;
