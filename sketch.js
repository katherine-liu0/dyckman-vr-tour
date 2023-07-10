// variable to hold a reference to our A-Frame world
let world;

// which image are we currently using?
var currentImage = 0;

let direction

let a, d, c, t
//arrows at the stairs
//a: placed at the main floor, clicking will bring the user to second floor 
//d: second floor - bring to main floor
//c: main floor - bring to the basement 
//t: basement - bring to main floor


function setup() {
	// no canvas needed
	noCanvas();

  //voice = new p5.Speech();
  // voice.setVoice(49);
  // console.log(voice.name);

	world = new World('VRScene');
	//world.camera.cameraEl.setAttribute('look-controls', "pointerLockEnabled: false");

 a = new Tetrahedron({
				x:-10,
				y:2,
				z:1.5,
				radius:0.6,
				rotationX:90,
				rotationZ:45,
				rotationY:10,
				red:255,
				green:255,
				blue:255,
				visible:false,
				clickFunction: function(theBox) {
								// runs 1 time whenever the cube is clicked

								// update this cube's color to something random!
								console.log('qqq')
								room.value="second"

								const changeEvent = new Event('change', {
						      bubbles: true,
						      cancelable: true,
						    });
								room.dispatchEvent(changeEvent);

								const clickEvent = new MouseEvent('click', {
								  bubbles: true,
								  cancelable: true,
								  view: window,
								});

								second9.dispatchEvent(clickEvent);

								//a.toggleVisibility()
								//console.log("a hided")
							},
							enterFunction: function(theBox) {
								// runs 1 time whenever the cursor has intersected with the cube

								theBox.setColor( 253,115,37)
							},
							leaveFunction: function(theBox) {
								// runs 1 time whenever the cursor has left the vicinity of the cube

								// make the cube normal size
								theBox.setColor( 255,255,255)
							},
	})

 d = new Tetrahedron({
				x:-10,
				y:1,
				z:1,
				radius:0.8,
				rotationX:90,
				rotationZ:135,
				rotationY:0,
				red:255,
				green:255,
				blue:255,
				visible:false,
				clickFunction: function(theBox) {
								// runs 1 time whenever the cube is clicked

								// update this cube's color to something random!
								room.value="main"

								const changeEvent = new Event('change', {
						      bubbles: true,
						      cancelable: true,
						    });
								room.dispatchEvent(changeEvent);

								const clickEvent = new MouseEvent('click', {
								  bubbles: true,
								  cancelable: true,
								  view: window,
								});

								main1.dispatchEvent(clickEvent);

								//d.toggleVisibility()
								//console.log("d hided")
							},
							enterFunction: function(theBox) {
								// runs 1 time whenever the cursor has intersected with the cube

								theBox.setColor(253,115,37)
							},
							leaveFunction: function(theBox) {
								// runs 1 time whenever the cursor has left the vicinity of the cube

								// make the cube normal size
								theBox.setColor( 255,255,255)
							},
	})

 c = new Tetrahedron({
				x:6,
				y:-3,
				z:-8,
				radius:0.8,
				rotationX:180,
				rotationZ:80,
				rotationY:100,
				red:255,
				green:255,
				blue:255,
				metalness:0,
				roughness:1,
				visible:false,
				clickFunction: function(theBox) {
								// runs 1 time whenever the cube is clicked

								// update this cube's color to something random!
								room.value="basement"

								const changeEvent = new Event('change', {
						      bubbles: true,
						      cancelable: true,
						    });
								room.dispatchEvent(changeEvent);
								console.log('11')

								const clickEvent = new MouseEvent('click', {
								  bubbles: true,
								  cancelable: true,
								  view: window,
								});

								base8.dispatchEvent(clickEvent);
								console.log('teleport to basement')
							},
							enterFunction: function(theBox) {
								// runs 1 time whenever the cursor has intersected with the cube

								console.log('hi')
								theBox.setColor( 253,115,37)
							},
							leaveFunction: function(theBox) {
								// runs 1 time whenever the cursor has left the vicinity of the cube

								// make the cube normal size
								theBox.setColor( 255,255,255)
							},
	})

	t = new Tetrahedron({
				x:8,
				y:1,
				z:8,
				radius:1.2,
				rotationX:220,
				rotationZ:120,
				rotationY:60,
				red:255,
				green:255,
				blue:255,
				visible:false,
				metalness:0,
				roughness:1,
				clickFunction: function(theBox) {
								// runs 1 time whenever the cube is clicked

								// update this cube's color to something random!
								room.value="main"

								const changeEvent = new Event('change', {
						      bubbles: true,
						      cancelable: true,
						    });
								room.dispatchEvent(changeEvent);

								const clickEvent = new MouseEvent('click', {
								  bubbles: true,
								  cancelable: true,
								  view: window,
								});

								main5.dispatchEvent(clickEvent);

								//e.toggleVisibility()
								//console.log("t hided")
							},
							enterFunction: function(theBox) {
								// runs 1 time whenever the cursor has intersected with the cube

								theBox.setColor(253,115,37)
							},
							leaveFunction: function(theBox) {
								// runs 1 time whenever the cursor has left the vicinity of the cube

								// make the cube normal size
								theBox.setColor( 255,255,255)
							},
	})

	world.add(a)
	world.add(d)
	world.add(c)
	world.add(t)

	for (let i = 0; i < spots.length; i++){
		spots[i].addEventListener('click',function(e){
			let sky = new Sky({
				asset: 'selected'
			});

			world.add(sky)
		})
	
	}


}



function normalizeUrl(url) {
  const a = document.createElement('a');
  a.href = url;
  return a.href;
}


function draw() {

	direction=world.getUserRotation()
	//console.log(direction.y, selected.src)
	if(normalizeUrl(selected.src) === normalizeUrl('images/rooms/main1.JPG')){
		for (let i=0;i<placeholder.length;i++){
			placeholder[i].classList.add('hidden')
		}
		main1_ph.classList.remove('hidden')
		main1_ph.classList.remove('fade');
	}
	else if(normalizeUrl(selected.src) === normalizeUrl('images/rooms/main2.JPG')){
		for (let i=0;i<placeholder.length;i++){
			placeholder[i].classList.add('hidden')
		}
		if(direction.y > 1.16 && direction.y < 1.85){
			main2_ph.classList.remove('hidden')
			main2_ph.classList.remove('fade');	
			v2()	
		}
	}
	else if(normalizeUrl(selected.src) === normalizeUrl('images/rooms/main3.JPG')){
		for (let i=0;i<placeholder.length;i++){
			placeholder[i].classList.add('hidden')
		}
		//console.log(main1_ph.class)
		main3_ph.classList.remove('hidden')
		main3_ph.classList.remove('fade');
	}
	else if (normalizeUrl(selected.src) === normalizeUrl('images/rooms/main4.JPG') ) {			
		//remove all introductory divs first
		for (let i=0;i<placeholder.length;i++){
			placeholder[i].classList.add('hidden')
		}
		//then show the respective div for this spot 
		if(direction.y > 0.6 && direction.y < 1.5){
			main4_ph.classList.remove('hidden')
			main4_ph.classList.remove('fade');		
			v4()	
		}

	} 

	else if (normalizeUrl(selected.src) === normalizeUrl('images/rooms/main5.JPG') ) {			
		for (let i=0;i<placeholder.length;i++){
			placeholder[i].classList.add('hidden')
		}
	} 
	else if(normalizeUrl(selected.src) === normalizeUrl('images/rooms/base6.JPG')){
		for (let i=0;i<placeholder.length;i++){
			placeholder[i].classList.add('hidden')
		}
		if(direction.y > -2.20 && direction.y < -1.34){
			base6_ph.classList.remove('hidden');
			base6_ph.classList.remove('fade');	
			v6()	
		}

	}
	else if(normalizeUrl(selected.src) === normalizeUrl('images/rooms/base7.JPG')){
		for (let i=0;i<placeholder.length;i++){
			placeholder[i].classList.add('hidden')
		}
		base7_ph.classList.remove('hidden');
		base7_ph.classList.remove('fade');
	}
	else if(normalizeUrl(selected.src) === normalizeUrl('images/rooms/base8.JPG')){
		for (let i=0;i<placeholder.length;i++){
			placeholder[i].classList.add('hidden')
		}
		if(direction.y > -1.54 && direction.y < -0.6){
			base8_ph.classList.remove('hidden');
			base8_ph.classList.remove('fade');
			if(close_img8_clicked==false){
				base8_img.classList.remove('hidden')
				base8_img.classList.remove('fade');
				v8()
			}	
		}

		else{
			close_img8_clicked=false
		}

	}
	else if(normalizeUrl(selected.src) === normalizeUrl('images/rooms/second9.JPG')){
		for (let i=0;i<placeholder.length;i++){
			placeholder[i].classList.add('hidden')
		}
		second9_ph.classList.remove('hidden');
		second9_ph.classList.remove('fade');
	}
	else if(normalizeUrl(selected.src) === normalizeUrl('images/rooms/second10.JPG')){
		//console.log(close_img_clicked)
		for (let i=0;i<placeholder.length;i++){
			placeholder[i].classList.add('hidden')
		}
		if(direction.y > -2.24 && direction.y < -1.16){
			second10_ph.classList.remove('hidden')
			second10_ph.classList.remove('fade');	
			if(close_img10_clicked==false){
				second10_img.classList.remove('hidden')
				second10_img.classList.remove('fade');
				v10()
			}

		}

		else{
			close_img10_clicked=false
			close_img8_clicked=false
		}

	}

}
