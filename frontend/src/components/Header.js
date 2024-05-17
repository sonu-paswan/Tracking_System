import logo from "../assets/logo.png";
function Header() {
  return (
    <header className="App-header">
      <div className="logo" style={{marginLeft:'1rem'}}>
        {/* <img src={logo} alt="Logo" /> */}
        <h2>Logo</h2>
      </div>
      <div className="title">
        <h1>Stracker App</h1>
      </div>
      <div className="home">
        <a href="/">Home</a>
      </div>
    </header>
  );
}

export default Header;
