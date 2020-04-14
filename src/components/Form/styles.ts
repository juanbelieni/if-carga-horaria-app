import { Form } from '@unform/web';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 20px;

  h1 {
    margin-bottom: 20px;
  }
`;

export const Unform = styled(Form)`
  max-width: 500px;
  display: flex;
  flex-direction: column;

  .input {
    width: 100%;
    margin-bottom: 20px;
  }

  .button {
    margin: 12px auto 0 0 ;
  }
`;
