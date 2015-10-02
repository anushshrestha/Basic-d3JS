/**
 * Created by silentflutes on 10/1/2015.
 */

d3.json("data/testdata.json", function (data) {
    var canvas = d3.select("body").append("svg")
        .attr("width", 500)
        .attr("height", 500);

    canvas.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", function (d) {
            return d.age * 10;
        })
        .attr("height", 45)
        .attr("y", function (d, i) {
            return i * 50
        })
        .attr("fill", "blue")

    canvas.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("fill","white")
        .attr("y", function (d, i) {
            return i * 50 + 24;
        })
        .text(function(d){return d.name;})
});