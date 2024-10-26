// import "./App.css";
// import SideBar from "./components/Sidebar/SideBar";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Users from "./pages/Users";
// import FileManager from "./pages/FileManager";
// import Order from "./pages/Order";
// import Saved from "./pages/Saved";
// import Setting from "./pages/Setting";
// import AcademicAffairsForm from "./components/form/AcademicAffairsForm";
// import NavBar from "./pages/NavBar";
// import Login from "./pages/Login";
// import EntityTable from "./components/form/EntityTable";
// function App() {
//   return (
//     <Router>
//       <NavBar />
//       <SideBar>
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/users" element={<Users />} />
//           <Route path="/EntityCreationForm" element={<AcademicAffairsForm />} />
//           <Route path="/entityTable" element={<EntityTable />} />
//           <Route path="/file-manager" element={<FileManager />} />
//           <Route path="/order" element={<Order />} />
//           <Route path="/saved" element={<Saved />} />
//           <Route path="/settings" element={<Setting />} />
//           <Route path="/af" element={<AcademicAffairsForm />} />
//           <Route path="/login" element={<Login />} />

//           <Route path="*" element={<> not found</>} />
//         </Routes>
//       </SideBar>
//     </Router>
//   );
// }

// export default App;
import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import FileManager from "./pages/FileManager";
import Order from "./pages/Order";
import Saved from "./pages/Saved";
import Setting from "./pages/Setting";
import AcademicAffairsForm from "./components/form/AcademicAffairsForm";
import NavBar from "./pages/NavBar";
import Login from "./pages/Login";
import EntityTable from "./components/form/EntityTable";

function AppContent() {
  const location = useLocation();
  const hideNavAndSidebar = location.pathname === "/";

  return (
    <div>
      {!hideNavAndSidebar && <NavBar />}
      <div style={{ display: "flex" }}>
        {!hideNavAndSidebar && <SideBar />}
        <div style={{ flex: 1, padding: hideNavAndSidebar ? "0" : "20px" }}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/EntityCreationForm" element={<AcademicAffairsForm />} />
            <Route path="/entityTable" element={<EntityTable />} />
            <Route path="/file-manager" element={<FileManager />} />
            <Route path="/order" element={<Order />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/af" element={<AcademicAffairsForm />} />
            <Route path="/" element={<Login />} />
            <Route path="*" element={<div>Not found</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
