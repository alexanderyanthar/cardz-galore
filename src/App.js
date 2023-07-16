function App() {
  return (
    <div className='flex justify-between items-center w-11/12 max-w-screen-xl mx-auto my-0 h-24'>
      <div>
        <h1 className='text-2xl'>Cardz Galore</h1>
      </div>
      <div className='flex'>
        <ul className='flex justify-between items-center'>
        <li className='px-2'><a href="#home">Home</a></li>
        <li className='px-2'><a href="#buy-cards">Buy Cards</a></li>
        <li className='px-2'><a href="#sell-cards">Sell Cards</a></li>
        <li className='px-2'><a href="#explore">Explore</a></li>
      </ul>
        <button className='ml-4 bg-orange-600 px-3 py-2 rounded'>Sign In</button>
      </div>
    </div>
  );
}

export default App;
