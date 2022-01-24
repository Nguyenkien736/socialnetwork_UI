
import './App.css';
import Home from './pages/home/Home';
import { matchPath, Navigate } from 'react-router';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


import Threadpage from './pages/threads/threadpage';
import Login from './pages/login/Login'
import Register from './pages/signup/Register'
import Profile from './pages/profile/profile'
import Mythreads from './pages/mythreads/mythreads';
import SearchPage from './pages/searchresult/searchpage';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import FollowersPage from './pages/followerpage/followers'
import FollowingsPage from './pages/followingpage/followingspage'
import Infopage from './pages/infopage/infopage'
import SavedThreadPage from './pages/savedThread/savedThread'
import MyGroupPage from './pages/groups/mygrouppage'
import GroupPage from './pages/grouppage/grouppage'
import AdminGroupPage from './pages/adminGroup/admingrouppage';
import AdminPage from './pages/adminpage/adminpage'


function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>

        <Route path="/home" element={user ? <Home /> : <Register />}>
        

        </Route>
        <Route path="/search/:userName" element={<SearchPage></SearchPage>}>
        

        </Route>
        <Route path="/followers" element={<FollowersPage></FollowersPage>}>
        

        </Route>
        <Route path="/followings" element={<FollowingsPage></FollowingsPage>}>
        

        </Route>
        <Route exact path="/" element={user ? <Home /> : <Register />}></Route>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}>
          

        </Route>
        <Route path="/register" element= {user ? <Navigate to="/" /> : <Register />}>
          
        </Route>
        <Route path="/profile/:username" element={<Profile></Profile>}>
        </Route>
        <Route path="/mystory" element={user ? <Navigate to="/" /> : <Login />}>
          

          </Route>
          <Route path="/mythread" element={user ? <Mythreads></Mythreads> : <Login />}>
          

          </Route>

          <Route path="/threadpage/:threadId" element={<Threadpage></Threadpage>}>
          

          </Route>
          <Route path="/infopage" element={<Infopage></Infopage>}>
          

          </Route>
          <Route path="/savedthreads" element={<SavedThreadPage></SavedThreadPage>}>
          </Route>
          <Route path="/mygroups" element={<MyGroupPage></MyGroupPage>}>
          </Route>
          <Route exact path="/groups/:groupId" element={<GroupPage></GroupPage>}>
          </Route>
         < Route path="/groups/:groupId/adminpage" element={<AdminGroupPage></AdminGroupPage>}>
          </Route>
          < Route path="/admin" element={<AdminPage></AdminPage>}>
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
