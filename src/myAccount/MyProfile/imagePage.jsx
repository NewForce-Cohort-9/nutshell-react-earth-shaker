export const PostImageBar = ({setSearchTerm}) => {
    return (
        <div className="post-bar">
      <button className= "post-btn btn-primary" onClick={() =>{
        setShowEmergencyOnly(true)
      }}
      >Emergency</button>
      <button
        className="filter-btn btn-info"
        onClick={() => {
          setShowEmergencyOnly(false)
        }} >Show All
      </button>
      <input
        onChange={(event) =>(setSearchTerm(event.target.value))}
        type="text"
        placeholder="search Tickets"
        className="ticket-search"
        />
     </div>
    )
}