// create path to data
var path = "assets/data/data.csv";

// set height and width of svg
var svgWidth = 960;
var svgHeight = 500;

// set margins
var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// create svg wrapper

var svg = d3
    .select(".chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

var xAxis = "age";

function scale(data, xAxis) {
    
    var xScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[xAxis]) * 0.8,
        d3.max(data, d => d[xAxis]) * 1.2
      ])
      .range([0, width]);
  
    return xScale;
  
  }

  function createAxes(newXScale, xAxis1) {
    var axisBottom = d3.axisBottom(newXScale);
  
    xAxis1.transition()
      .duration(1000)
      .call(axisBottom);
  
    return xAxis1;
  }

  function createCircles(circleGroup, newXScale, xAxis) {

    circleGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[xAxis]));
  
    return circleGroup;
  }

  function createText(textGroup, newXScale, xAxis) {

    textGroup.transition()
      .duration(1000)
      .attr("x", d => newXScale(d[xAxis]));
  
    return textGroup;
  }

  function utoolTip(xAxis, circleGroup) {

    var label;
  
    if (xAxis === "age") {
      label = "Age:";
    }
    else {
      label = "Income:";
    }
  
    var toolTip = d3.tip()
      .attr("class", "d3-tip")
      .offset([0, 0]) 
      .html(function(d) {
        return (`${d.state}<br>${d[xAxis]}%`);
      });
  
    circleGroup.call(toolTip);
  
    circleGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
    
      .on("mouseout", function(data) {
        toolTip.hide(data, this);
      });
  
    return circleGroup;
  }
  