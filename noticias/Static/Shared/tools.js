'use strict';

export function iso8601toDate(date) {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7) - 1;
    const day = date.slice(8, 10);
    const hour = date.slice(11, 13);
    const minute = date.slice(14, 16);
    const second = date.slice(17, 19);
    const millisecond = date.slice(20, 23);
    return new Date(year, month, day, hour, minute, second, millisecond);
}

export function pad(number, length, padding) {
    padding = padding || '0';
    return (padding.repeat(length) + number).slice(number.toString().length);
}

export function dateToShortFormat(date) {
    return `${pad(date.getDate(), 2)}/${pad(date.getMonth() + 1, 2)}/${date.getFullYear()}`;
}

export function daysInMonth(month) {
    const y = Math.trunc(month / 100);
    const m = month % 100;
    return (new Date(y, m + 1, 0)).getDate();
}

export function separarConComas(n) {
    let cadenaNumero = n.toString();
    let signo = '';
    if (['-', '+'].includes(cadenaNumero[0])) {
        signo = cadenaNumero[0];
        cadenaNumero = cadenaNumero.slice(1);
    }
    const partidas = cadenaNumero.split('.');
    const enteros = partidas[0];
    const decimales = partidas[1] || '';
    const agregarComas = numero => numero
        .split('')
        .reverse()
        .reduce((acumulador, digito, indice) =>
            indice % 3 == 0 ?
            acumulador.concat([[ digito ]]) :
            acumulador
                .slice(0, acumulador.length - 1)
                .concat([ acumulador[acumulador.length - 1].concat([ digito ]) ]), [])
        .map(a => a.reverse().join(''))
        .reverse()
        .join(',');
    return signo + agregarComas(enteros) + (decimales ? '.' : '') + decimales;
}

export function moneda(numero, simbolo) {
    simbolo = simbolo || '$';
    const n = separarConComas(parseFloat(numero).toFixed(2));
    let signo = '';
    let numeroSinSigno = n;
    if (['-', '+'].includes(n[0])) {
        signo = n[0];
        numeroSinSigno = numeroSinSigno.slice(1);
    }
    return signo + simbolo + numeroSinSigno;
}
