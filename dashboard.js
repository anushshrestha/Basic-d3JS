/**
 * Created by silentflutes on 10/5/2015.
 */

//format
var formatAsPercentage =d3.format("%"),
    formatAsPercentage1Dec=d3.format(".1%"),
    formatAsInteger=d3.format(","),
    fsec=d3.time.format("%S s"),
    fmin=d3.time.format("%M m"),
    fhou=d3.time.format("%H h"),
    fwee=d3.time.format("%a"),
    fdat=d3.time.format("%d d"),
    fmon=d3.time.format("%b")
    ;


//pie chart
function dsPieChart(){
    var dataset=[
        {category:"Sam",measure:0.30},
        {category:"Peter",measure:0.25},
        {category:"John",measure:0.15},
        {category:"Rick",measure:0.05},
        {category:"Lenny",measure:0.18},
        {category:"Paul",measure:0.04},
        {category:"Steve",measure:0.03}
    ];

    var width =400, height=400,outerRadius=Math.min(width,height)/ 2,
        innerRadius=outerRadius*.999,
        //for animation
        innerRadiusFinal=outerRadius*.5,
        innerRadiusFinal3=outerRadius*.45,
        color=d3.scale.category20()
    ;


    var vis=d3.select("#pieChart")
        .append("svg:svg")
        .data([dataset])
        .attr("width",width)
        .attr("height",height)
        .append("svg:g")
        .attr( "transform","translate(" + outerRadius+"," + outerRadius + ")" )
    ;
    //create path elements for us using arc data
    var arc =d3.svg.arc()
        .outerRadius(outerRadius).innerRadius(innerRadius);

    //for animation
    var arcFinal=d3.svg.arc().innerRadius(innerRadiusFinal)
        .outerRadius(outerRadius);

    var arcFinal3=d3.svg.arc().innerRadius(innerRadiusFinal3)
        .outerRadius(outerRadius);

    //creating arc daa for a given list of values by accessing them
    var pie=d3.layout.pie()
        .value(function(d){return d.measure;});

    //selects all <g> elements with class slice(arent any now)
    var arcs=vis.selectAll("g.slice")
        .data(pie)//associate generated pie data(Array of arc each with startangle,end angle and value properties)
        .enter()//create <g> elements for every extra data element that should be associated with a selection.
        .append("svg:g") //create group to hold each slice
        .attr("class","slice") //allow to style things
        .on("mouseover",mouseover)
        .on("mouseout",mouseout)
        .on("click",up)
    ;

    arcs.append("svg:path")
        .attr("fill",function(d,i){return color(i);})
        .attr("d",arc)
        .append("svg:title")
        .text(function(d){return d.data.category+":"+formatAsPercentage(d.data.measure);})
    ;

    d3.selectAll("g.slice").selectAll("path").transition()
        .duration(750)
        .delay(10)
        .attr("d",arcFinal)
    ;

    //add a label to the larger arcs, translated to arc centroid and rotated
    arcs.filter(function(d){return d.endAngle- d.startAngle>.2;})
        .append("svg:text")
        .attr("dy",".35em")
        .attr("text-anchor","middle")
        .attr("transform",function(d){return "translate("+arcFinal.centroid(d)+")rotate("+angle(d)+")";})
                .text(function(d){return d.data.category;})
    ;
    //computes the label angle of arc,convert from radian to degrees

    function angle(d){
        var a=(d.startAngle+ d.endAngle)*90/Math.PI-90;
        return a>90 ? a-180 : a;
    }

    //pie char title
    vis.append("svg:text")
        .attr("dy",".35em")
        .attr("text-anchor","middle")
        .text("Revenue share 2015")
        .attr("class","title")
    ;

    function mouseover(){
        d3.select(this).select("path").transition()
            .duration(750)
            //.attr("stroke","red")
            //.attr("stroke-width",1.5)
            .attr("d",arcFinal3)
        ;
    }

    function mouseout(){
        d3.select(this).select("path").transition()
            .duration(750)
        //.attr("stroke","blue")
        //.attr("stroke-width",1.5)
            .attr("d",arcFinal)
        ;
    }

        //update bar chart when user selects pieve of the pie chart
    function up(d,i){
            updateBarChart(d.data.category,color(i));
            updateLineChart(d.data.category,color(i));
    }
}

dsPieChart();

//bar chart

var datasetBarChart = [
        { group: "All", category: "Oranges", measure: 63850.4963 },
        { group: "All", category: "Apples", measure: 78258.0845 },
        { group: "All", category: "Grapes", measure: 60610.2355 },
        { group: "All", category: "Figs", measure: 30493.1686 },
        { group: "All", category: "Mangos", measure: 56097.0151 },
        { group: "Sam", category: "Oranges", measure: 19441.5648 },
        { group: "Sam", category: "Apples", measure: 25922.0864 },
        { group: "Sam", category: "Grapes", measure: 9720.7824 },
        { group: "Sam", category: "Figs", measure: 6480.5216 },
        { group: "Sam", category: "Mangos", measure: 19441.5648 },
        { group: "Peter", category: "Oranges", measure: 22913.2728 },
        { group: "Peter", category: "Apples", measure: 7637.7576 },
        { group: "Peter", category: "Grapes", measure: 23549.7526 },
        { group: "Peter", category: "Figs", measure: 1909.4394 },
        { group: "Peter", category: "Mangos", measure: 7637.7576 },
        { group: "John", category: "Oranges", measure: 1041.5124 },
        { group: "John", category: "Apples", measure: 2430.1956 },
        { group: "John", category: "Grapes", measure: 15275.5152 },
        { group: "John", category: "Figs", measure: 4166.0496 },
        { group: "John", category: "Mangos", measure: 11803.8072 },
        { group: "Rick", category: "Oranges", measure: 7406.3104 },
        { group: "Rick", category: "Apples", measure: 2545.9192 },
        { group: "Rick", category: "Grapes", measure: 1620.1304 },
        { group: "Rick", category: "Figs", measure: 8563.5464 },
        { group: "Rick", category: "Mangos", measure: 3008.8136 },
        { group: "Lenny", category: "Oranges", measure: 7637.7576 },
        { group: "Lenny", category: "Apples", measure: 35411.4216 },
        { group: "Lenny", category: "Grapes", measure: 8332.0992 },
        { group: "Lenny", category: "Figs", measure: 6249.0744 },
        { group: "Lenny", category: "Mangos", measure: 11803.8072 },
        { group: "Paul", category: "Oranges", measure: 3182.399 },
        { group: "Paul", category: "Apples", measure: 867.927 },
        { group: "Paul", category: "Grapes", measure: 1808.18125 },
        { group: "Paul", category: "Figs", measure: 795.59975 },
        { group: "Paul", category: "Mangos", measure: 578.618 },
        { group: "Steve", category: "Oranges", measure: 2227.6793 },
        { group: "Steve", category: "Apples", measure: 3442.7771 },
        { group: "Steve", category: "Grapes", measure: 303.77445 },
        { group: "Steve", category: "Figs", measure: 2328.93745 },
        { group: "Steve", category: "Mangos", measure: 1822.6467 },
    ]
    ;

//setting initial group value

var group="All";

function datasetBarChosen(group){
    var ds=[];
    for(x in datasetBarChart){
        if(datasetBarChart[x].group==group){
            ds.push(datasetBarChart[x]);
        }
    }
    return ds;
}
//basic: margin width and height
function dsBarChartBasics(){
    var margin ={top:30,right:5,bottom:20,left:50},
        width=500-margin.left-margin.right,
        height=250-margin.top-margin.bottom,
        colorBar=d3.scale.category20(),
        barPadding=1
    ;

    return{
        margin:margin,
        width:width,
        height:height,
        colorBar:colorBar,
        barPadding:barPadding
    }
    ;
}

function dsBarChart(){
    var firstDatasetBarChart=datasetBarChosen(group);
    var basics=dsBarChartBasics();
    var margin=basics.margin,
        width =basics.width,
        height=basics.height,
        colorBar=basics.colorBar,
        barPadding =basics.barPadding
    ;

    var xScale=d3.scale.linear()
        .domain([0,firstDatasetBarChart.length])
        .range([0,width])
    ;

    //creating linear y scale
    //purpose : no matter what the data is, the bar should fit into the svg are
    //bar should not get higher than svg height. so incoming data must be scaled

    var yScale=d3.scale.linear()
        .domain([0,d3.max(firstDatasetBarChart,function(d){return d.measure;})])
    // As coordinates are always defined from the top left corner, the y position of the bar
    // is the svg height minus the data value. So you basically draw the bar starting from the top.
    // To have the y position calculated by the range function
        .range([height,0])
    ;

    //create svg element
    var svg =d3.select("#barChart")
        .append("svg")
        .attr("width",width+margin.left+margin.right)
        .attr("height",height+margin.top+margin.bottom)
        .attr("id","barChartPlot")
    ;

    var plot =svg
        .append("g")
        .attr("transform","translate("+ margin.left+","+ margin.top + ")")
    ;

    plot.selectAll("rect")
        .data(firstDatasetBarChart)
        .enter()
        .append("rect")
        .attr("x",function(d,i){return xScale(i);})
        .attr("width",width/firstDatasetBarChart.length-barPadding)
        .attr("y",function(d){return yScale(d.measure);})
        .attr("height",function(d){return height - yScale(d.measure);})
        .attr("fill","lightgrey")
    ;

   //add y labels to plot
    plot.selectAll("text")
        .data(firstDatasetBarChart)
        .enter()
        .append("text")
        .text(function (d){return formatAsInteger(d3.round(d.measure));})
        .attr("text-anchor","middle")
        //set x position to the left edge of each bar plus half the har width
        .attr("x",function(d,i){ return (i*(width/firstDatasetBarChart.length))
        +((width/firstDatasetBarChart.length-barPadding)/2);})
        .attr("y",function(d){return yScale(d.measure)+14;})
        .attr("class","yAxis")
    ;

    //add x labels to chart
    var xLabels= svg
        .append("g")
        .attr("transform","translate("+margin.left+","+(margin.top+height)+")")
    ;

    xLabels.selectAll("text.xAxis")
        .data(firstDatasetBarChart)
        .enter()
        .append("text")
        .text(function(d){return d.category;})
        .attr("text-anchor","middle")
        //set x position to the left edge of each bar plus half the bar width
        .attr("x",function(d,i){return (i*(width/firstDatasetBarChart.length))+((width/firstDatasetBarChart.length-barPadding)/2)})
        .attr("y",15)
        .attr("class","xAxis")
    ;

    //title
    svg.append("text")
        .attr("x",(width+margin.left+margin.right)/2)
        .attr("y",15)
        .attr("class","title")
        .attr("text-anchor","middle")
        .text("overall sales breakdown 2015")
    ;
}
dsBarChart();


//update bar chart on request
function updateBarChart(group,colorChosen){
    var currentDataSetBarChart = datasetBarChosen(group);
    var basics=dsBarChartBasics();
    var margin=basics.margin,width=basics.width,height=basics.height,
        colorBar=basics.colorBar, barPadding=basics.barPadding
    ;

    var xScale=d3.scale.linear()
        .domain([0,currentDataSetBarChart.length])
        .range([0,width])
    ;

    var yScale=d3.scale.linear()
        .domain([0,d3.max(currentDataSetBarChart,function(d){return d.measure;})])
        .range([height,0])
    ;
    var svg =d3.select("#barChart svg");
    var plot = d3.select("#barChartPlot")
        .datum(currentDataSetBarChart)
    ;

    //here we just need to select element - no more appending
    plot.selectAll("rect")
        .data(currentDataSetBarChart)
        .transition()
        .duration(750)
        .attr("x",function(d,i){return xScale(i);})
        .attr("width",width/currentDataSetBarChart.length-barPadding)
        .attr("y",function(d){return yScale(d.measure);})
        .attr("height",function(d){return height-yScale(d.measure);})
        .attr("fill",colorChosen)
    ;

    //target the text element which has a yAsix class defined
    plot.selectAll("text.yAxis")
        .data(currentDataSetBarChart)
        .transition()
        .duration(750)
        .attr("text-anchor","middle")
        .attr("x",function(d,i){return (i*(width/currentDataSetBarChart.length))
        +((width/currentDataSetBarChart.length-barPadding)/2);})
        .attr("y",function(d){return yScale(d.measure)+14;})
        .text(function(d){return formatAsInteger(d3.round(d.measure));})
        .attr("class","yAxis")
    ;

    //target the text element which has a title class defined

    svg.selectAll("text.title")
        .attr("x",(width+margin.left+margin.right)/2)
        .attr("y",15)
        .attr("class","title")
        .attr("text-anchor","middle")
        .attr(group+"'s sales breakdown 2015")
    ;
}

//line chart
var datasetLineChart = [
        { group: "All", category: 2008, measure: 289309 },
        { group: "All", category: 2009, measure: 234998 },
        { group: "All", category: 2010, measure: 310900 },
        { group: "All", category: 2011, measure: 223900 },
        { group: "All", category: 2012, measure: 234500 },
        { group: "Sam", category: 2008, measure: 81006.52 },
        { group: "Sam", category: 2009, measure: 70499.4 },
        { group: "Sam", category: 2010, measure: 96379 },
        { group: "Sam", category: 2011, measure: 64931 },
        { group: "Sam", category: 2012, measure: 70350 },
        { group: "Peter", category: 2008, measure: 63647.98 },
        { group: "Peter", category: 2009, measure: 61099.48 },
        { group: "Peter", category: 2010, measure: 87052 },
        { group: "Peter", category: 2011, measure: 58214 },
        { group: "Peter", category: 2012, measure: 58625 },
        { group: "Rick", category: 2008, measure: 23144.72 },
        { group: "Rick", category: 2009, measure: 14099.88 },
        { group: "Rick", category: 2010, measure: 15545 },
        { group: "Rick", category: 2011, measure: 11195 },
        { group: "Rick", category: 2012, measure: 11725 },
        { group: "John", category: 2008, measure: 34717.08 },
        { group: "John", category: 2009, measure: 30549.74 },
        { group: "John", category: 2010, measure: 34199 },
        { group: "John", category: 2011, measure: 33585 },
        { group: "John", category: 2012, measure: 35175 },
        { group: "Lenny", category: 2008, measure: 69434.16 },
        { group: "Lenny", category: 2009, measure: 46999.6 },
        { group: "Lenny", category: 2010, measure: 62180 },
        { group: "Lenny", category: 2011, measure: 40302 },
        { group: "Lenny", category: 2012, measure: 42210 },
        { group: "Paul", category: 2008, measure: 7232.725 },
        { group: "Paul", category: 2009, measure: 4699.96 },
        { group: "Paul", category: 2010, measure: 6218 },
        { group: "Paul", category: 2011, measure: 8956 },
        { group: "Paul", category: 2012, measure: 9380 },
        { group: "Steve", category: 2008, measure: 10125.815 },
        { group: "Steve", category: 2009, measure: 7049.94 },
        { group: "Steve", category: 2010, measure: 9327 },
        { group: "Steve", category: 2011, measure: 6717 },
        { group: "Steve", category: 2012, measure: 7035 }
    ]
    ;

//set initial category value
var group ="All";

function datasetLineChartChosen(group){
    var ds=[];
    for(x in datasetLineChart){
        if(datasetBarChart[x].group==group){
            ds.push(datasetLineChart[x]);
        }
    }
    return ds;
}

function dsLineChartBasics(){
    var margin={top:20,right:10,bottom:0,left:50},
        width=500-margin.left-margin.right,
        height=150-margin.top-margin.bottom
    ;
    return {
        margin : margin,
        width : width,
        height : height
    };
}

function dsLineChart(){

    var firstDatasetLineChart=datasetLineChartChosen(group);
    var basics=dsLineChartBasics();
    var margin=basics.margin,
        width=basics.width,
        height=basics.height
        ;

    var xScale=d3.scale.linear()
        .domain([0,firstDatasetLineChart.length-1])
        .range([0,width])
    ;

    var yScale =d3.scale.linear()
        .domain([0,d3.max(firstDatasetLineChart,function(d){return d.measure;})])
        .range([height,0])
    ;

    var line=d3.svg.line()
        .x(function(d,i){return xScale(i);})
        .y(function(d){return yScale(d.measure);})
    ;

    var svg=d3.select("#lineChart").append("svg")
        .datum(firstDatasetLineChart)
        .attr("width",width+margin.left+margin.right)
        .attr("height",height+margin.top+margin.right);
      //create group and move it so that margins are respected

    var plot=svg
        .append("g")
        .attr("transform","translate("+ margin.left + "," + margin.top +")")
        .attr("id","lineChartPlot")
    ;

    //descriptive titles as a part of plot
    var  dsLength=firstDatasetLineChart.length;

    plot.append("text")
        .text(firstDatasetLineChart[dsLength-1].measure)
        .attr("id","lineChartTitle2")
        .attr("x",width/2)
        .attr("y",height/2)
    ;

    plot.append("path")
        .attr("class","line")
        .attr("d",line)
    //add color
        .attr("stroke","lightgrey")
    ;

    plot.selectAll(".dot")
        .data(firstDatasetLineChart)
        .enter()
        .append("circle")
        .attr("class","dot")
        .attr("fill",function(d){
            return d.measure ==
            d3.min(firstDatasetLineChart,function(d){return d.measure;})?
                "red":
                (d.measure== d3.max(firstDatasetLineChart,
                    function(d){return d.measure;})?"green":"white")})
        .attr("cx",line.x())
        .attr("cy",line.y())
        .attr("r",3.5)
        .attr("stroke","lightgrey")
        .append("title")
        .text(function(d){return d.category+":"+ formatAsInteger(d.measure);})
    ;

    svg.append("text")
        .text("performance 2015")
        .attr("id","lineChartTitle1")
        .attr("x",margin.left+((width+margin.right)/2))
        .attr("y",10)
    ;
}
dsLineChart();

//update line chart
function updateLineChart (group,colorChosen){
    var currentDatasetLineChart = datasetLineChartChosen(group);
    var basics=dsLineChartBasics();
    var margin=basics.margin,
        width=basics.width,
        height=basics.height;
    var xScale =d3.scale.linear()
        .domain([0,currentDatasetLineChart.length-1])
        .range([0,width])
    ;
    var yScale = d3.scale.linear()
        .domain([0,d3.max(currentDatasetLineChart,function(d){return d.measure;})])
        .range([height,0])
    ;
    var line=d3.svg.line()
        .x(function(d,i){return xScale(i);})
        .y(function(d){return yScale(d.measure);})
    ;

    var plot=d3.select("#lineChartPlot")
        .datum(currentDatasetLineChart)
    ;

    //descriptive title as a part of plot
    var dsLength=currentDatasetLineChart.length;

    plot.select("text")
        .text(currentDatasetLineChart[dsLength-1].measure)
    ;

    plot.select("path")
        .transition()
        .duration(750)
        .attr("class","line")
        .attr("d",line)
        .attr("stroke",colorChosen)
    ;

    var path= plot.selectAll(".dot")
        .data(currentDatasetLineChart)
        .transition()
        .duration(750)
        .attr("class","dot")
        .attr("fill",function(d) {
            return d.measure ==
                d3.min(currentDatasetLineChart, function (d) {
                    return d.measure;
                })
            ?"red":(d.measure==d3.max(currentDatasetLineChart,function(d){
                return d.measure;
                }) ? "green":"white")
            })
            .attr("cx",line.x())
            .attr("cy",line.y())
            .attr("r",3.5)
            .attr("stroke",colorChosen)
        ;

    path.selectAll("title")
        .text(function(d){return d.category+":"+formatAsInteger(d.measure);})
    ;


}