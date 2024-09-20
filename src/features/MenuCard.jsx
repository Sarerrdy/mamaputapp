// import { useContext } from "react";
// import styled from "styled-components";
// import Quantity from "../ui/Quantity";
// import { CartContext } from "../hooks/CartProviderHook";

// const StyledCard = styled.div`
//   /* display: grid; */
//   background-color: #ffffff10;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   margin: auto;
//   text-align: center;
// `;

// const Img = styled.img`
//   width: auto;
//   height: auto;
//   border-radius: 5%;
// `;

// const H3 = styled.h3`
//   margin: 0;
//   /* padding: 5px; */
//   background-color: #343a40;
//   color: #fff;
// `;

// const P = styled.p`
//   padding: 15px;
//   margin: 0;
//   color: #ffffffa0;
// `;

// const Price = styled.p`
//   font-size: 1.5em;
//   color: #28a745;
//   margin: 15px 0;
// `;

// // const Button = styled.button`
// //   background-color: #1ce95dc4;
// //   color: white;
// //   border: none;
// //   padding: 5px;
// //   font-size: 16px;
// //   cursor: pointer;
// //   border-radius: 5px;
// //   transition: background-color 0.3s ease;

// //   &:hover {
// //     background-color: #1ce95d;
// //   }
// // `;

// function MenuCard() {
//   const { addToCart } = useContext(CartContext);
//   return (
//     <StyledCard>
//       <Img src="src/assets/images/afang.png" alt="Dish Image" />
//       <H3>Delicious Afang</H3>
//       <P>
//         A brief description of the dish goes here. It is tasty and delightful!
//       </P>
//       <Price>$12.99</Price>
//       <br />
//       <Quantity />
//       <br />
//       <button
//         className="btn btn-primary"
//         onClick={() => addToCart("product 1")}
//       >
//         Add to Cart
//       </button>
//       {/* <Button>Add to cart</Button> */}
//       <br />
//       <br />
//     </StyledCard>
//   );
// }

// export default MenuCard;
