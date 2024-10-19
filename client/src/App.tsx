import type { FC } from "react";
import { Layout, Menu, Typography, Card } from "antd";
import { Link, Outlet } from "react-router-dom";
import logo from "./assets/imgs/logo.png";

const { Header, Sider, Content } = Layout;

const DashboardLayout: FC = () => {
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sider>
				<div className="logo">
					<img src={logo} alt="Logo" className="h-16 rounded-full mx-auto" />
				</div>
				<Menu mode="inline" defaultSelectedKeys={["1"]}>
					<Menu.Item key="1">
						<Link to="/faculty">الكليات</Link>
					</Menu.Item>
					<Menu.Item key="2">
						<Link to="/doctor">الدكاترة</Link>
					</Menu.Item>
					<Menu.Item key="3">
						<Link to="/student">الطلبة</Link>
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout>
				<Header className="flex justify-between items-center ">
					<Typography.Title level={3} className="">
						Al-Kady Center
					</Typography.Title>
					<div className="flex items-center gap-2">
						<img src={logo} alt="Logo" className="h-10 rounded-full" />
						<Typography.Text>أ.محمد الكادي</Typography.Text>
					</div>
				</Header>
				<Content style={{ margin: "16px", padding: "20px" }}>
					<Card>
						<Outlet />
					</Card>
				</Content>
			</Layout>
		</Layout>
	);
};

export default DashboardLayout;
