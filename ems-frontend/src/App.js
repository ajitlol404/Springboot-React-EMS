import { BrowserRouter, Route, Routes } from "react-router-dom";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import AddEmployee from "./components/AddEmployee";
import ListDepartmentComponent from "./components/ListDepartmentComponent";
import Department from "./components/Department";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<ListEmployeeComponent />}></Route>
          <Route path="/employees" element={<ListEmployeeComponent />}></Route>
          <Route path="/add-employee" element={<AddEmployee />}></Route>
          <Route path="/edit-employee/:id" element={<AddEmployee />}></Route>
          <Route path="/departments" element={<ListDepartmentComponent />}></Route>
          <Route path="/add-department" element={<Department />}></Route>
          <Route path="/edit-department/:id" element={<Department />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
