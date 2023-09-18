import { Link } from "react-router-dom"

function SessionNotFound() {

  return (
    <main className="p-4">
      <h2>Error(401)</h2>
      <h4>The user doesn't have an active session</h4>
      <Link to={'/'}>Do you want to login?</Link>
    </main>
  )
}

export default SessionNotFound
