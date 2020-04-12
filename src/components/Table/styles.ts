import styled from 'styled-components';

export const Container = styled.div`
 
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
