    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        document.getElementById("info").innerText = "Seu navegador não suporta geolocalização.";
      }
    }

    function showPosition(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      document.getElementById("info").innerText = `Latitude: ${latitude}, Longitude: ${longitude}`;

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

      fetch(url, {
        headers: {
          'User-Agent': 'localizador-teste/1.0 (seu@email.com)'
        }
      })
        .then(response => response.json())
        .then(data => {
          const endereco = data.display_name || "Endereço não encontrado.";
          document.getElementById("endereco").innerText = endereco;

          document.getElementById("mapa").innerHTML = `
            <button onclick="window.open('https://www.google.com/maps?q=${latitude},${longitude}', '_blank')">
              Ver no Google Maps
            </button>
          `;
        })
        .catch(error => {
          document.getElementById("endereco").innerText = "Erro ao buscar endereço.";
          console.error("Erro ao obter o endereço:", error);
        });
    }

    function showError(error) {
      console.log(error);
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("Permissão negada.");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Localização indisponível.");
          break;
        case error.TIMEOUT:
          alert("Tempo esgotado.");
          break;
        case error.UNKNOWN_ERROR:
          alert("Erro desconhecido.");
          break;
      }
    }
