// src/elasticSearchConnector.js
import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector';

const searchKey = 'search-ncbpdth2g91j2ojyqr1q52ck';
const engineName = 'my-website';

const connector = new AppSearchAPIConnector({
  searchKey,
  engineName,
  hostIdentifier: 'https://pandora.ent.us-central1.gcp.cloud.es.io',
});

export default connector;
