import apiIntegration from '../service/apiIntegration'

class Events {
    // onEditingStart  = (data: any) => {
    //     console.log('onEditingStart')
    //     console.log(data)
    //   }

    //   onInitNewRow  = (data: any) => {
    //     console.log('onInitNewRow')
    //     console.log(data)
    //   }

      onRowInserting = (data: any) => {
        console.log('onRowInserting')
        apiIntegration.createAction(data)
        console.log(data)
      }

    //   onRowInserted = (data: any) => {
    //     console.log('onRowInserted')
    //     console.log(data)
    //   }

      onRowUpdating = (data: any) => {
        console.log('onRowUpdating', data)
        apiIntegration.updateActions(data)
      }

      onRowRemoving = (key: any) => {
        console.log('onRowRemoving', key)

        apiIntegration.deleteActions(key)
      }

    //   onRowUpdated = (data: any) => {
    //     console.log('onRowUpdated')
    //     console.log(data)
    //   }

    //   onRowRemoving = (data: any) => {
    //     console.log('onRowRemoving')
    //     console.log(data)
    //   }

    //   onRowRemoved = (data: any) => {
    //     console.log('onRowRemoved')
    //     console.log(data)
    //   }

    //   onSaving = (data: any) => {
    //     console.log('onSaving')
    //     console.log(data)
    //   }

    //   onSaved = (data: any) => {
    //     console.log('onSaved')
    //     console.log(data)
    //   }

    //   onEditCanceling = (data: any) => {
    //     console.log('onEditCanceling')
    //     console.log(data)
    //   }

    //   onEditCanceled = (data: any) => {
    //     console.log('onEditCanceled')
    //     console.log(data)
    //   }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Events()