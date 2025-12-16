import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "routes/login.tsx"),
    route("forgot_password", "routes/forgot_password.tsx"),
    route("change_password", "routes/change_password.tsx"),

    layout("routes/dashboard.tsx", [
        route("dashboard", "routes/dashboard.home.tsx"),
        route("manufacturer", "routes/dashboard.manufacturer.tsx"),
        route("reports", "routes/dashboard.reports.tsx"),
        route("mrn", "routes/dashboard.mrn.tsx"),
        route("terms", "routes/dashboard.terms.tsx"),
        route("customer", "routes/dashboard.customer.tsx"),
        route("repair-orders", "routes/dashboard.repair-orders.tsx")
    ])
] satisfies RouteConfig;
