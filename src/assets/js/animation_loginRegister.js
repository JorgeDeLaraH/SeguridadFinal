var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // Establecer el tamaño del lienzo al tamaño de la ventana
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var lines = [];
    var trianglesCreated = false; // Bandera para controlar la creación de triángulos

    function createLine() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() * 2 - 1) * 2, // Velocidad constante en ambas direcciones
        dy: (Math.random() * 2 - 1) * 2, // Velocidad constante en ambas direcciones
        size: Math.random() * 20 + 10, // Tamaño inicial del triángulo
        rotation: Math.random() * Math.PI * 2, // Rotación inicial
        rotationSpeed: Math.random() * 0.1 - 0.05, // Velocidad de rotación
        trail: [], // Estela de la línea
        trailMaxLength: 200 // Longitud máxima de la estela
      };
    }

    function createLines() {
      // Crear las líneas iniciales solo si aún no se han creado
      if (!trianglesCreated) {
        for (var i = 0; i < 20; i++) {
          lines.push(createLine());
        }
        trianglesCreated = true;
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dibujar y actualizar cada línea
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];

        // Guardar posición actual en la estela
        line.trail.push({ x: line.x, y: line.y });

        // Limitar la longitud de la estela
        if (line.trail.length > line.trailMaxLength+1500) {
          line.trail.shift();
        }

        // Dibujar estela
        ctx.strokeStyle = "rgba(0, 0, 0, 0.05)";
        ctx.beginPath();
        for (var j = 0; j < line.trail.length - 1; j++) {
          ctx.moveTo(line.trail[j].x, line.trail[j].y);
          ctx.lineTo(line.trail[j + 1].x, line.trail[j + 1].y);
        }
        ctx.stroke();

        // Dibujar y actualizar el triángulo
        ctx.save();
        ctx.translate(line.x, line.y);
        ctx.rotate(line.rotation);
        ctx.globalAlpha = 0.5; // Opacidad constante
        ctx.beginPath();
        ctx.moveTo(0, -line.size / 2);
        ctx.lineTo(line.size / 2, line.size / 2);
        ctx.lineTo(-line.size / 2, line.size / 2);
        ctx.closePath();
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.restore();

        // Actualizar propiedades
        line.x += line.dx;
        line.y += line.dy;
        line.rotation += line.rotationSpeed;

        // Verificar límites del lienzo y cambiar dirección si es necesario
        if (line.x < 0 || line.x > canvas.width) {
          line.dx = -line.dx; // Invertir dirección en el eje x
        }
        if (line.y < 0 || line.y > canvas.height) {
          line.dy = -line.dy; // Invertir dirección en el eje y
        }
      }

      requestAnimationFrame(animate);
    }

    // Crear los triángulos una vez cargada la pantalla
    window.addEventListener('load', function() {
      createLines();
      animate();
    });

    // Redimensionar el lienzo cuando cambia el tamaño de la ventana
    window.addEventListener('resize', function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });