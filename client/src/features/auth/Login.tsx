import type { FC } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, message, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Login: FC = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const onFinish = async (values: { email: string; password: string }) => {
		setLoading(true);
		try {
			// TODO: Implement actual login logic here
			console.log("Logging in with:", values.email, values.password);
			// Simulating API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			// If login is successful, redirect to dashboard
			message.success("Login successful!");
			navigate("/dashboard");
		} catch (err) {
			message.error("Invalid email or password. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-[#3498db]">
			<div className="flex w-full justify-center items-center max-w-6xl p-4 sm:p-6 lg:p-8">
				<div className="w-full lg:w-1/2">
					<Card className="p-8 rounded-xl shadow-2xl transform ">
						<Title level={2} className="text-center mb-6 text-gray-800">
							مرحبًا بعودتك!
						</Title>
						<Form
							name="login"
							initialValues={{ remember: true }}
							onFinish={onFinish}
							size="large"
							className="max-w-sm mx-auto"
						>
							<Form.Item
								name="phone"
								rules={[
									{ required: true, message: "يرجى إدخال رقم هاتفك!" },
									{
										pattern: /^[0-9]{11}$/,
										message: "يرجى إدخال رقم هاتف صالح!",
									},
								]}
							>
								<Input
									prefix={<UserOutlined className="text-gray-400" />}
									placeholder="رقم الهاتف"
									className="rounded-lg"
								/>
							</Form.Item>
							<Form.Item
								name="password"
								rules={[{ required: true, message: "يرجى إدخال كلمة المرور!" }]}
							>
								<Input.Password
									prefix={<LockOutlined className="text-gray-400" />}
									placeholder="كلمة المرور"
									className="rounded-lg"
								/>
							</Form.Item>
							<Form.Item>
								<Button
									type="primary"
									htmlType="submit"
									loading={loading}
									block
									className="h-12 text-lg font-semibold bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600 rounded-lg"
								>
									تسجيل الدخول
								</Button>
							</Form.Item>
						</Form>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Login;
