import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss'
import Error from './component/Error';
import UserPage from './component/user/UserPage';
import Home from './component/Home';
import Login from './component/Login/Login';
import Register from './component/Login/Register';
import Doc from './component/Doc';
import About from './component/user/About';
import AdminPage from './component/admin/AdminPage';
import ClassRoom from './component/admin/ClassRoom';
import User from './component/admin/User';
import ClassUser from './component/user/ClassUser';
import Profile from './component/user/Profile';
import PrivateRoutes from './routes/PrivateRoutes';
import { BrowserRouter } from 'react-router-dom';
import CurrentClass from './component/user/Class/currentClass'
import Stream from './component/user/Class/Stream';
import ClassWord from './component/user/Class/ClassWord';
import People from './component/user/Class/People';
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' exect element={<UserPage />}>
            <Route index path='/home' element={<Home />} />
            <Route path='/user/doc' element={<Doc />} />
            <Route path='/user/about' element={<About />} />
            <Route element={<PrivateRoutes />}>
              <Route path='/user/allclass' element={<ClassUser />} />
              <Route path='/user/profile' element={<Profile />} />
            </Route>
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path='/user/currentClass' element={<CurrentClass />} >
              <Route path='/user/currentClass/stream' element={<Stream />} />
              <Route path='/user/currentClass/classword' element={<ClassWord />} />
              <Route path='/user/currentClass/people' element={<People />} />
            </Route>
          </Route>


          <Route element={<PrivateRoutes />}>
            <Route path='/admin' element={<AdminPage />}>
              <Route index element={<Home />} />
              <Route path='/admin/users' element={<User />} />
              <Route path='/admin/classroom' element={<ClassRoom />} />
            </Route>
          </Route>
          <Route path='*' element={<Error />} />

        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App;
