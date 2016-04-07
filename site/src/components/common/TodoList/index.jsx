import React from 'react';
import Router from 'react-router';
import AppStore from '../../../stores/AppStore';
import Translate from '../Translate';
import TodoItem from './TodoItem';

var PerfectScrollbar = require('perfect-scrollbar/jquery')($);

var data = [{done:false, text: 'Meeting with Nabindar Singh.'},
            {done:false, text: 'Exercise at 6pm with Nicholas.'},
            {done:false, text: 'Avengers Age of Ultron.'},
            {done:false, text: "Henna's birthday at Mezbaan."}];

var TodoList = React.createClass({

  getInitialState: function(){
    
    return {
      addItem: false
    };

  },

  componentDidMount: function(){
    $('.todo-list-wrap').perfectScrollbar();
  },

  render: function(){
  
    return ( <div className="todo-container panel panel-danger">
        <div className="panel-heading">
          <div className="todo-header text-center">
            <h4><i className="fa fa-tasks"></i>&nbsp;{Translate.getWord('todo')}</h4>
          </div>
        </div>
        <div className="panel-body bg-danger">
          <div className="todo-body" ng-controller="todoCtrl">
            <div className="todo-list-wrap">
              <ul className="todo-list">
                { data.map(function(item, i){
                    return(
                      <TodoItem key={i} done={item.done} text={item.text} />
                      )
                  })
                }
              {/*}  <li>
                  <label className="checkbox1 animated bounceInRight"> 
                    <input type="checkbox" className="" onClick={() => this.setState({todo1 : !this.state.todo1})} />
                    <span></span>
                  </label>
                  <span className={this.state.todo1?'done-true animated bounceInRight':'done-false animated bounceInRight'}>Meeting with Nabindar Singh.</span>
                </li>
                <li>
                  <label className="checkbox1 animated bounceInRight" for="{{todo.id}}"> 
                    <input type="checkbox" className="" onClick={() => this.setState({todo2 : !this.state.todo2})} />
                    <span></span>
                  </label>
                  <span className={this.state.todo2?'done-true animated bounceInRight':'done-false animated bounceInRight'}>Exercise at 6pm with Nicholas.</span>
                </li>
                <li>
                  <label className="checkbox1 animated bounceInRight" for="{{todo.id}}"> 
                    <input id="{{todo.id}}" type="checkbox" className="" onClick={() => this.setState({todo3 : !this.state.todo3})} />
                    <span></span>
                  </label>
                  <span className={this.state.todo3?'done-true animated bounceInRight':'done-false animated bounceInRight'}>Avengers Age of Ultron.</span>
                </li>
                <li>
                  <label className="checkbox1 animated bounceInRight" for="{{todo.id}}"> 
                    <input id="{{todo.id}}" type="checkbox" className="" onClick={() => this.setState({todo4 : !this.state.todo4})} />
                    <span></span>
                  </label>
                  <span className={this.state.todo4?'done-true animated bounceInRight':'done-false animated bounceInRight'}>Henna's birthday at Mezbaan.</span>
                </li>
                <li style={{display: this.state.addItem?'':'none'} }>
                  <label className="checkbox1 animated bounceInRight" for="{{todo.id}}"> 
                    <input id="{{todo.id}}" type="checkbox" className="" onClick={() => this.setState({todo5 : !this.state.todo5})} />
                    <span></span>
                  </label>
                  <span className={this.state.todo5?'done-true animated bounceInRight':'done-false animated bounceInRight'}>{this.state.itemValue}</span>
                </li> */}
              </ul>
            </div>
            <form className="form-horizontal todo-from-bottom" onSubmit={this.addItem}>
              <div className="row">
                <div className="col-sm-12">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="" ng-model="formTodoText" ng-model-instant />
                    <span className="input-group-btn">
                      <button type="submit" className="btn btn-default" >{Translate.getWord('add')}</button>
                    </span>
                    </div>  
                  </div>        
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  },

  addItem: function(e){

    e.preventDefault();

    if(e.target[0].value != ''){
      
      data.push({
        done: false, text: e.target[0].value
      }); 
      
      this.setState({
        addItem: !this.state.addItem
      });

    }

    e.target[0].value = "";

    return false;

  },

});

export default TodoList;