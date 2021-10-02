const HomePage = () => {
  let data = JSON.parse(localStorage.getItem("user"));
  return <h2>Hello  {data?.fname} {data?.lname} ....!</h2>;
};

export default HomePage;
