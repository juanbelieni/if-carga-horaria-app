import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;

  background-color: #333333;
  height: 2.7rem;

  border-radius: 10px;
`;

export const Tab = styled.div<{selected?: Boolean}>`
  display: flex;
  align-items: center;

  color: white;
  font-weight: bold;
  height: 100%;
  border-bottom: 3px solid ${(props) => (props.selected ? '#16BF65' : '#333333')};
`;
