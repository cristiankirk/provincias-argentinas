function play(name) {
    name = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
    const sound = new Audio('audios/' + name + '.mp3');
    sound.play();
  }

  function popAndPlay(provincia, banderaCapital = false) {
       if (banderaCapital) {
        var nombre = provincia.dataset.capital;
        var texto = '<b>Capital de ' + provincia.dataset.nombre + '</b><br><br>' + provincia.dataset.descripcion;
        play(provincia.dataset.nombre+'-capital');
       } else {
        var nombre = provincia.dataset.nombre;
        var texto = provincia.dataset.descripcion
        play(nombre);
      }

       Swal.fire({
        title: nombre,
        html: texto,
        width: 700,
        padding: "1em",
        customClass: { title: 'popup-title', htmlContainer:'popup-text' },
        color: "#716add",
        confirmButtonText: "Cerrar",
        allowOutsideClick:true,
        allowEscapeKey: true,
        showConfirmButton: false,
        backdrop: `
          rgba(0,0,123,0.4)
          left top
          no-repeat
        `,
        showClass: {
          popup: `
            animate__animated
            animate__fadeInDown
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
  }


 
  document.addEventListener('DOMContentLoaded', function () {
    const provincias = document.querySelectorAll('.provincia');
    
    provincias.forEach((provincia) => {
      let clickTimer;
      let lastTapTime = 0;
      const doubleTapThreshold = 250;
  
      provincia.addEventListener('click', (event) => {
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
          popAndPlay(provincia);
        }, 250);
      });
  
      provincia.addEventListener('dblclick', (event) => {
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
          popAndPlay(provincia, true);
        }, 250);
      });
  
      provincia.addEventListener('touchstart', (event) => {
        const currentTime = new Date().getTime();
        const tapInterval = currentTime - lastTapTime;
        
        clearTimeout(clickTimer);
  
        if (tapInterval < doubleTapThreshold && tapInterval > 0) {
          // Double tap detected
          event.preventDefault(); // Prevent other interactions
          popAndPlay(provincia, true);
        } else {
          // Single tap detected
          clickTimer = setTimeout(() => {
            popAndPlay(provincia);
          }, 250);
        }
  
        lastTapTime = currentTime;
      });
    });
  });
  
  document.addEventListener('DOMContentLoaded',function(){
        
    const mapaNombres = document.getElementById('mapa-nombres');
    const filtroNombres = document.getElementById('filtro-nombres');
    const filtroNombresCheckbox = document.getElementById('filtro-nombres-checkbox');

    mapaNombres.style.display="none";

    filtroNombres.addEventListener('click', function(){
      if (filtroNombresCheckbox.checked) {
        mapaNombres.style.display="block";
      } else {
        mapaNombres.style.display="none";
      }
    });

  });