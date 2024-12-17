import styled from "styled-components";

const StyledQuantity = styled.div`
  /* display: flex; */
  align-items: center;
  margin: auto;
  height: 35px;
  border-radius: 4px;
  width: 200px;
  /* background-color: red; */
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  height: 35px;
  grid-auto-flow: row;
  gap: 6px;
  border-radius: 4px;
  color: #ffffff;
`;

const StyledIncreaseButton = styled.button`
  display: inline-block;
  text-align: center;
  height: auto;
  width: 30px;
  align-items: center;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0);
  /* border: 1px solid #ffffff; */
  border: 0px;
  border-radius: 8px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const StyledInput = styled.input`
  display: flex;
  text-align: center;
  width: 40px;
  height: 30px;
  border: 1px solid #ffffff;
  border-radius: 8px;
  align-items: center;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0);
  align-self: center;

  &:focus {
    border-color: #ffffff;
    outline: none;
  }
`;

const StyledLabel = styled.label`
  font-size: 1.6rem;
  color: white;
`;

function Quantity() {
  return (
    <StyledQuantity>
      <StyledDiv>
        <StyledLabel>Qty: </StyledLabel>
        <StyledIncreaseButton>-</StyledIncreaseButton>
        <StyledInput />
        <StyledIncreaseButton>+</StyledIncreaseButton>
      </StyledDiv>
    </StyledQuantity>
  );
}

export default Quantity;
