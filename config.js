// Innstillinger for Sluttkontroll (FAT) WALL-MAN.
// Fylles inn når appen settes i drift. Til da virker appen fullt ut på enheten, med «Del / lagre PDF».
window.WM_CONFIG = {
  // Application (client) ID fra app-registreringen i Microsoft Entra.
  // Kan være samme registrering som Årskontroll-appen, med denne appens adresse lagt til som Redirect URI (SPA).
  clientId: 'SETT-INN-CLIENT-ID',
  tenant: 'reglo.no',
  redirectUri: '',
  // SharePoint-bibliotek (drive) og felles mappe for leveransebevis (ikke én mappe per maskin)
  driveId: 'SETT-INN-DRIVE-ID',
  leveranseFolderId: 'SETT-INN-MAPPE-ID',
  leveranseFolderLabel: 'Leveransearkiv',
  // Metadata som settes på PDF-en: SharePoint-kolonnens interne navn -> felt i appen
  // (prodordre, salgsordre, serienr, kunde, dato, rev). Kolonnene må finnes i biblioteket.
  metadata: { Serienummer: 'serienr', Ordrenummer: 'salgsordre' }
};
