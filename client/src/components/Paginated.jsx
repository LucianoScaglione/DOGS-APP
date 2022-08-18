const Paginated = ({ dogs, dogsPerPage, paginated }) => {
  const numbers = []
  for (let i = 1; i <= Math.ceil(dogs / dogsPerPage); i++) {
    numbers.push(i)
  }

  return (
    <nav>
      <ul>
        {numbers?.map(number => (
          <button key={number} onClick={() => paginated(number)}>{number}</button>
        )
        )}
      </ul>
    </nav>
  )
}


export default Paginated;