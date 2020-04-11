"use strict"
var canvas;	
var gl;			// WebGL context
//var vertices, vertices2,vertices3;	// 3D-model (scene)
var vertices = [];
//var indices, indices2,indices3;
var indices = [];
var figures;
function init()
{
	vertices.push([0.0, 0.0, 0.0,
				0.5,0.0,0.0,
				0.5,0.5,0.0,
				0.0,0.5,0.0
				]);
	vertices.push([-0.25,0.0,0.0,
				0.0,-0.5,0.0,
				-0.5,-0.25,0.0
				]);

	vertices.push([0.0, 0.0, 0.0,
				-0.5,0.0,0.0,
				-0.5,-0.5,0.0,
				0.0,-0.5,0.0
				]);
	
	indices.push([0,1,2,3,0]);
	indices.push([0,1,2,0]);
	indices.push([0,1,2,3,0]);
	// Init WebGL rendering context
	canvas = document.getElementById("canvas");
	gl = canvas.getContext("webgl");

	// Init Shader Program
	var shaderProgram = createShaderProgram("vertexShader", "fragmentShader");

	figures = new Figures(gl, shaderProgram);
	for(var i = 0; i < vertices.length; i++){
		figures.create_figure(vertices[i],indices[i]);
	}
	//figures.create_figure(vertices, indices);
	//figures.create_figure(vertices2, indices2);
	//figures.create_figure(vertices3,indices3)
	// Set color to clear buffers
	gl.clearColor(0., 0., 0., 1.);	// black
	// Set Viewport transformation
	gl.viewport(0, 0, canvas.width, canvas.height);
	//figures.draw_figures();
	//figures.getFigure(0).draw();
}


function render()
{
	//figures.draw_figures();
	//figures.drawFigure(0);
	//figures.scaleFigure(0,1.5,1.5,0.0);
	figures.translateFigure(0,-0.5,-0.5,0.0);
	//figures.draw_figures();
	//figures.rotateFigure(0,0.5,0.0,0.0,1.0,true);

}

function main()
{
	init();
	//figures.translateFigure(0,0.5,0.5,0.0);
	render();
	
}
