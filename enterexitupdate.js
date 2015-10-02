/**
 * Created by silentflutes on 10/1/2015.
 */

var dataArray = [10];
var width = 500;
var height = 500;

var canvas = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var circle1 = canvas.append("circle")
        .attr("cx", 50)
        .attr("cy", 100) //further down the page
        .attr("r", 25)
    ;
var circleq = canvas.append("circle")
        .attr("cx", 50)
        .attr("cy", 200) //further down the page
        .attr("r", 25)
    ;

var circles = canvas.selectAll("circle")
    .data(dataArray)
    .attr("fill","green")
        .exit()
        .attr("fill","blue")
    ;

