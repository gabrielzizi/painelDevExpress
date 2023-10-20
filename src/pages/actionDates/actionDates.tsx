import React from 'react';

import {
  DataGrid, Column, Editing, Scrolling, Lookup, Summary, TotalItem,
} from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button';
import { SelectBox } from 'devextreme-react/select-box';

import CustomStore from 'devextreme/data/custom_store';
import { formatDate } from 'devextreme/localization';
import 'whatwg-fetch';
import axios from 'axios';
import events from '../../functions/events';

const refreshModeLabel = { 'aria-label': 'Refresh Mode' };
const URL = 'https://js.devexpress.com/Demos/Mvc/api/DataGridWebApi';
const REFRESH_MODES = ['full', 'reshape', 'repaint'];

class App extends React.Component {
  url = process.env.REACT_APP_API_URL
  constructor(props: any) {
    super(props);

    this.state = {
      ordersData: new CustomStore({
            key: 'id',
            load: async () => {
              const res = await axios.get(`${this.url}/readActions`, { headers: { "ngrok-skip-browser-warning": "69420" }})
              return res.data
             },
            insert: async (values) => {
              events.onRowInserting(values)
            },
            update: async (key, values) => {
              const body = {key, values};
              events.onRowUpdating(body)
            },
            remove: async (key) => {
              console.log('remove', key)
              events.onRowRemoving(key)
            }
  	    }),
      refreshMode: 'reshape',
    } as any;

    this.clearRequests = this.clearRequests.bind(this);
    this.handleRefreshModeChange = this.handleRefreshModeChange.bind(this);
  }

  sendRequest(url:any, method = 'GET', data = {}) {
    this.logRequest(method, url, data);

    if (method === 'GET') {
      return fetch(url, {
        method,
        credentials: 'include',
      }).then((result) => result.json().then((json) => {
        if (result.ok) return json.data;
        throw json.Message;
      }));
    }


    type key = string

    const params = Object.keys(data).map((key: any) => {

      const data2: any = data

      const index: keyof key = key;


        return `${encodeURIComponent(key)}=${encodeURIComponent(data2[index])}`
    }).join('&');

    return fetch(url, {
      method,
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      credentials: 'include',
    }).then((result) => {
      if (result.ok) {
        return result.text().then((text) => text && JSON.parse(text));
      }
      return result.json().then((json) => {
        throw json.Message;
      });
    });
  }

  logRequest(method:any, url:any, data:any) {
    const args = Object.keys(data || {}).map((key) => `${key}=${data[key]}`).join(' ');

    const time = formatDate(new Date(), 'HH:mm:ss');
    const request = [time, method, url.slice(url.length), args].join(' ');

    this.setState((state:any) => ({ requests: [request].concat(state.requests) }));
  }

  clearRequests() {
    this.setState({ requests: [] });
  }

  handleRefreshModeChange(e: any) {
    this.setState({ refreshMode: e.value });
  }

  render() {
    const state: any = this.state;
    const {
      refreshMode, ordersData
    } = state;
    return (
      <React.Fragment>
        <DataGrid
          id="grid"
          showBorders={true}
          dataSource={ordersData}
          repaintChangesOnly={true}
        >
          <Editing
            refreshMode={refreshMode}
            mode="cell"
            allowAdding={true}
            allowDeleting={true}
            allowUpdating={true}
          />



          <Column dataField={'idAction'} width={170} hidingPriority={2} />
          <Column
            dataField={'topicName'}
            width={500}
            caption={'topicName'}
            hidingPriority={8}
          />
          <Column
            dataField={'table'}
            width={500}
            caption={'table'}
            hidingPriority={8}
          />

          <Summary>
            <TotalItem column="CustomerID" summaryType="count" />
            <TotalItem column="Freight" summaryType="sum" valueFormat="#0.00" />
          </Summary>
        </DataGrid>
      </React.Fragment>
    );
  }
}

export default App;
