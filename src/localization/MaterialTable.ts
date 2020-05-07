import { Localization } from 'material-table';

const localization: Localization = {
  pagination: {
    labelRowsSelect: 'linhas',
    labelDisplayedRows: '{from}-{to} de {count}',
    previousAriaLabel: 'Página anterior',
    previousTooltip: 'Página anterior',
    nextAriaLabel: 'Próxima página',
    nextTooltip: 'Próxima página',
    firstAriaLabel: 'Primeira página',
    firstTooltip: 'Primeira página',
    lastAriaLabel: 'Última página',
    lastTooltip: 'Última página',
  },
  header: {
    actions: 'Ações',
  },
  body: {
    emptyDataSourceMessage: 'Nenhum dado para mostrar',
    filterRow: {
      filterTooltip: 'Filtrar',
    },
    editRow: {
      saveTooltip: 'Confirmar',
      cancelTooltip: 'Cancelar',
      deleteText: 'Você deseja realmente apagar?',
    },
    addTooltip: 'Adicionar',
    deleteTooltip: 'Excluir',
    editTooltip: 'Editar',
  },
  toolbar: {
    exportName: 'Exportar como CSV',
    exportTitle: 'Exportar',
  },
};

export default localization;
