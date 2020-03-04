import api from './api';
import {reactLocalStorage} from 'reactjs-localstorage';
import { getItem } from '../localStorage/localStorage';


const BASE_URL = '/api/v1';

export default class Implementation extends api {
  constructor(url) {
    super();
    this.url = url;
  }

  customFetch(input, init = null) {
    return fetch(input, init)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      });
  }


  customFetchArrayBuffer(input, init = null) {
    return fetch(input, init)
      .then(response => {
        if (response.ok) {
          return response.arrayBuffer();
        }
        throw response;
      });
  }

  loginUser(body) {
    return this.customFetch(this.url + '/auth/login',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
  }


  signOut(token) {
    return fetch(this.url + '/auth/sign_out',
      {
        method: 'POST',
        headers: {
          Authorization: getItem('token'),
        }
      },
    );
  }

  signUp(body) {
    return this.customFetch(this.url + '/auth/signup',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
  }

  submitDetails(body, token) {
    return this.customFetch(
      this.url + BASE_URL + '/user/edit',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: getItem('token'),
        },
        body: JSON.stringify(body),
      },
    );
  }

  submitForm(body, token) {
    return this.customFetch(
      this.url + BASE_URL + '/user/edit',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: getItem('token'),
        },
        body: JSON.stringify(body),
      },
    );
  }

  getUserInfo(token) {
    return this.customFetch(
      this.url + BASE_URL + '/user/data',
      {
        method: 'GET',
        headers: {
          Authorization: getItem('token'),
        },
      },
    );
  }

  generateQrCode(token) {
    return this.customFetchArrayBuffer(
      this.url + BASE_URL + '/user/qr_code',
      {
        method: 'GET',
        headers: {
          Authorization: getItem('token'),
        },
      },
    );
  }

  getUserImage(token) {
    return this.customFetchArrayBuffer(
      this.url + BASE_URL + '/user/image',
      {
        method: 'GET',
        headers: {
          Authorization: getItem('token'),
        },
      },
    );
  }

  uploadProfileImage(fileData, token) {
    const data = new FormData();
    const imageData = fileData.file.originFileObj;
    data.append('file', imageData);
    return this.customFetch(
      this.url + BASE_URL + '/user/image',
      {
        method: 'POST',
        headers: {
          Authorization: getItem('token'),
        },
        body: data,
      },
    );
  }

  getFakeCustomerNames() {
    return this.customFetch(
      'https://api-dallotech.herokuapp.com/api/v1/get-customer-names-2?project=flashfreightmock&method=GET&status=200&url=/api/v1/get-customer-names-2',
      {
        method: 'GET',
      },
    );
  }

  getPendingData() {
    return this.customFetch(
      this.url + BASE_URL + '/sales/queries',
      {
        method: 'GET',
      },
    );
  }

  getCompletedData() {
    return this.customFetch(
      this.url + BASE_URL + '/sales/queries?status=PRICE_ENTERED',
      {
        method: 'GET',
      },
    );
  }

  getSuggestion(identifier) {
    return this.customFetch(
      this.url + BASE_URL + '/data/' + identifier,
      {
        method: 'GET',
      },
    );
  }

  getPricingData(mode, status) {
    return this.customFetch(
      this.url + BASE_URL + '/pricings/sales_query?status='+ status+'&transport_type=' + mode,
      {
        method: 'GET',
      },
    );
  }

  getBadgeItems(transportType) {
    return this.customFetch(
      this.url + BASE_URL + '/pricings/sales_query/stats?transport_type='+ transportType,
      {
        method: 'GET',
      },
    );
  }

  getFollowUpList() {
    return this.customFetch(
      this.url + BASE_URL + '/sales/follow_up',
      {
        method: 'GET',
        headers: {
          Authorization: getItem('token'),
        },
      },
    );
  }

  getQuarterlyPlan() {
    return this.customFetch(
      this.url + BASE_URL + '/sales/sales_plans',
      {
        method: 'GET',
        headers: {
          Authorization: getItem('token'),
        },
      },
    );
  }

  submitFollowUp(body) {
    return this.customFetch(
      this.url + BASE_URL + '/sales/follow_up',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: getItem('token'),
        },
        body: JSON.stringify(body),
      },
    );
  }

  submitCustomerRegistration(body) {
    return fetch(
      this.url + BASE_URL + '/super_admin/customers',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: getItem('token'),
        },
        body: JSON.stringify(body),
      },
    );
  }

  submitQuarterlyPlan(body) {
    return this.customFetch(
      this.url + BASE_URL + '/sales/sales_plans',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: getItem('token'),
        },
        body: JSON.stringify(body),
      },
    );
  }

  submitAddSalesQuery(body) {
    return this.customFetch(
      this.url + BASE_URL + '/sales/queries',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: getItem('token'),
        },
        body: JSON.stringify(body),
      },
    );
  }


  submitEnterPrice(body) {
    return this.customFetch(
      this.url + BASE_URL + '/pricings/price',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: getItem('token'),
        },
        body: JSON.stringify(body),
      },
    );
  }

  editSalesQuery(body) {
    return this.customFetch(
      this.url + BASE_URL + '/sales/queries',
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: getItem('token'),
        },
        body: JSON.stringify(body),
      },
    );
  }

  editQuarterlyPlan(body) {
    return this.customFetch(
      this.url + BASE_URL + '/sales/sales_plans',
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: getItem('token'),
        },
        body: JSON.stringify(body),
      },
    );
  }


  editFollowUp(body) {
    return this.customFetch(
      this.url + BASE_URL + '/sales/follow_up',
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: getItem('token'),
        },
        body: JSON.stringify(body),
      },
    );
  }

  submitProfitOrRevision(body, url) {
    return this.customFetch(
      this.url + BASE_URL + '/sales/queries/' + url,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
  }


  uploadKyc(fileData) {
    return this.customFetch(
      this.url + BASE_URL + '/files/kycs',
      {
        method: 'POST',
        headers: {
          Authorization: getItem('token'),
        },
        body: fileData,
      },
    );
  }


}
