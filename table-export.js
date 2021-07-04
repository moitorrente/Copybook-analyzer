function createMDTable(rows) {
    let header = '';
    let separator = '';

    if (config.tabla.nivel.show) {
        header += '| Nivel '
        separator += '|-';
    }
    if (config.tabla.profundidad.show) {
        header += '| Profundidad '
        separator += '|-';
    }
    if (config.tabla.nombre.show) {
        header += '| Nombre ';
        separator += '|--------'
    }
    if (config.tabla.tipo.show) {
        header += '| Tipo ';
        separator += '|------';
    }
    if (config.tabla.picture.show) {
        header += '| Picture ';
        separator += '|---------';
    }
    if (config.tabla.modificador.show) {
        header += '| Modificador ';
        separator += '|-------------';
    }
    if (config.tabla.inicio.show) {
        header += '| Inicio ';
        separator += '|--------';
    }
    if (config.tabla.longitud.show) {
        header += '| Longitud ';
        separator += '|----------';
    }
    if (config.tabla.fin.show) {
        header += '| Fin ';
        separator += '|-----';
    }

    if (header) header += '|\r\n';
    if (separator) separator += '|\r\n';

    const lines = rows.map(row => {
        let line = '';
        if (config.tabla.nivel.show) line += `${exists(row.level)}|`;
        if (config.tabla.profundidad.show) line += `${exists(row.depth)}|`;
        if (config.tabla.nombre.show) line += `${exists(row.name)}|`;
        if (config.tabla.tipo.show) line += `${exists(row.type)}|`;
        if (config.tabla.picture.show) line += `${exists(row.pic)}|`;
        if (config.tabla.modificador.show) line += `${exists(row.usage)}|`;
        if (config.tabla.inicio.show) line += `${exists(row.start)}|`;
        if (config.tabla.longitud.show) line += `${exists(row.length)}|`;
        if (config.tabla.fin.show) line += `${exists(row.end)}|`;
        if (line) line += '\r\n';
        return line;
    });

    const table = header + separator + lines.join('');
    return table;
}

function createCSVTable(rows) {
    let header = '';
    if (config.tabla.nivel.show) header += 'Nivel;';
    if (config.tabla.profundidad.show) header += `Profundidad;`;
    if (config.tabla.nombre.show) header += `Nombre;`;
    if (config.tabla.tipo.show) header += `Tipo;`;
    if (config.tabla.picture.show) header += `Picture;`;
    if (config.tabla.modificador.show) header += `Modificador;`;
    if (config.tabla.inicio.show) header += `Inicio;`;
    if (config.tabla.longitud.show) header += `Longitud;`;
    if (config.tabla.fin.show) header += `Fin;`;
    if (header) header += '\r\n';

    let lines = rows.map(row => {
        let line = '';
        if (config.tabla.nivel.show) line += `${exists(row.level)};`;
        if (config.tabla.profundidad.show) line += `${exists(row.depth)};`;
        if (config.tabla.nombre.show) line += `${exists(row.name)};`;
        if (config.tabla.tipo.show) line += `${exists(row.type)};`;
        if (config.tabla.picture.show) line += `${exists(row.pic)};`;
        if (config.tabla.modificador.show) line += `${exists(row.usage)};`;
        if (config.tabla.inicio.show) line += `${exists(row.start)};`;
        if (config.tabla.longitud.show) line += `${exists(row.length)};`;
        if (config.tabla.fin.show) line += `${exists(row.end)};`;
        if (line) line += '\r\n';
        return line;
    });

    const table = header + lines.join('');
    return table;
}

function createHTMLTable(table) {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Copy</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.min.js"
        integrity="sha384-nsg8ua9HAw1y0W1btsyWgBklPnCUAFLuTMS2G72MMONqmOymq585AcH49TLBQObG"
        crossorigin="anonymous"></script>
        <style>
        .button:hover{
            cursor: pointer;
            overflow: visible;
            color: darkgreen;
          }
        </style>
    </head>
    <body>
        <div class="container-fluid col-md-10">  
        ${table}
        </div>
    </body>
    </html>`;

    return html;
}

function exists(property) {
    property == undefined ? property = '' : property;
    return property;
}

function normalizedCopy(rows) {
    const lines = rows.map(row => {
        let line = '';
        for (let i = 1; i < row.depth; i++) line += '   ';
        line += `${row.level} ${row.name}`;
        if (row.pic) {
            const len = 24 - line.length;
            for (let i = 0; i < len; i++) {
                line += ' ';
            }
            line += ` PIC ${row.pic}`;
        }
        row.usage ? line += ` ${row.usage}` : false;
        row.occurs > 0 ? line += ` OCCURS ${row.occurs} TIMES` : false;
        line.charAt(line.length - 1) == '.' ? false : line += `.`;
        line += '\r\n';
        return line;
    });

    return lines.join('');
};