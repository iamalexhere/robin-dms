import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "routes/login.tsx"),
    route("forgot_password", "routes/forgot_password.tsx"),
    route("dashboard", "routes/dashboard.tsx")
] satisfies RouteConfig;
 