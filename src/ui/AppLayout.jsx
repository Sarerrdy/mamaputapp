import { Outlet } from "react-router-dom";
// import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css";
import TopNavBar from "./TopNavBar";

// const StyledAppLayout = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 6fr 1fr;
//   grid-template-rows: 1fr auto 1fr;
//   background-color: #414141c5;
//   min-height: 100vh;

//   /* background-color: var(--color-black-400); */
// `;

// const Main = styled.main`
//   grid-column: 2;
//   grid-row: 2;
//   padding: 2rem 1.8rem 4.4rem;
//   display: grid;
//   grid-auto-flow: column;
//   max-width: 120rem;
//   margin: 0px;
//   background-color: #414141e8;
// `;

// const AppHeader = styled.header`
//   grid-column: 2;
//   grid-row: 1;
//   padding: 3rem 1.8rem 0rem 1.8rem;
//   max-width: 120rem;
// `;

// const AppFooter = styled.footer`
//   grid-column: 2;
//   grid-row: 3;
//   padding: 4rem 4.8rem 2.4rem;
//   align-self: end;
//   color: white;
// `;

// const NavBar = styled.nav`
//   display: flex;
//   justify-content: space-around;
//   background-color: #333;
//   padding: 14px 20px;

//   a {
//     color: white;
//     text-decoration: none;
//     padding: 14px 20px;
//     text-align: center;
//   }

//   a:hover {
//     background-color: #ddd;
//     color: black;
//   }
// `;

function AppLayout() {
  return (
    <div className="container-fluid" style={{ backgroundColor: `#4040405e` }}>
      <div className=" container">
        <div className="Navbar">
          <TopNavBar />
        </div>
        <div
          className="bg-cover text-center"
          style={{
            backgroundImage: `url("/images/home_banner_balck.jpg")`,
            // backgroundImage: `url("src/assets/images/home_banner_balck.jpg")`,
            height: `25rem`,
          }}
        >
          <div
            className="bg-cover p-12"
            style={{ backgroundColor: `rgba(0, 0, 0, 0.6)`, height: `100%` }}
          >
            <div className="flex h-full items-center justify-center">
              <div className="text-white">
                <h1 className="mb-1 text-4xl font-bold">MamaPut Kitchen</h1>
                <h4 className="mb-6 text-xl font-semibold">
                  Sure Destination for delicious African cuisine
                </h4>
                <h4 className="mb-2 font-semibold">
                  Place your Order now your food for quick delivery
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container min-vh-100">
        <Outlet />
      </div>
      <div className="container text-white align-bottom mt-4 pb-5">
        <p className="place-content-end">CopyRight(c) 2024</p>
      </div>
    </div>
  );
}

export default AppLayout;
