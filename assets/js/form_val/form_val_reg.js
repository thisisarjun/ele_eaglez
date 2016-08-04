	document.forms['formed'].addEventListener("submit",function(event){
		var formobj = document.forms['formed'];
		var formele = formobj.elements;
		for(var i =0; i<formele.length;i++) {
			if(formele[i].value=="") {
				formele[i].style.border= '1px solid red';
				event.preventDefault();
			}
			else {
				formele[i].style.border = '1px solid #72c02c'
			}
		}
	});
