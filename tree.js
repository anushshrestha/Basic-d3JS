var canvas = d3.select("body").append("svg")
.attr("width",500)
.attr("height",500)
.append("g")
.attr("transform","translate(50,50)");

var tree=d3.layout.tree()
.size([400,400]);

d3.json("data/treeLayoutData.json", function(data){
	var nodes=tree.nodes(data);
	//nodes return object of data from json file
	var links=tree.links(nodes);
	//returns object with two new properties source and target 
	
	//data binding
	var node =canvas.selectAll(".node")
	.data(nodes)
	.enter()
	.append("g")
		.attr("class","node")
		.attr("transform",function(d){return "translate("+ d.x + "," + d.y+ ")" ;});
	
	node.append("circle")
	.attr("r",5)
	.attr("fill","blue");
	
	//now adding circle to each node
	
});


