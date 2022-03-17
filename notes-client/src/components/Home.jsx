import NavBar from './NavBar';

const Home = () => {
	return (
		<div>
			<NavBar private={false} />
			<div className="main-container flex-center title-container">
				<h1>Welcome to Notes</h1>
			</div>
		</div>
	);
};

export default Home;
