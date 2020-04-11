class Figure {
    constructor(vertices, indices, gl, shaderProgram){
        this.vertices = vertices;
        this.indices = indices;
        this.gl = gl;
        this.shaderProgram = shaderProgram;
    }

    setBuffer() {
        this.gl.useProgram(this.shaderProgram);
        var vbo = this.gl.createBuffer();
	    var bufferType = this.gl.ARRAY_BUFFER;			// Buffer type to storage float data
	    this.gl.bindBuffer(bufferType, vbo);				// Bind to a type of buffer
	    var data = new Float32Array(this.vertices);		// Data to be storage in a Buffer (a raw device)
	    var usage = this.gl.STATIC_DRAW;					// Used for drawing optimization
        this.gl.bufferData(bufferType, data, usage);		// Load data into the Buffer
        
        // Init Uniform variables
	    var uModelMatrixLocation = this.gl.getUniformLocation(this.shaderProgram,"uModelMatrix");
	    var modelModelMatrix = glMatrix.mat4.create();
        this.gl.uniformMatrix4fv(uModelMatrixLocation,false,modelModelMatrix);
       
        var aPositionLocation = this.gl.getAttribLocation(this.shaderProgram, "aPosition");
        // Assignment Layout
	    var index = aPositionLocation;	// index of the vertex attribute location
	    var size = 3; 					// The number of components per vertex attribute
	    var type = gl.FLOAT; 			// The data type of each component in the array
	    var normalized = false; 		// Whether integer values should be normalized
	    var stride = 0; 				// Offset in bytes between consecutive vertex attributes
	    var offset = 0;					// Offset in bytes of the first component
	    this.gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
	    // Enable the Assignment
        this.gl.enableVertexAttribArray(aPositionLocation);
        
        // Index Buffer Object (IBO)
	    var ibo = this.gl.createBuffer();
	    // Bind Buffer to a data type
	    var bufferType = this.gl.ELEMENT_ARRAY_BUFFER;	// for uinteger data type (indices)
	    this.gl.bindBuffer(bufferType, ibo);
	    // Write data into a Buffer
	    var bufferType = this.gl.ELEMENT_ARRAY_BUFFER;	// for uinteger data type (indices)
	    var data = new Uint16Array(this.indices);		// data to write into the buffer
	    var usage = this.gl.STATIC_DRAW;					// How is going to use the data for optimization
	    this.gl.bufferData(bufferType, data, usage);
    }

    draw() {
        //this.setBuffer();
        // Draw scene
	    var primitiveType = this.gl.LINE_STRIP;		// Primitive type to be rendered
	    var count = this.indices.length;			// Number of elements (indices) to be rendered
	    var type = this.gl.UNSIGNED_SHORT; 		// Value type in the element array buffer
	    var offset = 0; 					// Bytes offset in the element array buffer
	    this.gl.drawElements(primitiveType, count, type, offset);
   
    }

    translateOrigin(Tx,Ty,Tz){
        this.setBuffer();
        var uModelMatrixLocation = this.gl.getUniformLocation(this.shaderProgram,"uModelMatrix");
        var modelModelMatrix = glMatrix.mat4.create();
        glMatrix.mat4.translate(modelModelMatrix,modelModelMatrix,[Tx,Ty,Tz]);
        this.gl.uniformMatrix4fv(uModelMatrixLocation,false,modelModelMatrix);
        this.draw();
    }

    rotateOrigin(theta,Tx,Ty,Tz,ccw){
        this.setBuffer();
        var uModelMatrixLocation = this.gl.getUniformLocation(this.shaderProgram,"uModelMatrix");
        var modelModelMatrix = glMatrix.mat4.create();
        if(ccw){
            glMatrix.mat4.rotate(modelModelMatrix,modelModelMatrix,theta,[Tx,Ty,Tz]);
        }else{
            glMatrix.mat4.rotate(modelModelMatrix,modelModelMatrix,-theta,[Tx,Ty,Tz]);
        }
        this.gl.uniformMatrix4fv(uModelMatrixLocation,false,modelModelMatrix);
        this.draw();
    }

    scaleOrigin(Tx,Ty,Tz){
        this.setBuffer();
        var uModelMatrixLocation = this.gl.getUniformLocation(this.shaderProgram,"uModelMatrix");
        var modelModelMatrix = glMatrix.mat4.create();
        glMatrix.mat4.scale(modelModelMatrix,modelModelMatrix,[Tx,Ty,Tz]);
        this.gl.uniformMatrix4fv(uModelMatrixLocation,false,modelModelMatrix);
        this.draw();
    }
}

class Figures {
    constructor(gl, shaderProgram) {
        this.figures = [];
        this.gl = gl;
        this.shaderProgram = shaderProgram;
    }

    create_figure(vertices,indices){
        var fig = new Figure(vertices, indices, this.gl, this.shaderProgram);
        fig.setBuffer();
        this.figures.push(fig);
    }

    draw_figures(){
        this.gl.clear(gl.COLOR_BUFFER_BIT);
        for (var i =0; i<this.figures.length;i++) {
            this.figures[i].setBuffer();
            this.figures[i].draw();
        }
    }
    
    drawFigure(index){
        this.gl.clear(gl.COLOR_BUFFER_BIT);
        this.figures[index].setBuffer();
        this.figures[index].draw();
    }

    translateFigure(index,tx,ty,tz){
        this.gl.clear(gl.COLOR_BUFFER_BIT);
        this.figures[index].translateOrigin(tx,ty,tz);
    }

    rotateFigure(index,theta,tx,ty,tz,ccw){
        this.gl.clear(gl.COLOR_BUFFER_BIT);
        this.figures[index].rotateOrigin(theta,tx,ty,tz,ccw);
    }

    scaleFigure(index,tx,ty,tz){
        this.gl.clear(gl.COLOR_BUFFER_BIT);
        this.figures[index].scaleOrigin(tx,ty,tz);
    }
}