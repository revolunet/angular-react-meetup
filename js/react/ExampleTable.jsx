'use strict';


var React = require('react');
var _ = require('lodash');

var config = require('../../config.js');

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
    formatFirst: function(first) {
        this.counters.func++;
       // console.log(this.counters);
        return first.toUpperCase();
    },
    render: function() {
        var self = this;

        function getAge(value) {
            self.counters.filter++;
            var ddn = new Date(value);
            return (new Date()).getFullYear() - ddn.getFullYear();
        }

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
                        return <tr key={row.id} className={row.checked?'checked':''}>
                            <td><input type="checkbox" defaultChecked={row.checked} onClick={this.onRowClick.bind(this, row)}/></td>
                            <td>{ this.formatFirst(row.first) }</td>
                            <td>{ row.last }</td>
                            <td>{ row.email }</td>
                            <td>{ getAge(row.ddn) }</td>
                            <td className={i%2==0?'odd':''}></td>
                        </tr>
                    }, this)}
                    
                </tbody>
            </table>;
    }
});

module.exports = ExampleTable;
