var React = require('react'),
    classNames = require('classnames');

var EditWayPoint = React.createClass({
    componentDidMount: function () {
        var node = this.refs['wayPoint'].getDOMNode(),
            google = this.props.mapService;
        this.autoComplete = new google.maps.places.Autocomplete(node);
        google.maps.event.addListener(this.autoComplete, 'place_changed', this.onPlaceChange);
        node.focus();
    },
    onPlaceChange: function () {
        var place = this.autoComplete.getPlace();
        this.props.onAction('save', {
            value: place.formatted_address,
            placeDetails: place
        });
    },
    onDone: function (e) {
        e.preventDefault();
        this.save(this.refs['wayPoint'].getDOMNode().value);
    },
    onCancel: function (e) {
        e.preventDefault();
        this.props.onAction('cancel');
    },
    onBlur: function (e) {
        this.save(e.target.value);
    },
    save: function (newValue) {
        if (!!newValue) {
            this.props.onAction('save', {
                value: newValue
            });
        } else {
            alert('Location is required.');
            this.refs['wayPoint'].getDOMNode().focus();
        }
    },
    render: function () {
        return (
            <div className='editing'>
                <input ref='wayPoint' type='text' name='wayPoint' defaultValue={this.props.name} onBlur={this.onBlur} />
                <a className='done' title='Save' href='#' onClick={this.onDone}>
                    <i className='icon-done'></i>
                </a>
            </div>
            );
    }
});

var ViewWayPoint = React.createClass({
    edit: function () {
        this.props.onAction('edit');
    },
    add: function (e) {
        e.preventDefault();
        this.props.onAction('add');
    },
    remove: function (e) {
        e.preventDefault();
        this.props.onAction('remove');
    },
    render: function () {
        var name = this.props.name;
        console.log('Name')
        console.log(name)
        return (
            <div className='viewing'>
                <p className='way-point-name' onClick={this.edit}>
                {name}
                </p>
            </div>
            );
    }
});

var WayPoint = React.createClass({
    selectWayPoint: function (e) {
        e.preventDefault();
        this.props.onAction('select');
    },
    render: function () {
        var wayPoint = this.props.wayPoint,
            name = wayPoint.get('name'),
            editing = this.props.editing,
            element = null,
            markerClassNames = classNames('marker icon-adjust', {selected: this.props.selected})
        if (editing) {
            element = (<EditWayPoint
            mapService={this.props.mapService}
            name={name}
            onAction={this.props.onAction} />);
        } else {
            element = (<ViewWayPoint
            name={name}
            onAction={this.props.onAction}
            />);
        }
        return (
            <div className='way-point'>
                <i onClick={this.selectWayPoint} className={markerClassNames}/>
            {element}
            </div>
            );
    }
});

module.exports = WayPoint;