/**
 * Created by silentflutes on 10/1/2015.
 */

var canvas = d3.select("body")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

var circle = canvas.append("circle")
        .attr("cx", 50)
        .attr("cy", 50) //further down the page
        .attr("r", 25)
        .attr("fill", "pink")
    ;

circle
    .transition()
    .duration(1500)
    .attr("cx", 150)
    .each("start", function () {
        d3.select(this).attr("fill", "red");
    })
    .each("end", function () {
        d3.select(this).attr("fill", "green");
    })
    .transition()
    .attr("cy", 200)
;