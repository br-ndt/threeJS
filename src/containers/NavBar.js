import { NavLink } from "react-router-dom";

const NavBar = (props) => {
  return (
    <section className="NavBar">
      <nav>
        <NavLink key={0} className="hoverOnly noUnderline" to="/"><h1>App</h1></NavLink>
        <NavLink key={1} to="/tests/1"><p>ThreeJS</p></NavLink>
      </nav>
      <p>({props.message})</p>
    </section>
  )
}

export default NavBar;