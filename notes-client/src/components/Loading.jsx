import NavBar from "./NavBar";

const Loading = () => {
  return (
    <div>
      <NavBar private={true} />
      <div className="main-container flex-center title-container">
        <h3>Loading...</h3>
      </div>
    </div>
  );
};

export default Loading;
