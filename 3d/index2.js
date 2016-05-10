var scene ;
var scene_tibia;
var camera ;
var renderer;
var renderer_femure;
var renderer_condyle;
var renderer_tibia;
var controls;
var controls_tibia;
var geometry;
var camera_tibia;
var camera_coupeFemorale;
var camera_coupeCondyle;
var mesh = null;
var mesh_tibia=null;

function init() {

	console.log("let's start");
	scene = new THREE.Scene();
  scene_tibia = new THREE.Scene();
	var scene_globale = document.getElementById("scene_globale");
	console.log(scene_globale);
	var coupe_femorale = document.getElementById("coupe_femorale");
	var coupe_condyle = document.getElementById("coupe_condyle");
  var tibia = document.getElementById("tibia");
  var valeur_coupeTibiale = getCoupeTibiale();
  var valeur_penteTibiale = getPenteTibiale();
  var valeur_varus = getVarus();
  var valeur_coupeSagittale = getCoupeSagittale();
  var valeur_embase = getEmbase();

  document.getElementById("valeur_coupeTibiale").innerHTML = valeur_coupeTibiale;
  document.getElementById("valeur_penteTibiale").innerHTML =  valeur_penteTibiale;
  console.log(tibia);

       var gui = new dat.GUI();
	   parametres = {  translatex : 0 , translatey : 0 , translatez : 0 , rotationx : 88 , rotationy : 10 , rotationz :  50 ,};
	   var tibia = gui.addFolder('Femur'); 
	   var rotatex = tibia.add(parametres,"rotationx").min(-200).max(200).step(1);	
	   var rotatey = tibia.add(parametres,"rotationy").min(-200).max(200).step(1);	
	   var rotatez = tibia.add(parametres,"rotationz").min(-200).max(200).step(1);	 
	   var translatex = tibia.add(parametres,"translatex").min(-5).max(5).step(0.01);	
	   var translatey = tibia.add(parametres,"translatey").min(-5).max(5).step(0.01);	
	   var translatez = tibia.add(parametres,"translatez").min(-5).max(5).step(0.01);
                             rotatex.onChange(function(x){

                                    object2.position.x = x;
                                    console.log("translatex",x);
                            

                                });
                                rotatey.onChange(function(y){
                                    object2.position.y = y;
                                    console.log("translatey",y);

                                });
                                rotatez.onChange(function(z){
                                    object2.position.z = z;
                                    console.log("translatez",z);

                                });
                                translatex.onChange(function(x){

                                    object2.rotation.x = x;
                                    console.log("rotatex",x);
                                    

                                });
                                translatey.onChange(function(y){
                                    object2.rotation.y = y;
                                    console.log("rotatey",y);

                                });
                                translatez.onChange(function(z){
                                    object2.rotation.z = z;
                                    console.log("rotatez",z);

                                });	 
	    gui.open();
	    //tibia.open(); 
    	camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 20000 );
    	camera.position.z = 200;
        camera.position.y = 0;
        camera.position.x = 0;

        camera_tibia = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 20000 );
        camera_tibia.position.z = 200;
        camera_tibia.position.y = 0;
        camera_tibia.position.x = 0;

        
  console.log(camera.rotation);
        camera_coupeFemorale = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 20000 );
        camera_coupeFemorale.position.z = 150;
        camera_coupeFemorale.position.y = 0;
        camera_coupeFemorale.position.x = -8;

        camera_coupeCondyle = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 20000 );
        camera_coupeCondyle.position.z = 150;
        camera_coupeCondyle.position.y = -5;
        camera_coupeCondyle.position.x = -10;
  
   
   var light = new THREE.DirectionalLight(0xF5F5F5,1);
    light.position.set(-5,69,8.6);
    var light = new THREE.DirectionalLight(0xF5F5F5,1);
    light.position.set(10,15,15);
    var light = new THREE.DirectionalLight(0xF5F5F5,1);
    light.position.set(-10,-51,-2);
    scene.add(light);
    var light = new THREE.HemisphereLight( 0xffffff, 0x080820, 1 );
    scene.add( light );

    var light2 = new THREE.DirectionalLight(0xF5F5F5,1);
    light2.position.set(-5,69,8.6);
    var light2 = new THREE.DirectionalLight(0xF5F5F5,1);
    light2.position.set(10,15,15);
    var light2 = new THREE.DirectionalLight(0xF5F5F5,1);
    light2.position.set(-10,-51,-2);
    scene_tibia.add(light2);
    var light2 = new THREE.HemisphereLight( 0xffffff, 0x080820, 1 );
    scene_tibia.add( light2 );
    //////////////////////////////////
	renderer = new THREE.WebGLRenderer();
	renderer_femure = new THREE.WebGLRenderer();
	renderer_condyle = new THREE.WebGLRenderer();	
  renderer_tibia = new THREE.WebGLRenderer(); 
	renderer.setSize(scene_globale.clientWidth , 500);
	renderer_femure.setSize(coupe_femorale.clientWidth , 200);
	renderer_condyle.setSize(coupe_condyle.clientWidth , 200);
  renderer_tibia.setSize(coupe_condyle.clientWidth , 200);
	renderer_femure.setClearColor( 0x0e99ee);
	renderer_condyle.setClearColor( 0x0e99ee );
  renderer_tibia.setClearColor( 0x0e99ee );
	renderer.setClearColor( 0x0e99ee );
	console.log(scene_globale.clientWidth);
	document.getElementById("scene_globale").appendChild(renderer.domElement);
	document.getElementById("coupe_femorale").appendChild(renderer_femure.domElement);
	document.getElementById("coupe_condyle").appendChild(renderer_condyle.domElement);
  document.getElementById("tibia").appendChild(renderer_tibia.domElement);
  var axisHelper = new THREE.AxisHelper( 100 );
  scene.add( axisHelper );
	controls = new THREE.OrbitControls( camera , renderer.domElement); 
  controls_tibia = new THREE.OrbitControls( camera_tibia , renderer_tibia.domElement); 
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


//////////////////////////////////////////
	var loader = new THREE.OBJLoader(manager);
    var loader2 = new THREE.OBJLoader(manager);
     var loader3 = new THREE.OBJLoader(manager);
     var loader4 = new THREE.OBJLoader(manager);


    //////////////////

loader.load('img/femur3.obj',function(object){  
                 
     

          if (mesh==null) {
             var material = new THREE.MeshPhongMaterial({color:0xfff4c9});
             object.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                child.material = material;
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry); 
                mesh = new THREE.Mesh( geometry, material );
                mesh.rotation.set(-1.3,0,0);
                mesh.position.y = -40;

            rotatex.onChange(function(x){

            mesh.position.x = x;
    

        });
        rotatey.onChange(function(y){
            mesh.position.y = y;

        });
        rotatez.onChange(function(z){
            mesh.position.z = z;

        });
        translatex.onChange(function(x){

            mesh.rotation.x = x;
            

        });
        translatey.onChange(function(y){
            mesh.rotation.y = y;

        });
        translatez.onChange(function(z){
            mesh.rotation.z = z;

        });
               }
            } ); 
             scene.add(mesh); 
              } 
                loader2.load("img/Condyle_GT1.obj",function(object2) {
                     object2.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                     
                          object2.rotation.set(0.4,4.72,1.73);                            
                          object2.position.x = 21; 
                          object2.position.y = -37;/// remplacer le -4 par -3 peut être un  probleme de précision
                          object2.position.z = 29 ;
                          child.material.color.setHex(0x5B5B5B);        
                          scene.add(object2);
                          rotatex.onChange(function(x){

                                    object2.position.x = x;
                                    console.log("translatex",x);
                            

                                });
                                rotatey.onChange(function(y){
                                    object2.position.y = y;
                                    console.log("translatey",y);

                                });
                                rotatez.onChange(function(z){
                                    object2.position.z = z;
                                    console.log("translatez",z);

                                });
                                translatex.onChange(function(x){

                                    object2.rotation.x = x;
                                    console.log("rotatex",x);
                                    

                                });
                                translatey.onChange(function(y){
                                    object2.rotation.y = y;
                                    console.log("rotatey",y);

                                });
                                translatez.onChange(function(z){
                                    object2.rotation.z = z;
                                    console.log("rotatez",z);

                                });  
                    
                               
              var plus_deplacer = document.getElementById("plus_deplacer");
              plus_deplacer.addEventListener("click",function(){
              var valeur_deplacer = parseInt(document.getElementById('valeur_deplacer').innerHTML) ;
              if (valeur_deplacer<4){

                          object2.position.x = 21+ valeur_deplacer+1;
                          document.getElementById('valeur_deplacer').innerHTML = valeur_deplacer+1;   
              } 

              },false);
             var moins_deplacer = document.getElementById("moins_deplacer");
              moins_deplacer.addEventListener("click",function(){
              var valeur_deplacer = parseInt(document.getElementById('valeur_deplacer').innerHTML) ;
              if (valeur_deplacer>-3){
                          object2.position.x = 21+valeur_deplacer-1;
                          document.getElementById('valeur_deplacer').innerHTML = valeur_deplacer-1;   
              } 

              },false);


        


              var plus_coupeFemorale = document.getElementById("plus_coupeFemorale");
              plus_coupeFemorale.addEventListener("click",function(){
              var valeur_coupeFemorale = parseInt(document.getElementById('valeur_coupeFemorale').innerHTML) ;

                      if(valeur_coupeFemorale<4){
                         scene.remove(mesh);
                      
                        object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {   
                            child.material = material;
                            geometry = new THREE.Geometry().fromBufferGeometry(child.geometry); 
                            coupeFemorale(geometry,valeur_coupeFemorale+1);  
                          //  var plane = new THREE.Plane(new THREE.Vector3(0, 4, 0), 0);
                            //scene.add(plane);
                            //geometry = sliceGeometry(geometry, plane);                              
                            mesh = new THREE.Mesh( geometry, material );
                            mesh.rotation.set(-1.3,0,0);
                            mesh.position.y = -40;
                           scene.add(mesh); 
                           object2.position.y = -37 + valeur_coupeFemorale+1
                       }
                     });
                      document.getElementById('valeur_coupeFemorale').innerHTML = valeur_coupeFemorale+1;  
                      } 
              

              },false);


             var moins_coupeFemorale = document.getElementById("moins_coupeFemorale");
              moins_coupeFemorale.addEventListener("click",function(){
              var valeur_coupeFemorale = parseInt(document.getElementById('valeur_coupeFemorale').innerHTML) ;
                     if(valeur_coupeFemorale>-2) {
                         scene.remove(mesh);
                    
                        object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {   
                            child.material = material;
                            geometry = new THREE.Geometry().fromBufferGeometry(child.geometry); 
                            coupeFemorale(geometry,valeur_coupeFemorale-1);                                
                            mesh = new THREE.Mesh( geometry, material );
                             mesh.rotation.set(-1.3,0,0);
                            mesh.position.y = -40;
                           scene.add(mesh); 
                           object2.position.y = -37 + valeur_coupeFemorale-1
                       }
                     });
                      document.getElementById('valeur_coupeFemorale').innerHTML = valeur_coupeFemorale-1;   
                }

              },false);
               }
                     });
              },onProgress,onError);
  } ,onProgress,onError);
        loader3.load('img/tibia.obj',function(object3){  
                   console.log("la");
             var material = new THREE.MeshPhongMaterial({color:0xfff4c9});
             object3.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                child.material = material;
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry); 
                coupeTibiale(geometry,valeur_coupeTibiale,valeur_coupeSagittale,valeur_varus,valeur_penteTibiale);
                mesh_tibia = new THREE.Mesh( geometry, material );
                mesh_tibia.rotation.set(-1.3,0,0);
               scene_tibia.add(mesh_tibia);    
             }                   
           } ); 

               loader4.load('img/T'+valeur_embase+'.obj',function( object4 ){  
                object4.traverse( function ( child ){
                if ( child instanceof THREE.Mesh ) {

                  object4.rotation.set(3.4,4.71,-3.155);                            
                  object4.position.x = -0 -valeur_coupeSagittale;
                  object4.position.y = -0.8 -valeur_coupeTibiale;
                  object4.position.z = 22 ;
                  child.material.color.setHex(0x5B5B5B);
                  scene_tibia.add(object4);
                  
                  console.log("this is the opacity of object",child.material.opacity)
                  }
                } );
                } ,onProgress,onError);
          } ,onProgress,onError);


}

  var save = document.getElementById("save");
  var meshsave;
  var next = document.getElementById("next");
   next.addEventListener("click",function(){
    console.log("saveExecute");
        saveValueFemurPlanification();
   },false);          

             

function render(){

	requestAnimationFrame(render);
	renderer.render(scene,camera);
	//console.log("x,y,z",camera.position.x,camera.position.y,camera.position.z);
	renderer_femure.render(scene,camera_coupeFemorale);
	renderer_condyle.render(scene,camera_coupeCondyle);
  renderer_tibia.render(scene_tibia,camera_tibia);
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