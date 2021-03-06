import styled from "styled-components";

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const ParallaxContainer = styled.div`
  background: url(${props => props.srcURL});
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #333;
  background-position: center;
  padding: 0;
  margin: 0;
  position: relative;
  min-height: calc(100vh - 108px);
`;

const Container = styled.div`
  padding: 0 0 2.5rem;
`;

export { ColumnContainer, RowContainer, ParallaxContainer, Container };
