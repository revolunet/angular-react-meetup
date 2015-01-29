'use strict';


var React = require('react');
var _ = require('lodash');

var config = require('../../config.js');



function getAge(value) {
  //  self.counters.filter++;
    var ddn = new Date(value);
    return (new Date()).getFullYear() - ddn.getFullYear();
}

function formatFirst(first) {
    //this.counters.func++;
    // console.log(this.counters);
    return first.toUpperCase();
}

var Row  = React.createClass({
    propTypes: {
        data: React.PropTypes.shape,
        onClick: React.PropTypes.func,
        rowCls: React.PropTypes.string
    },
    render: function() {
        return <tr className={this.props.data.checked?'checked':''}>
                    <td><input type="checkbox" defaultChecked={this.props.data.checked} onClick={this.props.onClick}/></td>
                    <td>{ formatFirst(this.props.data.first) }</td>
                    <td>{ this.props.data.last }</td>
                    <td>{ this.props.data.email }</td>
                    <td>{ getAge(this.props.data.ddn) }</td>
                    <td className={this.props.rowCls}></td>
                </tr>
    }
});

var ExampleTable = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    getInitialState: function() {
        return {
            query: '',
            data: this.props.data
        };
    },
    onRowClick: function(row) {
        row.checked = true;
        // var self = this;
        // setTimeout(function() {
        //     var clone = self.state.data.slice();
        //     clone.splice(clone.indexOf(row), 1);
        //     self.setState({
        //         data: clone
        //     });
        // }, 50);
        this.setState({
            data:this.state.data
        });
    },
    counters: {
        func: 0,
        render: 0,
        filter: 0
    },
    onUpdateQuery: function(event) {
        this.setState({
            query: event.target.value
        });
    },
    getRows: function() {
        if (this.state.query) {
            var regFilter = new RegExp(this.state.query, 'i');
            var rows = this.state.data.filter(function(item) {
                return (regFilter.exec(item.first) || regFilter.exec(item.last) || regFilter.exec(item.email));
            });
            return rows;
        } else {
            return this.state.data;
        }
    },
    render: function() {
        var self = this;

        this.counters.render++;
       // console.log(this.counters);
        var query = this.state.query;
        return <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th></th>
                        <th>first</th>
                        <th>last</th>
                        <th>email</th>
                        <th>age</th>
                        <th>status</th>
                    </tr>
                </thead>
                <input value={query} onChange={this.onUpdateQuery} placeholder="filter..."/>
                <tbody>
                    {this.getRows().map(function(row, i) {
                        return <Row key={row.id} data={row} rowCls={i%2==0?'odd':''} onClick={this.onRowClick.bind(this, row)}/>
                    }, this)}
                </tbody>
            </table>;
    }
});

module.exports = ExampleTable;
