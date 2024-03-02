      // Lógica para hacer una solicitud a la API y mostrar los postres en la tabla
      async function fetchPostres() {
        const respuesta = await fetch('../postres');
        const data = await respuesta.json();
  
        const postresTable = document.getElementById('postresT').getElementsByTagName('tbody')[0];
  
        data.forEach(postre => {
          const row = postresTable.insertRow(-1);
          const cell1 = row.insertCell(0);
          const cell2 = row.insertCell(1);
          const cell3 = row.insertCell(2);
          const cell4 = row.insertCell(3);
          const cell5 = row.insertCell(4);
          const cell6 = row.insertCell(5);
          const cell7 = row.insertCell(6);
  
          cell1.textContent = postre.nombrePostre;
          cell2.textContent = postre.tipo;
          cell3.textContent = postre.porciones;
          cell4.textContent = postre.tiempo;
          cell5.textContent = postre.ing_liq;
          cell6.textContent = postre.ing_sec;
          cell7.textContent = postre.descripcion;
        });
      }
  
      fetchPostres();