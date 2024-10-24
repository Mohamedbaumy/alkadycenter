import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";
import LoginPage from "./features/auth/Login.tsx";
import { ConfigProvider } from "antd";
import locale from "antd/locale/ar_EG";
import FacultyPage from "./features/faculty/Page.tsx";
import axios from "axios";
import DoctorPage from "./features/doctor/Page.tsx";
import StudentPage from "./features/student/Page.tsx";
axios.defaults.baseURL = "http://localhost:3000";

// Create a client for React Query
const queryClient = new QueryClient();

const rootElement = document.getElementById("root");

const routes = createBrowserRouter([
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/faculty",
				element: <FacultyPage />,
			},
			{
				path: "/doctor",
				element: <DoctorPage />,
			},
			{
				path: "/student",
				element: <StudentPage />,
			},
		],
	},
]);

if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<ConfigProvider
				locale={locale}
				direction="rtl"
				theme={{
					token: {
						colorPrimary: "#3498db",
						colorInfo: "#3498db",
						colorBgBase: "#0c2233",
						colorTextBase: "#e0e0e0",
						colorLink: "#f39c12",
						borderRadius: 4,
					},
					components: {
						Layout: {
							headerBg: "#0c2233",
							siderBg: "#0c2233",
							bodyBg: "#13314d",
						},
						Menu: {
							itemSelectedBg: "#1a4a73",
							itemSelectedColor: "#f39c12",
							itemBg: "#0c2233",
							itemColor: "#e0e0e0",
							itemHoverColor: "#f39c12",
						},
						Input: {
							activeShadow: "0 0 0 2px rgba(52, 152, 219, 0.2)",
							hoverBorderColor: "#3498db",
							activeBorderColor: "#3498db",
						},
						Button: {
							primaryShadow: "0 2px 0 rgba(52, 152, 219, 0.1)",
							dangerShadow: "0 2px 0 rgba(244, 67, 54, 0.1)",
							defaultShadow: "0 2px 0 rgba(52, 152, 219, 0.1)",
							defaultBg: "#13314d",
							defaultColor: "#e0e0e0",
							defaultBorderColor: "#3498db",
						},
					},
				}}
			>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={routes} />
				</QueryClientProvider>
			</ConfigProvider>
		</StrictMode>,
	);
}
