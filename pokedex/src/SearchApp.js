import React from 'react';
import { SearchProvider, SearchBox, Results } from '@elastic/react-search-ui';
import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector';

// Sample search configuration
const searchConfig = {
  apiConnector: new AppSearchAPIConnector({
    // Configure with your AppSearch credentials and endpoint
    searchKey: 'search-ncbpdth2g91j2ojyqr1q52ck',
    engineName: 'my-wesbite',
    endpointBase: 'https://pandora.ent.us-central1.gcp.cloud.es.io',
  }),
  alwaysSearchOnInitialLoad: true,
};

// SearchApp component with Elastic Search UI components
const SearchApp = () => (
  <SearchProvider config={searchConfig}>
    <SearchBox className="custom-search-box" placeholder="Search by Pokemon name..." />
    <Results />
  </SearchProvider>
);

export default SearchApp;
