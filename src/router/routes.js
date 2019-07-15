import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import CreateProposal from "@/pages/CreateProposal.vue";
import SearchProposal from "@/pages/SearchProposal.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";
import ProposalDetail from "../pages/ProposalDetail";
import ManageClients from "../pages/ManageClients";
import ManageUser from "../pages/ManageUser";
import CreateClient from "../pages/CreateClient";
import Login from "../pages/Login";

export const rest_route = "http://localhost:8090/";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "create-client",
        name: "Crear Cliente",
        component: CreateClient
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "create-proposal",
        name: "Crear Propuesta",
        component: CreateProposal
      },
      {
        path: "search-proposal",
        name: "Buscar Propuesta",
        component: SearchProposal,
      },
      {
        path: "manage-clients",
        name: "Gestionar Clientes",
        component: ManageClients,
      },
      {
        path: "manage-users",
        name: "Gestionar Usuarios",
        component: ManageUser
      },
      {
        path: 'test/:id',
        name: "Detalle de propuesta",
        component: ProposalDetail
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "icons",
        name: "icons",
        component: Icons
      },
      {
        path: "maps",
        name: "maps",
        component: Maps
      },
      {
        path: "typography",
        name: "typography",
        component: Typography
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList
      }
    ]
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
