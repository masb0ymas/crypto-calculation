import dynamic from "next/dynamic";

const rootContainer = dynamic(() => import("~/layouts/containers"));

const routes = [
  {
    path: "/",
    layout: rootContainer,
    exact: true,
  },
];

const homeRoutes = routes;

export default homeRoutes;
