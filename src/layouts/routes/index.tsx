import homeRoutes from "./public/home";

// @ts-expect-error
export const globalRoutes = [].concat(homeRoutes);
