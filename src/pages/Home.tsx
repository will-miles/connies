const Home = () => {
  return (
    <div>
      <h1 className='justify-center m-auto text-center'>
        process.env.REACT_APP_ENV_VARIABLE ={' '}
        {process.env.REACT_APP_ENV_VARIABLE}
      </h1>
    </div>
  );
};

export default Home;
