import { BrowserRouter,Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Chat from "./components/Chat";
import EditProfile from "./components/EditProfile";
import Requests from "./pages/Requests";
import Connections from "./pages/Connections";

function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter>
       <Routes>
        <Route path="/" element={<Body />}>
            <Route index element={<Feed />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/profile/view" element={<Profile />}/>
          <Route path="/profile/edit" element={<EditProfile />}/>
          <Route path="/requests" element={<Requests />}/>
          <Route path="/connections" element={<Connections />}/>
          <Route path="/feed" element={<Feed />}/>
          <Route path="/chat/:targetUserId" element={<Chat />} />
        </Route>
       </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;