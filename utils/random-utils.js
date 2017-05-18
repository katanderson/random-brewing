var getRandomInt = function(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var downloadSvg = function(paper, filename){
	var url = "data:image/svg+xml;utf8," + encodeURIComponent(paper.project.exportSVG({asString:true}));
	var link = document.createElement('a');
	link.download = filename + '.svg';
   	link.href = url;
   	link.click();
}