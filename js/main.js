"use strict"
var canvas;	
var gl;			// WebGL context
var vertices, vertices2;	// 3D-model (scene)
var indices, indices2;
var figures;
function init()
{
	
	/*vertices = [
		-0.5, 0.5, 0.5,
		-0.5, 0.0, 0.5,
		0.5, 0.0, 0.5,
		0.5, 0.5, 0.5,
		-0.5, 0.5, -0.5,
		-0.5, 0.0, -0.5,
		0.5, 0.0, -0.5,
		0.5, 0.5, -0.5,
		0.0,1.0,0.0
		];

		vertices2 = [
			-0.3, 0.3, 0.3,
			-0.3, 0.0, 0.3,
			0.3, 0.0, 0.3,
			0.3, 0.3, 0.3,
			-0.3, 0.3, -0.3,
			-0.3, 0.0, -0.3,
			0.3, 0.0, -0.3,
			0.3, 0.3, -0.3,
			0.0,1.0,0.0
			];*/

	vertices = [0.0, 0.0, 0.0,
				0.5,0.0,0.0,
				0.5,0.5,0.0,
				0.0,0.5,0.0
				]
	vertices2 = [-0.25,0.0,0.0,
				0.0,-0.5,0.0,
				-0.5,-0.25,0.0
				]

	//indices =[0,1,2,3,0,4,5,1,2,6,7,3,7,4,0,4,7,6,5,4,5,6,2,1,0,8,4,8,7,8,3];
	//indices2 =[0,1,2,3,0,4,5,1,2,6,7,3,7,4,0,4,7,6,5,4,5,6,2,1,0,8,4,8,7,8,3];

	indices = [0,1,2,3,0]
	indices2 = [0,1,2,0]
	// Init WebGL rendering context
	canvas = document.getElementById("canvas");
	gl = canvas.getContext("webgl");

	// Init Shader Program
	var shaderProgram = createShaderProgram("vertexShader", "fragmentShader");

	figures = new Figures(gl, shaderProgram);
	figures.create_figure(vertices, indices);
	figures.create_figure(vertices2, indices2);
	// Set color to clear buffers
	gl.clearColor(0., 0., 0., 1.);	// black

	// Set Viewport transformation
	gl.viewport(0, 0, canvas.width, canvas.height);

	figures.draw_figures();
}


function render()
{
	// Clear the Color Buffer now using the current clear color
	/*gl.clear(gl.COLOR_BUFFER_BIT);
				
	// Draw scene
	var primitiveType = gl.TRIANGLES;		// Primitive type to be rendered
	var count = indices.length;			// Number of elements (indices) to be rendered
	var type = gl.UNSIGNED_SHORT; 		// Value type in the element array buffer
	var offset = 0; 					// Bytes offset in the element array buffer
	gl.drawElements(primitiveType, count, type, offset);*/
	figures.draw_figures();

}

function main()
{
	init();
	render();
}
