import"./User.css"

export const User = ({user}) => {
  return (
    <div className="user">
      <div>
        <div>Name</div>
        <div className="user-info">Name</div>
          <div>{user.username}</div>
      </div>
      <div>
        <div className="user-info">Email</div>
        <div>{user.email}</div>
      </div>
    </div>
  )
}