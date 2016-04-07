import React from 'react';

var TodoItem = React.createClass({
  render: function(){
    return <li>
      <label className="checkbox1 animated bounceInRight">
        <input type="checkbox" className="" />
          <span></span>
      </label>
      <span className="done-false animated bounceInRight">
        {this.props.text}
      </span>
    </li>;
  }
});

module.exports = TodoItem;