import NavBar from './NavBar';
import { useParams } from 'react-router-dom';

const Error = () => {
  let params = useParams();
	let error = params.error;
	return (
		<div>
			<NavBar private={false} />
			<div className="main-container flex-center title-container">
				<h3>{error}</h3>
			</div>
		</div>
	);
};

export default Error;
