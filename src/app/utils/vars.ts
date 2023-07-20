export class StaticVars {
  static DATATABLE_FR = {
    emptyTable: 'Tableau vide',
    info: '_START_-_END_ sur _TOTAL_',
    infoEmpty: '0-0 sur 0',
    infoFiltered: '(filtrage de _MAX_ au total)',
    infoPostFix: '',
    decimal: 'decimal',
    thousands: 'thousands',
    lengthMenu: 'Afficher _MENU_ lignes',
    loadingRecords: 'Chargement des données...',
    processing: 'En cours...',
    search: '',
    searchPlaceholder: 'Recherchez ici ...',
    zeroRecords: 'Aucun résultat...',
    paginate: {
      first: '<i class="tio-first-page"></i>',
      last: '<i class="tio-last-page"></i>',
      next: '<i class="tio-next-ui"></i>',
      previous: '<i class="tio-back-ui"></i>',
    },
    aria: {
      sortAscending: ': activer pour trier la colonne par ordre croissant',
      sortDescending: ': activer pour trier la colonne par ordre décroissant',
      paginate: {
        first: '<i class="tio-first-page"></i>',
        last: '<i class="tio-last-page"></i>',
        next: '<i class="tio-next-ui"></i>',
        previous: '<i class="tio-back-ui"></i>',
      }
    },
    url: '',
  };
}

export class RouteUri {
  SECURITY = {
    RACINE: { NAME: '', ROUTE: '' },
    LOGIN: { NAME: 'login', ROUTE: '/login' },
    REGISTER : { NAME: 'register', ROUTE: '/register' },
    LOGOUT: { NAME: 'logout', ROUTE: '/logout' },
  };

  LAYOUT = {
    RACINE: { NAME: 'layout', ROUTE: '/layout' },
    ENTREPOTS: { NAME: 'entrepots', ROUTE: '/layout/entrepots' },
    ENTREPOTS_SAVE: { NAME: 'save-entrepot', ROUTE: '/layout/save-entrepot' },
    ENTREPOT_EDIT : { NAME: 'edit-entrepot', ROUTE: '/layout/edit-entrepot' },
  };
}