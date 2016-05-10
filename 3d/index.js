var scene ;
var camera ;
var renderer;
var renderer_tibiale;
var renderer_sagittale;
var renderer_pentetibiale;
var renderer_varus;
var controls;
var geometry;
var camera_coupeTibiale;
var camera_coupeSagittale;
var camera_varus;
var camera_embase;
var mesh = null;
var mesh2 = null;
function init() {

	console.log("let's start");
	scene = new THREE.Scene();
	var scene_globale = document.getElementById("scene_globale");
	console.log(scene_globale);
	var coupe_tibiale = document.getElementById("coupe_tibiale");
	var coupe_sagittale = document.getElementById("coupe_sagittale");
	var varus = document.getElementById("varus");
	var pente_tibiale = document.getElementById("pente_tibiale");
	var embase = document.getElementById("embase");
       var gui = new dat.GUI();
	   parametres = {  translatex : 0 , translatey : 0 , translatez : 0 , rotationx : 88 , rotationy : 10 , rotationz :  50 ,};
	   var tibia = gui.addFolder('Tibia'); 
	   var rotatex = tibia.add(parametres,"rotationx").min(-200).max(200).step(1);	
	   var rotatey = tibia.add(parametres,"rotationy").min(-200).max(200).step(1);	
	   var rotatez = tibia.add(parametres,"rotationz").min(-200).max(200).step(1);	 
	   var translatex = tibia.add(parametres,"translatex").min(-5).max(5).step(0.01);	
	   var translatey = tibia.add(parametres,"translatey").min(-5).max(5).step(0.01);	
	   var translatez = tibia.add(parametres,"translatez").min(-5).max(5).step(0.01);	 
	   gui.open();
	   //tibia.open(); 
    	camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 20000 );
    	camera.position.z = 200;
        camera.position.y = 0;
        camera.position.x = 0;
        console.log(camera.rotation.x);
        console.log(camera.rotation.y);
        console.log(camera.rotation.z);

    	rotatex.onChange(function(x){

    		camera.position.x = x;
    

    	});
    	rotatey.onChange(function(y){
    		camera.position.y = y;

    	});
    	rotatez.onChange(function(z){
    		camera.position.z = z;

    	});
    	translatex.onChange(function(x){

    		camera.rotation.x = x;
    		

    	});
    	translatey.onChange(function(y){
    		camera.rotation.y = y;

    	});
    	translatez.onChange(function(z){
    		camera.rotation.z = z;

    	});
        
  console.log(camera.rotation);
        camera_coupeTibiale = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 20000 );
        camera_coupeTibiale.position.z = 105;
        camera_coupeTibiale.position.y = -8;
        camera_coupeTibiale.position.x = -8;

        camera_coupeSagittale = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 20000 );
        camera_coupeSagittale.position.z = 100;
        camera_coupeSagittale.position.y = -10;
        camera_coupeSagittale.position.x = -21;

        camera_varus = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 20000 );
        camera_varus.position.z = 84;
        camera_varus.position.y = 4;
        camera_varus.position.x = -21;

        camera_embase = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 20000 );
        camera_embase.position.z = 21;
        camera_embase.position.y = -27;
        camera_embase.position.x = 102;

   
   var light = new THREE.DirectionalLight(0xF5F5F5,1);
    light.position.set(-5,69,8.6);
    var light = new THREE.DirectionalLight(0xF5F5F5,1);
    light.position.set(10,15,15);
    var light = new THREE.DirectionalLight(0xF5F5F5,1);
    light.position.set(-10,-51,-2);
   /* var pointLight = new THREE.PointLight(0xF5F5F5,1);
    pointLight.position.set(50,0,0);
    var pointLight = new THREE.PointLight(0xF5F5F5,1);
    pointLight.position.set(25,75,75);

    
    scene.add(pointLight); */
    scene.add(light);
    var light2 = new THREE.HemisphereLight( 0xffffff, 0x080820, 1 );
     scene.add( light2 );


     //////////////////////////////////
	renderer = new THREE.WebGLRenderer();
	renderer_tibiale = new THREE.WebGLRenderer();
	renderer_sagittale = new THREE.WebGLRenderer();
	renderer_varus = new THREE.WebGLRenderer();
	renderer_pentetibiale = new THREE.WebGLRenderer();
	renderer_tibiale = new THREE.WebGLRenderer();
	renderer_sagitalle = new THREE.WebGLRenderer();
	renderer_varus = new THREE.WebGLRenderer();
	renderer_pentetibiale = new THREE.WebGLRenderer();
	renderer_embase= new THREE.WebGLRenderer();
	renderer.setSize(scene_globale.clientWidth , 500);
	renderer_tibiale.setSize(coupe_tibiale.clientWidth , 200);
	renderer_sagittale.setSize(coupe_sagittale.clientWidth , 200);
	renderer_varus.setSize(varus.clientWidth , 200);
	renderer_pentetibiale.setSize(pente_tibiale.clientWidth , 200);
	renderer_embase.setSize(pente_tibiale.clientWidth , 200);
	renderer_tibiale.setClearColor( 0x0e99ee);
	renderer_sagittale.setClearColor( 0x0e99ee );
	renderer_varus.setClearColor( 0x0e99ee );
	renderer_pentetibiale.setClearColor( 0x0e99ee );
	renderer.setClearColor( 0x0e99ee );
	renderer_embase.setClearColor( 0x0e99ee );
	var texture = new THREE.TextureLoader().load( "img/logo.jpg" );
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 4, 4 );
	renderer.setTexture(texture,1);	
	console.log(scene_globale.clientWidth);
	document.getElementById("scene_globale").appendChild(renderer.domElement);
	document.getElementById("coupe_tibiale").appendChild(renderer_tibiale.domElement);
	document.getElementById("coupe_sagittale").appendChild(renderer_sagittale.domElement);
	document.getElementById("varus").appendChild(renderer_varus.domElement);
	document.getElementById("pente_tibiale").appendChild(renderer_pentetibiale.domElement);
	document.getElementById("embase").appendChild(renderer_embase.domElement);
    var axisHelper = new THREE.AxisHelper( 100 );
    scene.add( axisHelper );
	
	controls = new THREE.OrbitControls( camera , renderer.domElement); 
	var manager = new THREE.LoadingManager();

	manager.onProgress = function(item,loaded,total) {

		console.log(item, loaded , total);
	};
	var onProgress = function(xhr){

		if (xhr.lenghtComputable) {

			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log(Math.round(percentComplete,2) + '% downloaded');
		}
	};

	var onError = function(xhr){

	};

    


	var loader = new THREE.OBJLoader(manager);
    var loader2 = new THREE.OBJLoader(manager);
    var loader3 = new THREE.OBJLoader(manager);
		loader.load('img/tibia.obj',function(object){  
                 
	 

          if (mesh==null) {
             var material = new THREE.MeshPhongMaterial({color:0xfff4c9});
             object.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                child.material = material;
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry); 
                mesh = new THREE.Mesh( geometry, material );
                mesh.rotation.set(-1.3,0,0);
               scene.add(mesh);    
             }                   
           } ); 
        }
        loader2.load('img/T4.obj',function( object2 ){  
                object2.traverse( function ( child ){
                   console.log(loader2.url);
                if ( child instanceof THREE.Mesh ) {

                  object2.rotation.set(3.4,4.71,-3.155);                            
                  object2.position.x = -0 
                  object2.position.y = -0.8 /// remplacer le -4 par -3 peut être un  probleme de précision
                  object2.position.z = 22 ;
                  child.material.color.setHex(0x5B5B5B);
                  scene.add(object2);
                  
                  console.log("this is the opacity of object",child.material.opacity)
                  }
                } );
          

        //////////////// Action Button tibia /////////////////////////////// 
            var button_tibia_plus = document.getElementById("plus_coupeTibiale");
            button_tibia_plus.addEventListener("click",function(){
             var valeur_coupeTibiale = parseInt(document.getElementById('valeur_coupeTibiale').innerHTML) ;
             if (valeur_coupeTibiale < 2) {
            scene.remove(mesh);
            console.log("button_tibiaplus");
            var material = new THREE.MeshPhongMaterial({color:0xfff4c9});   
             object.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {


                 child.material = material;
                 geometry = new THREE.Geometry().fromBufferGeometry(child.geometry); 
                 var valeur_coupeSagittale = parseInt(document.getElementById('valeur_coupeSagittale').innerHTML) ;
                 var valeur_varus = parseInt(document.getElementById('valeur_varus').innerHTML) ;
                 var valeur_penteTibiale = parseInt(document.getElementById('valeur_penteTibiale').innerHTML) ;
                 MinMaxX(geometry);
                 MinMaxY(geometry);
                 MinMaxZ(geometry);
                 coupeTibiale(geometry,valeur_coupeTibiale+1,valeur_coupeSagittale,valeur_varus,valeur_penteTibiale);
                 document.getElementById('valeur_coupeTibiale').innerHTML = valeur_coupeTibiale+1;
                  object2.position.x = -0 - valeur_coupeSagittale;
                  object2.position.y = -0.8 - (valeur_coupeTibiale+1 ); /// remplacer le -4 par -3 peut être un  probleme de précision
                  object2.position.z = 22 ;
                 geometry.verticesNeedUpdate = true;            
                 mesh = new THREE.Mesh( geometry, material ); 
                 mesh.rotation.set(-1.3,0,0); 
                scene.add(mesh);
 
              
               }
             });
             }
             else {
             	alert(" la Valeur maximale est de 2mm ");
             }   
            },false);
            var button_tibia_moins = document.getElementById("moins_coupeTibiale");
            button_tibia_moins.addEventListener("click",function(){
            var  valeur_coupeTibiale = parseInt(document.getElementById('valeur_coupeTibiale').innerHTML) ;
            if (valeur_coupeTibiale >0) {
            scene.remove(mesh);
            console.log("button_tibiaplus");
            var material = new THREE.MeshPhongMaterial({color:0xfff4c9});   
             object.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {             
                 geometry = new THREE.Geometry().fromBufferGeometry(child.geometry); 
                var valeur_coupeSagittale = parseInt(document.getElementById('valeur_coupeSagittale').innerHTML) ;
                 var valeur_varus = parseInt(document.getElementById('valeur_varus').innerHTML) ;
                 var valeur_penteTibiale = parseInt(document.getElementById('valeur_penteTibiale').innerHTML) ;
                 coupeTibiale(geometry,valeur_coupeTibiale-1,valeur_coupeSagittale,valeur_varus,valeur_penteTibiale);
                 document.getElementById('valeur_coupeTibiale').innerHTML = valeur_coupeTibiale-1;
                  object2.position.x = -0 - valeur_coupeSagittale;
                  object2.position.y = -0.8 - (valeur_coupeTibiale - 1 ); /// remplacer le -4 par -3 peut être un  probleme de précision
                  object2.position.z = 22 ;

                 geometry.verticesNeedUpdate = true;   
                 
                 child.material = material;        
                 mesh = new THREE.Mesh( geometry, material ); 
                 mesh.rotation.set(-1.3,0,0); 
                scene.add(mesh);
               }
             }); 
             }
             else {
             	alert ("la Valeur minimale est de 0mm ");
             }  
            },false);   

           /////////////////////// Action button sagittale ////////////////////////////////////////////
            var button_sagittale_plus = document.getElementById("plus_coupeSagittale");
            button_sagittale_plus.addEventListener("click",function(){
             var valeur_coupeSagittale = parseInt(document.getElementById('valeur_coupeSagittale').innerHTML) ;
             console.log(valeur_coupeSagittale);
             if (valeur_coupeSagittale < 4) {
            scene.remove(mesh);
            console.log("button_sagittaleplus");
            var material = new THREE.MeshPhongMaterial({color:0xfff4c9});   
             object.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                 child.material = material;
                 geometry = new THREE.Geometry().fromBufferGeometry(child.geometry); 
                var valeur_coupeTibiale = parseInt(document.getElementById('valeur_coupeTibiale').innerHTML) ;
                 var valeur_varus = parseInt(document.getElementById('valeur_varus').innerHTML) ;
                  var valeur_penteTibiale = parseInt(document.getElementById('valeur_penteTibiale').innerHTML) ;
                 coupeSagittale(geometry,valeur_coupeSagittale+1,valeur_coupeTibiale,valeur_varus,valeur_penteTibiale);
                 document.getElementById('valeur_coupeSagittale').innerHTML = valeur_coupeSagittale + 1;
                 geometry.verticesNeedUpdate = true; 
                  object2.position.x = -0 - (valeur_coupeSagittale+1) ;
                  object2.position.y = -0.8 - valeur_coupeTibiale; /// remplacer le -4 par -3 peut être un  probleme de précision
                  object2.position.z = 22 ;
           
                 mesh = new THREE.Mesh( geometry, material ); 
                 mesh.rotation.set(-1.3,0,0); 
                scene.add(mesh);
               }
             });
             }
             else {
             	alert(" la Valeur maximale est de 4mm ");
             }   
            },false);
            var button_sagittale_moins = document.getElementById("moins_coupeSagittale");
            button_sagittale_moins.addEventListener("click",function(){
            var  valeur_coupeSagittale = parseInt(document.getElementById('valeur_coupeSagittale').innerHTML) ;
            if (valeur_coupeSagittale >0) {
            scene.remove(mesh);
            console.log("button_sagittale_moins");
            var material = new THREE.MeshPhongMaterial({color:0xfff4c9});   
             object.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {             
                 geometry = new THREE.Geometry().fromBufferGeometry(child.geometry); 
                 var valeur_coupeTibiale = parseInt(document.getElementById('valeur_coupeTibiale').innerHTML) ;
                  var valeur_varus = parseInt(document.getElementById('valeur_varus').innerHTML) ;
                   var valeur_penteTibiale = parseInt(document.getElementById('valeur_penteTibiale').innerHTML) ;
                 coupeSagittale(geometry,valeur_coupeSagittale-1,valeur_coupeTibiale,valeur_varus,valeur_penteTibiale);
                 document.getElementById('valeur_coupeSagittale').innerHTML = valeur_coupeSagittale-1;
                 object2.position.x = -0 - (valeur_coupeSagittale-1) ;
                  object2.position.y = -0.8 - valeur_coupeTibiale; /// remplacer le -4 par -3 peut être un  probleme de précision
                  object2.position.z = 22 ;
                 geometry.verticesNeedUpdate = true;    
                 child.material = material;        
                 mesh = new THREE.Mesh( geometry, material ); 
                 mesh.rotation.set(-1.3,0,0); 
                scene.add(mesh);
               }
             }); 
             }
             else {
             	alert ("la Valeur minimale est de 0mm ");
             }  
            },false);   
             ////////////////////////////// Action button varus ///////////////////////////////////////////////////////////
             var button_varus_plus = document.getElementById("plus_varus");
            button_varus_plus.addEventListener("click",function(){
             var valeur_varus = parseInt(document.getElementById('valeur_varus').innerHTML) ;
             console.log(valeur_varus);
             if (valeur_varus < 2) {
            scene.remove(mesh);
            console.log("button_varus_plus");
            var material = new THREE.MeshPhongMaterial({color:0xfff4c9});   
             object.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                 child.material = material;
                 geometry = new THREE.Geometry().fromBufferGeometry(child.geometry); 
                var valeur_varus = parseInt(document.getElementById('valeur_varus').innerHTML) ;
                var valeur_coupeTibiale = parseInt(document.getElementById('valeur_coupeTibiale').innerHTML) ;
                var  valeur_coupeSagittale = parseInt(document.getElementById('valeur_coupeSagittale').innerHTML) ;
                 var valeur_penteTibiale = parseInt(document.getElementById('valeur_penteTibiale').innerHTML) ;
                 coupeVarus(geometry,valeur_varus+1,valeur_coupeTibiale,valeur_coupeSagittale,valeur_penteTibiale);
                 document.getElementById('valeur_varus').innerHTML = valeur_varus + 1;
                 geometry.verticesNeedUpdate = true;            
                 mesh = new THREE.Mesh( geometry, material ); 
                 mesh.rotation.set(-1.3,0,0); 
                scene.add(mesh);
               }
             });
             }
             else {
                alert(" la Valeur maximale est de 2° ");
             }   
            },false);
            var button_varus_moins = document.getElementById("moins_varus");
            button_varus_moins.addEventListener("click",function(){
            var  valeur_varus = parseInt(document.getElementById('valeur_varus').innerHTML) ;
            if (valeur_varus >0) {
            scene.remove(mesh);
            console.log("button_varus_moins");
            var material = new THREE.MeshPhongMaterial({color:0xfff4c9});   
             object.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {             
                 geometry = new THREE.Geometry().fromBufferGeometry(child.geometry); 
                 var valeur_varus = parseInt(document.getElementById('valeur_varus').innerHTML) ;
                 var valeur_coupeTibiale = parseInt(document.getElementById('valeur_coupeTibiale').innerHTML) ;
                 var  valeur_coupeSagittale = parseInt(document.getElementById('valeur_coupeSagittale').innerHTML) ;
                  var valeur_penteTibiale = parseInt(document.getElementById('valeur_penteTibiale').innerHTML) ;
                 coupeVarus(geometry,valeur_varus-1,valeur_coupeTibiale,valeur_coupeSagittale,valeur_penteTibiale);
                 document.getElementById('valeur_varus').innerHTML = valeur_varus-1;
                 geometry.verticesNeedUpdate = true;    
                 child.material = material;        
                 mesh = new THREE.Mesh( geometry, material ); 
                 mesh.rotation.set(-1.3,0,0); 
                scene.add(mesh);
               }
             }); 
             }
             else {
                alert ("la Valeur minimale est de 0 ° ");
             }  
            },false);   

             ////////////////////////////////////////Action button pente tibiale///////////////////////////////////////////////////////
            var button_penteTibiale_plus = document.getElementById("plus_penteTibiale");
            button_penteTibiale_plus.addEventListener("click",function(){
             var valeur_penteTibiale = parseInt(document.getElementById('valeur_penteTibiale').innerHTML) ;
             console.log(valeur_penteTibiale);
             if (valeur_penteTibiale < 4) {
            scene.remove(mesh);
            console.log("button_penteTibiale_plus");
            var material = new THREE.MeshPhongMaterial({color:0xfff4c9});   
             object.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                 child.material = material;
                 geometry = new THREE.Geometry().fromBufferGeometry(child.geometry); 
               // var valeur_varus = parseInt(document.getElementById('valeur_varus').innerHTML) ;
             //   var valeur_coupeTibiale = parseInt(document.getElementById('valeur_coupeTibiale').innerHTML) ;
             //   var  valeur_coupeSagittale = parseInt(document.getElementById('valeur_coupeSagittale').innerHTML) ;
                 coupePenteTibiale(geometry,valeur_penteTibiale+1);
                 document.getElementById('valeur_penteTibiale').innerHTML = valeur_penteTibiale + 1;
                 geometry.verticesNeedUpdate = true;            
                 mesh = new THREE.Mesh( geometry, material ); 
                 mesh.rotation.set(-1.3,0,0); 
                scene.add(mesh);
               }
             });
             }
             else {
                alert(" la Valeur maximale est de 2° ");
             }   
            },false);

            var button_penteTibiale_moins = document.getElementById("moins_penteTibiale");
            button_penteTibiale_moins.addEventListener("click",function(){
             var valeur_penteTibiale = parseInt(document.getElementById('valeur_penteTibiale').innerHTML) ;
             console.log(valeur_penteTibiale);
             if (valeur_penteTibiale > 0) {
            scene.remove(mesh);
            console.log("button_penteTibiale_moins");
            var material = new THREE.MeshPhongMaterial({color:0xfff4c9});   
             object.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                 child.material = material;
                 geometry = new THREE.Geometry().fromBufferGeometry(child.geometry); 
              //  var valeur_varus = parseInt(document.getElementById('valeur_varus').innerHTML) ;
             //   var valeur_coupeTibiale = parseInt(document.getElementById('valeur_coupeTibiale').innerHTML) ;
             //   var  valeur_coupeSagittale = parseInt(document.getElementById('valeur_coupeSagittale').innerHTML) ;
                 coupePenteTibiale(geometry,valeur_penteTibiale-1);
                 document.getElementById('valeur_penteTibiale').innerHTML = valeur_penteTibiale-1;
                 geometry.verticesNeedUpdate = true;            
                 mesh = new THREE.Mesh( geometry, material ); 
                 mesh.rotation.set(-1.3,0,0); 
                scene.add(mesh);
               }
             });
             }
             else {
                alert(" la Valeur minimale est de 0° ");
             }   
            },false); 


             ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

             var button_embase_plus = document.getElementById("plus_embase");       
             button_embase_plus.addEventListener("click",function(){
             var valeur_embase = parseInt(document.getElementById('valeur_embase').innerHTML);
                var valeur_coupeTibiale = parseInt(document.getElementById('valeur_coupeTibiale').innerHTML) ;
                 var  valeur_coupeSagittale = parseInt(document.getElementById('valeur_coupeSagittale').innerHTML) ;
             console.log(valeur_embase);
             console.log("button_embase_plus");      
             document.getElementById('valeur_embase').innerHTML = valeur_embase + 1;
             var taille = valeur_embase+1;  
                loader3.load('img/T'+taille+'.obj',function( object3 ){  
                object3.traverse( function ( child ){           
                if ( child instanceof THREE.Mesh ) {
                   scene.remove(object2);
                   object2 = object3;
                   object2.rotation.set(3.4,4.71,-3.155);                            
                  object2.position.x = -0 -valeur_coupeSagittale
                  object2.position.y = -0.8 - valeur_coupeTibiale /// remplacer le -4 par -3 peut être un  probleme de précision
                  object2.position.z = 22 ;
                  child.material.color.setHex(0x5B5B5B);
                   scene.add(object2);
                  console.log("this is the opacity of object",child.material.opacity)
                  }
                });
              } ,onProgress,onError);                         
            },false);    

            var button_embase_moins = document.getElementById("moins_embase");       
             button_embase_moins.addEventListener("click",function(){
             var valeur_embase = parseInt(document.getElementById('valeur_embase').innerHTML);
                var valeur_coupeTibiale = parseInt(document.getElementById('valeur_coupeTibiale').innerHTML) ;
            var  valeur_coupeSagittale = parseInt(document.getElementById('valeur_coupeSagittale').innerHTML) ;
             console.log(valeur_embase);
             console.log("button_embase_moins");      
             document.getElementById('valeur_embase').innerHTML = valeur_embase-1;
             var taille = valeur_embase-1;  
                loader3.load('img/T'+taille+'.obj',function( object3 ){  
                object3.traverse( function ( child ){           
                if ( child instanceof THREE.Mesh ) {
                   scene.remove(object2);
                   object2 = object3;
                   object2.rotation.set(3.4,4.71,-3.155);                            
                   object2.position.x = -0 -valeur_coupeSagittale
                   object2.position.y = -0.8 - valeur_coupeTibiale /// remplacer le -4 par -3 peut être un  probleme de précision
                   object2.position.z = 22 ;
                   child.material.color.setHex(0x5B5B5B);
                   scene.add(object2);
                  console.log("this is the opacity of object",child.material.opacity)
                  }
                });
              } ,onProgress,onError);                         
            },false);

           } ,onProgress,onError);
		  } ,onProgress,onError);

             var button_resizeFull = document.getElementById("resize_full");
             button_resizeFull.addEventListener('click',function(){
                 window.addEventListener('resize', onWindowResize(camera,renderer), false);                
            },false);
          
}

  var save = document.getElementById("save");
  var meshsave;
   var next = document.getElementById("next");
   next.addEventListener("click",function(){
        saveValueTibialPlanification();
   },false);          

function render(){

	requestAnimationFrame(render);
	renderer.render(scene,camera);
	//console.log("x,y,z",camera.position.x,camera.position.y,camera.position.z);
	renderer_tibiale.render(scene,camera_coupeTibiale);
	renderer_sagittale.render(scene,camera_coupeSagittale);
	renderer_varus.render(scene,camera);
	renderer_pentetibiale.render(scene,camera);
	renderer_embase.render(scene,camera);
    meshsave = mesh;
  

}
  save.addEventListener('click', function(){   
               var data = exportTOSTL(meshsave); 
               console.log(meshsave); 
               console.log(data);  
               var fileName = "object_stl.stl";    
               saveDataToStl(data,fileName);

      },false);

init();
render();