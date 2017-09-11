window.onload = function(){
	var btn = document.getElementById('validar');
		btn.addEventListener('click', validar, false);
	var url = document.getElementById('url');
	var comments = document.getElementById('comments');	
	var statusComments = false;
	var statusCss = false;
	var statusHtml = false;
	var statusJs = false;
}

function validar(event){
	event.preventDefault();
	var load = document.getElementById('load');
	load.style.display = 'block';
	var url = document.getElementById('url');
	var comments = document.getElementById('comments');
	var css = document.getElementById('css');
	var html = document.getElementById('html');
	var js = document.getElementById('js');
	var app = document.getElementById('app');
	app.innerHTML = "";
	
	if(comments.checked === true){
		var data = new FormData();
		data.append('url',url.value);
		fetch('http://localhost:5000/comments',{
			method: 'POST',
			header:{
				contentType: "application/json"
			},
			body: data
		})
		.then(res => res.json())
		.then(response => {
			com(response);
		});
	};

	if(css.checked === true){
		var data = new FormData();
		data.append('url',url.value);
		fetch('http://localhost:5000/css',{
			method: 'POST',
			header:{
				contentType: "application/json"
			},
			body: data
		})
		.then(res => res.json())
		.then(response => {
			cssResponse(response);
		});
	};

	if(html.checked === true){
		var data = new FormData();
		data.append('url',url.value);
		fetch('http://localhost:5000/html',{
			method: 'POST',
			header:{
				contentType: "application/json"
			},
			body: data
		})
		.then(res => res.json())
		.then(response => {
			htmlResponse(response);
		});
	};
	setTimeout(function(){load.style.display = 'none';},7000);
};

function htmlResponse(response){
	let total = response.data.messages.length;
	let state = false;

	switch(total){
		case 0:
			state = true;
			break;
		default:
			break;
	}
	var app = document.getElementById('app');
	let a = document.createElement('div');
		a.setAttribute('class','col-md-12');
	let tmp = `${response.data.messages.map(item => `<code><b>Tipo:</b> ${item.type}<br/><b>Extract:</b> ${item.extract}<br/><b>Mensaje:</b><br/> <input style="width:100%" class="input" disabled value="${item.message}"/></code>`).join('')}`;
	let main = `Total de errores: ${total}`;
	let main2 = `<div class="table">
					<div class="rown header ${state ? 'green' : 'blue'}">
				      <div class="cell">
				        Validacion de Comentarios:
				      </div>
				    </div>
				    <div class="rown header ${state ? 'green' : 'blue'}">
				      <div class="cell text-right">
				        ${main}
				      </div>
				    </div>
				    <div class="rown">
				      <div class="cell">
				        ${state ? `<h4>Felicitaciones!!, no se encontraron mensajes en tu sitio</h4>` : tmp}
				      </div>
				    </div>
				  </div>`;
	a.innerHTML = main2;
	app.appendChild(a);
};

function com(response){
	let total = response.total;
	let state = false;

	switch(total){
		case 0:
			state = true;
			break;
		default:
			break;
	}
	var app = document.getElementById('app');
	let a = document.createElement('div');
		a.setAttribute('class','col-md-12');
	let tmp = `${response.errores.map(item => `<code>Comentario detectado en la linea: ${item.line} </i><br/> <input style="width:100%" class="input" disabled value="${item.item}"/></code>`).join('')}`;
	let main = `Total de errores: ${total}`;
	let main2 = `<div class="table">
					<div class="rown header ${state ? 'green' : ''}">
				      <div class="cell">
				        Validacion de Comentarios:
				      </div>
				    </div>
				    <div class="rown header ${state ? 'green' : ''}">
				      <div class="cell text-right">
				        ${main}
				      </div>
				    </div>
				    <div class="rown">
				      <div class="cell">
				        ${state ? `<h4>Felicitaciones!!, no se encontraron comentarios en tu sitio</h4>` : tmp}
				      </div>
				    </div>
				  </div>`;
	a.innerHTML = main2;
	app.appendChild(a);
};

function cssResponse(response){
	var app = document.getElementById('app');
	let totalError = response.data.errors.length;
	let totalWarnings = response.data.warnings.length;
	let state = false;
	let state2 = false;

	if(totalError === 0 && totalWarnings === 0){
		state = true;
		state2 = true;
	};

	
	let a = document.createElement('div');
		a.setAttribute('class','col-md-12');
	let tmp = `${response.data.errors.map(item => `<code><b>Linea:</b> ${item.line}<br/><b> Tipo de error</b>: ${item.errorType}<br/><b> Contexto:</b> ${item.context}<br/><b> URL:</b> ${item.uri}<br/><b> Error:</b><br/> <input style="width:100%" class="input" disabled value="${item.message}"/></code>`).join('')}`;
	let main = `Total de errores: ${totalError}`;
	let main2 = `<div class="table">
					<div class="rown header ${state ? 'green' : ''}">
				      <div class="cell">
				        Validacion de CSS:
				      </div>
				    </div>
				    <div class="rown header ${state ? 'green' : ''}">
				      <div class="cell text-right">
				        ${main}
				      </div>
				    </div>
				    <div class="rown">
				    	<div class="cell">
				    		${state ? `<h4>Felicitaciones!!, no se encontraron errores en tu sitio</h4>` : tmp}
				    	</div>
				    	
				    </div>
				  </div>`;
	a.innerHTML = main2;
	app.appendChild(a);

	let b = document.createElement('div');
		b.setAttribute('class','col-md-12');
	let tmp2 = `${response.data.warnings.map(item => `<code><b>Linea:</b> ${item.line}<br/><b> Nivel de gravedad</b>: ${item.level}<br/><b> Tipo de alerta:</b> ${item.type}<br/><b> URL:</b> ${item.uri}<br/><b> Error:</b><br/> <input style="width:100%" class="input" disabled value="${item.message}"/></code>`).join('')}`;
	let main3 = `Total de alertas: ${totalWarnings}`;
	let main4 = `<div class="table">
					<div class="rown header ${state2 ? 'green' : 'yellow'}">
				      <div class="cell">
				        Alertas de CSS:
				      </div>
				    </div>
				    <div class="rown header ${state2 ? 'green' : 'yellow'}">
				      <div class="cell text-right">
				        ${main3}
				      </div>
				    </div>
				    <div class="rown">
				    	<div class="cell">
				    		${state2 ? `<h4>Felicitaciones!!, no se encontraron errores en tu sitio</h4>` : tmp2}
				    	</div>
				    	
				    </div>
				  </div>`;
	b.innerHTML = main4;
	app.appendChild(b);
}
