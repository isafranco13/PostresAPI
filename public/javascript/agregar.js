document.getElementById('postreForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita la recarga de la página al enviar el formulario

    // Toma los datos del formulario
    const nombrePostre = document.querySelector('input[name="nombrePostre"]').value;
    const tipo = document.querySelector('select').value;
    const porciones = document.querySelector('input[name="porciones"]').value;
    const tiempo = document.querySelector('input[name="tiempo"]').value;
    const ingSec = document.querySelector('input[name="ing_sec"]').value;
    const ingLiq = document.querySelector('input[name="ing_liq"]').value;
    const descripcion = document.querySelector('input[name="descripcion"]').value;

    const nuevoPostre = {
       nombrePostre,
       tipo,
       porciones,
       tiempo,
       ing_sec: ingSec,
       ing_liq: ingLiq,
       descripcion,
    };

    fetch('/postres', {
       method: 'POST',
       headers: {
          'Content-Type': 'application/json',
       },
       body: JSON.stringify(nuevoPostre),
    })
    //Se hace el envio de las respuestas del formulario en formato JSON
    
    .then(response => response.json())
    .then(data => {
       // Maneja la respuesta de la API
       console.log('Postre registrado:', data);
       //Borrar el registro del formulario y recargar la página
       document.getElementById('postreForm').reset();
       setTimeout(() => {
           location.reload();
       }, 1000);
    })
    .catch(error => {
       console.error('Error al registrar el postre:', error);
    });
 });

//Borrar todo el registro del formulario cuando se da click en borrar
 function borrarRegistros() {
    document.getElementById('postreForm').reset();
    
}