function createOutrec() {
    let outrec = [];
    tableEntries.forEach(entry => {
        if (entry.type == 'AN') outrec.push(['\n' + entry.start, entry.length, `C';'`]);
        if (entry.type == 'ZA') outrec.push(['\n' + entry.start, entry.length, `C';'`]);

        if (entry.type == 'ZD') {
            if (entry.sign) {
                const edit = createEdit(entry.sign, entry.integer, entry.decimal);
                outrec.push(['\n' + entry.start, entry.length, `${entry.type},EDIT=(${edit}),SIGNS=(+,-,,)`]);
            } else {
                if (entry.decimal) {
                    outrec.push(['\n' + entry.start, entry.integer, `C','`, entry.start + entry.integer, entry.decimal, `C';'`]);
                } else {
                    outrec.push(['\n' + entry.start, entry.length, `C';'`]);
                }
            }
        }

        if (entry.type == 'SFF') {
            if (entry.usage == 'SIGN TRAILING SEPARATE CHARACTER') {
                let out = ['\n' + entry.end, '1', entry.start, entry.integer, `C';'`];
                if (entry.decimal) out[out.length - 1] += entry.start + entry.integer, entry.decimal, `C';'`;
                outrec.push(out);
            } else {
                let out = ['\n' + entry.start, entry.integer, `C';'`];
                if (entry.decimal) out[out.length - 1] += entry.start + entry.integer, entry.decimal, `C';'`
                outrec.push(out);
            }
        }

        if (entry.type == 'PD' || entry.type == 'BI') {
            const edit = createEdit(entry.sign, entry.integer, entry.decimal);
            let out = ['\n' + entry.start, entry.length, `${entry.type},EDIT=(${edit})`];
            if (entry.sign) out[out.length - 1] += ',SIGNS=(+,-,,)';
            outrec.push(out);
        }
    });
    textOutput.value = outrec.flat().join(',').substring(1);
    return outrec.flat().join(',').substring(1);
}

function createEdit(sign, integer, decimal) {
    let edit = '';
    if (sign) edit = 'S';
    for (let i = 0; i < integer; i++) edit += 'T';
    if (decimal) {
        edit += ',';
        for (let i = 0; i < decimal; i++) edit += 'T';
    }
    return edit;
}