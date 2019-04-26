import Dashboard from "./../views/Dashboard/Dashboard.jsx";
import TableList from "./../views/TableList/TableList.jsx";
import UserPage from "./../views/UserPage/UserPage.jsx";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Summary",
    icon: "design_app",
    component: Dashboard
  },
  {
    path: "/extended-tables",
    name: "Detailed",
    icon: "files_paper",
    component: TableList
  },
  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "users_single-02",
  //   component: UserPage
  // },
  { redirect: true, path: "/", pathTo: "/", name: "Dashboard" }
];
export default dashRoutes;
