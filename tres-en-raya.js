document.addEventListener('DOMContentLoaded', () => {
    let tablero = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];

    const casillas = document.querySelectorAll('.casilla');

    casillas.forEach(casilla => {
        casilla.addEventListener('click', () => {
            const [row, col] = casilla.dataset.pos.split(',').map(Number);
            if (tablero[row][col] === ' ') {
                tablero[row][col] = 'O';
                casilla.textContent = 'O';
                if (hayGanador(tablero, 'O')) {
                    setTimeout(() => {
                        alert('¡Gana el jugador!');
                        reiniciarJuego();
                    }, 100);
                } else {
                    const mejorMovimiento = mejorJugada(tablero);
                    if (mejorMovimiento) {
                        tablero[mejorMovimiento[0]][mejorMovimiento[1]] = 'X';
                        document.querySelector(`.casilla[data-pos="${mejorMovimiento[0]},${mejorMovimiento[1]}"]`).textContent = 'X';
                        if (hayGanador(tablero, 'X')) {
                            setTimeout(() => {
                                alert('¡Gana la IA!');
                                reiniciarJuego();
                            }, 100);
                        } else if (esEmpate(tablero)) {
                            setTimeout(() => {
                                alert('¡Es un empate!');
                                reiniciarJuego();
                            }, 100);
                        }
                    } else if (esEmpate(tablero)) {
                        setTimeout(() => {
                            alert('¡Es un empate!');
                            reiniciarJuego();
                        }, 100);
                    }
                }
            }
        });
    });

    function mejorJugada(tablero) {
        const centro = [1, 1];
        if (tablero[centro[0]][centro[1]] === ' ') {
            return centro;
        }

        function contarLineasPosibles(tablero, jugador) {
            let lineasPosibles = 0;
            for (let i = 0; i < 3; i++) {
                if (tablero[i].every(casilla => casilla === jugador || casilla === ' ')) {
                    lineasPosibles++;
                }
                if ([tablero[0][i], tablero[1][i], tablero[2][i]].every(casilla => casilla === jugador || casilla === ' ')) {
                    lineasPosibles++;
                }
            }
            if ([tablero[0][0], tablero[1][1], tablero[2][2]].every(casilla => casilla === jugador || casilla === ' ')) {
                lineasPosibles++;
            }
            if ([tablero[0][2], tablero[1][1], tablero[2][0]].every(casilla => casilla === jugador || casilla === ' ')) {
                lineasPosibles++;
            }
            return lineasPosibles;
        }

        function completarVictoria(tablero, jugador) {
            for (let i = 0; i < 3; i++) {
                if (tablero[i].filter(casilla => casilla === jugador).length === 2 && tablero[i].includes(' ')) {
                    return [i, tablero[i].indexOf(' ')];
                }
                const columna = [tablero[0][i], tablero[1][i], tablero[2][i]];
                if (columna.filter(casilla => casilla === jugador).length === 2 && columna.includes(' ')) {
                    return [columna.indexOf(' '), i];
                }
            }
            const diagonal1 = [tablero[0][0], tablero[1][1], tablero[2][2]];
            if (diagonal1.filter(casilla => casilla === jugador).length === 2 && diagonal1.includes(' ')) {
                return [diagonal1.indexOf(' '), diagonal1.indexOf(' ')];
            }
            const diagonal2 = [tablero[0][2], tablero[1][1], tablero[2][0]];
            if (diagonal2.filter(casilla => casilla === jugador).length === 2 && diagonal2.includes(' ')) {
                return [diagonal2.indexOf(' '), 2 - diagonal2.indexOf(' ')];
            }
            return null;
        }

        const jugadaGanar = completarVictoria(tablero, 'X');
        if (jugadaGanar) {
            return jugadaGanar;
        }

        const jugadaBloqueo = completarVictoria(tablero, 'O');
        if (jugadaBloqueo) {
            return jugadaBloqueo;
        }

        let mejorJugada = null;
        let masLineasPotenciales = -Infinity;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (tablero[i][j] === ' ') {
                    tablero[i][j] = 'X';
                    const lineasPotenciales = contarLineasPosibles(tablero, 'X');
                    tablero[i][j] = ' ';

                    if (lineasPotenciales > masLineasPotenciales) {
                        masLineasPotenciales = lineasPotenciales;
                        mejorJugada = [i, j];
                    }
                }
            }
        }

        return mejorJugada;
    }

    function hayGanador(tablero, jugador) {
        for (let i = 0; i < 3; i++) {
            if (tablero[i].every(casilla => casilla === jugador)) {
                return true;
            }
            if ([tablero[0][i], tablero[1][i], tablero[2][i]].every(casilla => casilla === jugador)) {
                return true;
            }
        }
        if ([tablero[0][0], tablero[1][1], tablero[2][2]].every(casilla => casilla === jugador)) {
            return true;
        }
        if ([tablero[0][2], tablero[1][1], tablero[2][0]].every(casilla => casilla === jugador)) {
            return true;
        }
        return false;
    }

    function esEmpate(tablero) {
        return tablero.flat().every(casilla => casilla !== ' ');
    }

    function reiniciarJuego() {
        tablero = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
        casillas.forEach(casilla => {
            casilla.textContent = '';
        });
    }
});
