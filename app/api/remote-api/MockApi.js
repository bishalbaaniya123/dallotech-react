import Api from './api';

import { testData, getcheer } from './MockApiData/testData';
import { anup } from './MockApiData/anupData';

export default class MockApi extends Api {
  testApi() {
    return new Promise(resolve => resolve(getcheer));
  }

  anupApi() {
    return new Promise(resolve => resolve(anup));
  }
}
