import styled from 'styled-components';

export const Container = styled.div`
  background-color: #333333;
  min-width: 14rem;
  height: 100vh;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 50px 0;

  p {
    color: white;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    text-align: center;

    color: #CFCFCF;

    margin-top: 20px;
  }
`;

interface ItemStyled {
  selected?: boolean;
}

export const Item = styled.div<ItemStyled>`
  display: flex;
  align-items: center;

  margin-left: 1.4rem;
  margin-bottom: 0.8rem;
  opacity: ${(props) => (props.selected ? '1' : '0.6')};

  cursor: pointer;

  img {
    margin-right: 10px;
  }

  a {
    color: white;
    text-decoration: none;
    width: 100%;
    font-size: 20px;
    letter-spacing: 0.1rem;

    color: #CFCFCF;
    border-right: ${(props) => (props.selected ? '7px #16BF65 solid' : 'none')};
  }
`;
