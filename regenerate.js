levelCol.addEventListener('change', () => {
    config.tabla.nivel.show = levelCol.checked;
    generateTable();
    process();
});

depthCol.addEventListener('change', () => {
    config.tabla.profundidad.show = depthCol.checked;
    generateTable();
    process();
});
nameCol.addEventListener('change', () => {
    config.tabla.nombre.show = nameCol.checked;
    generateTable();
    process();
});
typeCol.addEventListener('change', () => {
    config.tabla.tipo.show = typeCol.checked;
    generateTable();
    process();
});
pictureCol.addEventListener('change', () => {
    config.tabla.picture.show = pictureCol.checked;
    generateTable();
    process();
});
modifierCol.addEventListener('change', () => {
    config.tabla.modificador.show = modifierCol.checked;
    generateTable();
    process();
});
startCol.addEventListener('change', () => {
    config.tabla.inicio.show = startCol.checked;
    generateTable();
    process();
});
lengthCol.addEventListener('change', () => {
    config.tabla.longitud.show = lengthCol.checked;
    generateTable();
    process();
});
endCol.addEventListener('change', () => {
    config.tabla.fin.show = endCol.checked;
    generateTable();
    process();
});
validationCol.addEventListener('change', () => {
    config.tabla.validacion.show = validationCol.checked;
    generateTable();
    process();
});
