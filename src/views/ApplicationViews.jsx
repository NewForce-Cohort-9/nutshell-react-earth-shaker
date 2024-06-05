import { useEffect, useState } from "react"
import { CustomerViews } from "./CustomerViews"



//currentUser gets passed from here to ticketList, to tickets.jsx... which is referred to as prop drilling
//on initial render, currentUser comes back as an empty object, then gets set as honeyUserObject
export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect (() => {
    const localNSUser = localStorage.getItem("nutshell_user")
    const nutShellUserObject = JSON.parse(localNSUser)

    setCurrentUser(nutShellUserObject)

  },[])

  //If currentUser is employee, render EmployeeViews. Otherwise, render CustomerViews
  return <CustomerViews currentUser={currentUser}/>

}