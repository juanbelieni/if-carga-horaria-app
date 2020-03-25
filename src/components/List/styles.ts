import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-height: 100vh;
  margin: 1rem;
  /* padding: 1rem 0; */
  overflow-y: scroll;
  /* overflow-x: hidden; */

  /* background-color: #333333; */

  border-radius: 10px;
  /* margin-top: 1rem; */

  /* h1 {
    font-weight: 900;
    font-size: 37px;
    color: #CFCFCF;

    margin-left: 2rem;
  } */
`;

export const Table = styled.table`
  color: white;
  width: 100%;
  text-align: center;
  border-collapse: collapse;

  margin-top: 20px;

  tr:first-of-type {

    th {
      background: rgba(40, 40, 40, 0.62);
      padding: 0.3rem;
    }
  }

  tr {
    th, td {
      padding: 0.2rem 0;
      border-right: 2px solid rgba(103, 103, 103, 0.37);
    }

    th:last-of-type, td:last-of-type {
      border-right: none;
    }

    th:first-of-type, td:first-of-type {
      border-right: none;
      background: none;
    }

    td {
      background: rgba(47, 47, 47, 0.6) !important;
      font-weight: 500;
    }
  }
`;
