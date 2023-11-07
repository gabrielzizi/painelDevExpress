import React from 'react';

import DataGrid, {
  Editing,
  Paging,
} from 'devextreme-react/data-grid';
import apiIntegration from '../../service/apiIntegration';
import CustomStore from 'devextreme/data/custom_store';
import { ParamHandler } from '../../types.js';
import events from '../../functions/events';

export class Secao extends React.Component {
  params: ParamHandler;
  columns = [''];
  data: any[''];
  populateData: any;
  populateColunms: any;


    constructor(props: any) {
    super(props);
    this.params = {
        endpoint: '',
        method: '',
    };

    this.populateData = async () => {
        const data = await events.onLoadData().then((res: any) => res.data);
        return data
    }

    this.state = {
        ordersData: new CustomStore({
            key: 'id',
            load: async () => {
                this.params = {
                    endpoint: 'readActions',
                    method: 'get'
                }

                const data = await this.populateData().then((res: any) => {
                    return res
                });

                const res = data;

                return res
            },

            insert: async (values) => {
                this.params = {
                    endpoint: 'createAction',
                    method: 'post',
                    data: values
                }

                await apiIntegration.handleApi(this.params)
            },

            update: async (key, values) => {
                this.params = {
                    endpoint: 'updateActions',
                    method: 'put',
                    data: { key, values }
                }

                await apiIntegration.handleApi(this.params)
            },

            remove: async (key) => {
                this.params = {
                    endpoint: 'deleteActions',
                    method: 'delete',
                    data: { key }
                }

                await apiIntegration.handleApi(this.params)
            }
  	    }),
      selectTextOnEditStart: true,
      startEditAction: 'click',
    };
    this.onSelectTextOnEditStartChanged = this.onSelectTextOnEditStartChanged.bind(this);
    this.onStartEditActionChanged = this.onStartEditActionChanged.bind(this);
  }


  onSelectTextOnEditStartChanged(args: any) {
    this.setState({
      selectTextOnEditStart: args.value,
    });
  }

  onStartEditActionChanged(args: any) {
    this.setState({
      startEditAction: args.value,
    });
  }


  render() {
    const state: any = this.state;

    return (
      <div id="data-grid-demo">
        <DataGrid
          dataSource={state.ordersData}
          keyExpr="id"
          showBorders={true}
        >
          <Paging enabled={false} />
          <Editing
            mode="batch"
            allowUpdating={true}
            allowAdding={true}
            allowDeleting={true}
            selectTextOnEditStart={state.selectTextOnEditStart}
            startEditAction={state.startEditAction} />


        </DataGrid>

      </div>
    );
  }
}
