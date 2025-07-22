// src/elasticSearchConnector.js
import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector';

const searchKey = process.env.REACT_APP_ELASTIC_SEARCH_KEY;
const engineName = process.env.REACT_APP_ELASTIC_ENGINE_NAME;
const hostIdentifier = process.env.REACT_APP_ELASTIC_ENDPOINT_BASE;

if (!searchKey || !engineName || !hostIdentifier) {
  console.error('Missing required Elastic Search environment variables');
}

const connector = new AppSearchAPIConnector({
  searchKey,
  engineName,
  hostIdentifier,
});

export default connector;
