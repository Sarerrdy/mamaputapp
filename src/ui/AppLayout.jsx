import { Outlet } from "react-router-dom";
import styled from "styled-components";
import "../styles/styles.css";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr 1fr;
  grid-template-rows: 1fr auto 1fr;
  background-color: #414141c5;
  min-height: 100vh;

  /* background-color: var(--color-black-400); */
`;

const Main = styled.main`
  grid-column: 2;
  grid-row: 2;
  padding: 2rem 1.8rem 4.4rem;
  display: grid;
  grid-auto-flow: column;
  max-width: 120rem;
  margin: 0px;
  background-color: #414141e8;
`;

const AppHeader = styled.header`
  grid-column: 2;
  grid-row: 1;
  padding: 3rem 1.8rem 0rem 1.8rem;
  max-width: 120rem;
`;

const AppFooter = styled.footer`
  grid-column: 2;
  grid-row: 3;
  padding: 4rem 4.8rem 2.4rem;
  align-self: end;
  color: white;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-around;
  background-color: #333;
  padding: 14px 20px;

  a {
    color: white;
    text-decoration: none;
    padding: 14px 20px;
    text-align: center;
  }

  a:hover {
    background-color: #ddd;
    color: black;
  }
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <AppHeader>
        <NavBar>
          <div>
            <a href="#home">Home</a>
            <a href="#services">Services</a>
          </div>
          <div>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </NavBar>
      </AppHeader>
      <Main>
        {/* <Container> */}
        <Outlet />
        {/* </Container> */}
      </Main>
      <AppFooter>
        <p>CopyRight 2024(c)</p>
      </AppFooter>
    </StyledAppLayout>
  );
}

export default AppLayout;
