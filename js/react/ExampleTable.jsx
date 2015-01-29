'use strict';


var React = require('react');
var _ = require('lodash');

var avatar = require('../avatar.js');
var customFilter = require('../customFilter.js');


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
    onClick: function() {
        this.setState({
            checked: !this.state.checked
        })
    },
    getInitialState: function() {
        return {
            checked: this.props.data.checked
        }
    },
    render: function() {
        var row =  <tr className={this.state.checked?'checked':''}>
                    <td><input type="checkbox" defaultChecked={this.state.checked} onClick={this.onClick}/></td>
                    <td>{ formatFirst(this.props.data.first) }</td>
                    <td>{ this.props.data.last }</td>
                    <td>{ this.props.data.email }</td>
                    <td><img width="50" src={ avatar(this.props.data.id, {}) }/></td>
                    <td>{ getAge(this.props.data.ddn) }</td>
                    <td className={this.props.rowCls}></td>
                </tr>;
        return row;
    }
});

var ExampleTable = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    getInitialState: function() {
        return {
            query: ''
        };
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
            return customFilter(this.props.data, this.state.query);
        } else {
            return this.props.data;
        }
    },
    onClick: function() {
        console.log('nothing!');
    },
    render: function() {
        var self = this;
        this.counters.render++;
       // console.log(this.counters);
        return <div>
                <button className="btn btn-danger" onClick={this.onClick}>nothing</button>
                <br/><br/>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th></th>
                            <th>first</th>
                            <th>last</th>
                            <th>email</th>
                            <th>pic</th>
                            <th>age</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <input value={this.state.query} onChange={this.onUpdateQuery} placeholder="filter..."/>
                    <tbody>
                        {this.getRows().map(function(row, i) {
                            return <Row key={row.id} data={row} rowCls={i%2==0?'odd':''}/>
                        }, this)}
                    </tbody>
                </table>
            </div>;
    }
});

module.exports = ExampleTable;
