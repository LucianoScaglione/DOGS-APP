const Paginated = ({ dogs, dogsPerPage, paginated }) => {
  const numbers = []
  for (let i = 1; i <= Math.ceil(dogs / dogsPerPage); i++) {
    numbers.push(i)
  }

  return (
    <nav className='flex justify-center'>
      <ul>
        {numbers?.map(number => (
          <button className='mx-3 font-semibold text-black rounded-full bg-white px-1.5 justify-center hover:bg-gray-200' key={number} onClick={() => paginated(number)}>{number}</button>
        )
        )}
      </ul>
    </nav>
  )
}


export default Paginated;