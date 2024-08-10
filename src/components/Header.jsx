import logoImg from "../assets/logo.jpg";

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Food image"/>
        <h1 >Lets order some Cuisine</h1>
      </div>
      <nav>
        <button>My Cart</button>
      </nav>
    </header>
  );
}
