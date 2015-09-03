var React = require('react/addons');
var _ = require('underscore');
var scale = require('d3-scale');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var BarChart1 = React.createClass({
  render: function() {
    var x = scale.linear()
      .domain([0, _.max(this.props.data)])
      .range([0, 420]);

    var data = this.props.data;

    return (
      <div className="chart">
      {
        data.map(n => <div style={{width: x(n)+'px'}}>{n}</div>)
      }
      </div>
    );
  }
});

var BarChart2 = React.createClass({
  render: function() {
    var data = this.props.data || [];

    var width = 420,
        barHeight = 20;

    var x = scale.linear()
        .domain([0, _.max(data)])
        .range([0, width]);

    return (
      <svg className="chart" width={width} height={barHeight * data.length}>
      {
        data.map((n, i) =>
            <g key={i} transform={`translate(0,${barHeight*i})`}>
              <rect width={x(n)} height={barHeight-1}></rect>
              <text x={x(n)-3} y="9.5" dy=".35em">{n}</text>
            </g>
        )
      }
      </svg>
    );
  }
});

var BarChart2A = React.createClass({
  render: function() {
    var data = this.props.data || [];

    var width = 420,
        barHeight = 20;

    var x = scale.linear()
        .domain([0, _.max(data)])
        .range([0, width]);

    var svg =
        <svg className="chart csstrans" width={width} height={barHeight * data.length}>
            <ReactCSSTransitionGroup transitionName="addBar" component="g">
            {
              data.map((n, i) =>
                  <g key={i} transform={`translate(0,${barHeight*i})`}>
                    <rect width={x(n)} height={barHeight-1}></rect>
                    <text x={x(n)-3} y="9.5" dy=".35em">{n}</text>
                  </g>
              )
            }
            </ReactCSSTransitionGroup>
        </svg>;
    return svg;
  }
});

var steps = 50, time = 0.5;
var BarChart2JSA = React.createClass({
    getInitialState: function() {
     return {
       oldData: [],
       progress: 1.0
     };
   },

   componentWillReceiveProps: function(nextProps) {
     var state = {
       oldData: this.props.data,
       progress: this.props.data.length > 0 ? 0 : 1
     };
     this.setState(state);
     var that = this;
     setTimeout(function() {
       that.updateAnimation();
     }, 0);
  },
  updateAnimation: function() {
    if (this.state.progress < 1.0) {
      this.setState({ progress: Math.min(1.0, this.state.progress + (1/steps)) });
      var that = this;
      setTimeout(function() {
        that.updateAnimation();
      }, 1000*time/steps);
    }
  },
  render: function() {
    var data = (this.props.data || []);
    var dataInterp = data.map((n, i) =>
      {
        return {
          raw: n,
          interp: (this.state.oldData[i] !== undefined ?
            this.state.oldData[i] + ((this.props.data[i] - this.state.oldData[i]) * this.state.progress)
                        : this.props.data[i])
        };
      });

    var width = 420,
        barHeight = 20;

    var x = scale.linear()
        .domain([0, _.max(dataInterp.map(d => d.interp))])
        .range([0, width]);

    return (
      <svg className="chart" width={width} height={barHeight * data.length}>
      <ReactCSSTransitionGroup transitionName="addBar" component="g">
      {
        dataInterp.map((n, i) =>
            <g key={i} transform={`translate(0,${barHeight*i})`}>
              <rect width={x(n.interp)} height={barHeight-1}></rect>
              <text x={x(n.interp)-3} y="9.5" dy=".35em">{n.raw}</text>
            </g>
        )
      }
      </ReactCSSTransitionGroup>
      </svg>
    );
  }
});

module.exports = BarChart2A;
