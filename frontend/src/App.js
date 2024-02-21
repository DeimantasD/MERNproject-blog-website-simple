import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import CreateBlog from './pages/CreateBlog';
import BlogPage from './pages/BlogPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EditBlog from './pages/EditBlog';
import TitlePage from './pages/TitlePage';
import ErrorPage from './pages/ErrorPage'; 

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/title" />}
            />
            <Route
              path="/createblog"
              element={user ? <CreateBlog /> : <Navigate to="/login" />}
            />
            <Route
              path="/blog/:id"
              element={user ? <BlogPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route path="/edit/:id" element={<EditBlog />} />
            <Route
              path="/title"
              element={!user ? <TitlePage /> : <Navigate to="/" />}
            />

            
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;