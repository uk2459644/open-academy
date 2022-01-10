import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import { ProductList } from './components/_dashboard/products';
import FormulaEditor from './pages/FormulaEditor';
import ContentEditor from './pages/ContentEditor';
import UnitList from './pages/UnitList';
import PhotosFolder from './pages/PhotosFolder';
import PhotosList from './pages/PhotosList';
import TopicList from './pages/TopicList';
import QuestionList from './pages/QuestionList';
import Intro from './pages/Intro';
import SetCategory from './pages/set-pages/SetCategory';
import SetList from './pages/set-pages/SetList';
import SetListQuestion from './pages/set-pages/SetListQuestion';
import SetLogin from './pages/set-pages/SetLogin';
import GetSetQuestions from './pages/set-pages/GetSetQuestions';

// ----------------------------------------------------------------------

export default function Router() {
 
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Navigate to="app" replace /> },
       // { path: '/', element: <DashboardApp /> },
        { path: 'app', element: <Intro /> },
        { path: 'photos', element: <PhotosFolder /> },
        {path:'sets',element:<SetCategory />},
        {path:'set-login',element:<SetLogin />},
        {path:'sets/:id',element:<SetList />},
        {path:'sets/:setCatId/:setId',element:<SetListQuestion />},
        { path: 'courses', element: <Products /> },
        {path:'courses/:id',element:<UnitList />},
        {path:'courses/:courseId/:unitId',element:<TopicList />},
        {path:'courses/:courseId/:unitId/:topicId',element:<QuestionList />},
        {path:'photos/:id/:folder',element:<PhotosList />},
        {path:'formula',element:<FormulaEditor />},
        {path:'content',element:<ContentEditor />},
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

