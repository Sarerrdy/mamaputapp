import styled from "styled-components";
import Menus from "../features/Menus";
import "bootstrap/dist/css/bootstrap.min.css";
// import Cart from "../features/Cart";
// import Heading from "../ui/Heading";
// import MenuCard from "../features/MenuCard";
// import Cart from "../features/Cart";

// const HomeDiv = styled.div`
//   grid-template-rows: 1fr auto;
// `;

// const MainDiv = styled.div`
//   display: grid;
//   min-width: min-content;
//   grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
//   gap: 2.2rem;
//   padding: 6rem 2.8rem 2.4rem;
// `;

// const Banner = styled.div`
//   /* display: flex; */
//   width: 100%;
//   height: 400px;
//   /* background-image: url("src/assets/images/abstract-green-vine-leaves-wave-banner-vector.jpg"); */
//   background-size: cover;
// `;

// const P = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   font-size: 3.5em;
//   color: #eca708;
//   text-align: center;
//   align-items: baseline;
//   text-shadow: 1px 1px 0 #000, 2px 2px 0 #000, 3px 3px 0 #000;
// `;

function Home() {
  return (
    <div className="container px-20 min-vh-100 h-100">
      <Menus />
    </div>
  );
}

export default Home;
