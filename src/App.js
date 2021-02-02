import React, { Component } from 'react';
import './App.css';
import Mantenimiento from './Mantenimiento/Mantenimiento';
import axios from 'axios';

class App extends Component {
  state = {
    mantenimientos: []
  }

  componentDidMount () {
    axios.get( 'https://vehiculo-web-service.herokuapp.com/mantenimientos' )
        .then( response => {
            const mantenimientos = response.data;
            this.setState({mantenimientos: mantenimientos});
        } );
  }

  nameChangedHandler = ( event, id ) => {
    const index = this.state.mantenimientos.findIndex(m => {
      return m._id === id;
    });

    const mantenimiento = {
      ...this.state.mantenimientos[index]
    };

    mantenimiento.updatedName = event.target.value;

    const mantenimientos = [...this.state.mantenimientos];
    mantenimientos[index] = mantenimiento;

    this.setState( {mantenimientos: mantenimientos} );
  }

  dateChangedHandler = ( event, id ) => {
    const index = this.state.mantenimientos.findIndex(m => {
      return m._id === id;
    });

    const mantenimiento = {
      ...this.state.mantenimientos[index]
    };

    mantenimiento.updatedDate = event.target.value;

    const mantenimientos = [...this.state.mantenimientos];
    mantenimientos[index] = mantenimiento;

    this.setState( {mantenimientos: mantenimientos} );
  }

  postDataHandler = ( event, id ) => {
    const index = this.state.mantenimientos.findIndex(m => {
      return m._id === id;
    });

    const mantenimiento = {
      ...this.state.mantenimientos[index]
    };

    mantenimiento.name = mantenimiento.updatedName;
    mantenimiento.estimatedate = mantenimiento.updatedDate;
    mantenimiento.assigned = mantenimiento.updatedName ? true : false;

    const mantenimientos = [...this.state.mantenimientos];
    mantenimientos[index] = mantenimiento;

    this.setState( {mantenimientos: mantenimientos} );

    const data = {
        name: mantenimiento.updatedName ? mantenimiento.updatedName : '',
        assigned: mantenimiento.updatedName ? true : false,
        estimatedate: mantenimiento.updatedDate
    };
    axios.patch('https://vehiculo-web-service.herokuapp.com/mantenimientos/'+id, data)
        .then(response => {
            console.log(response);
        });
}

  render() {
    let mantenimientos = this.state.mantenimientos.map(m => {
    let estilo = m.assigned ? 'Mantenimiento-div-table-row-on' : 'Mantenimiento-div-table-row';

      return <Mantenimiento 
          key={m._id}
          estilo={estilo} 
          image={m.image} 
          id={m.id}
          make={m.make}
          model={m.model}
          name={m.name}
          estimatedate={m.estimatedate}
          nameChanged={(event) => this.nameChangedHandler(event, m._id)}
          dateChanged={(event) => this.dateChangedHandler(event, m._id)}
          click={(event) => this.postDataHandler(event, m._id)} />;
    });
    

    return (
      <div className="App">
        {mantenimientos}
      </div>
    );
  }
}

export default App;
