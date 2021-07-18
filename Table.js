class Table {
    constructor(params) {
        const cols = Object.values(params).filter(x => x.show);
        this.colNames = cols;
        this.cols = [];
    }

    createColumnSelector(params){
        const cols = Object.entries(params);
        const parent = document.createElement('div');
        cols.forEach(col => {
            const label = document.createElement('label');
            label.classList.add('dropdown-item', 'dropdown-item-marker');

            const input = document.createElement('input');
            input.classList.add('form-check-input', 'mx-2');
            input.type = 'checkbox';
            input.id = col[1].column;
            if(col[1].show) input.checked = 'checked'

            input.addEventListener('change', () => {
                config.tabla[col[0]].show = input.checked;
                updateURL();
                generateTable();
                process();
            });

            const span = document.createElement('span');
            span.innerHTML = col[1].name;

            label.appendChild(input);
            label.appendChild(span);
            parent.appendChild(label);
        });

        document.getElementById('search-table-group').classList.remove('hide');

        document.getElementById('column-show').innerHTML = '';
        document.getElementById('column-show').appendChild(parent);
    }

    create() {
        const theme = document.getElementById('table-theme').value;
        this.table = document.createElement('table')
        this.table.classList.add('table', 'table-hover', 'text-center', 'tab', theme);
        this.thead = document.createElement('thead');
        this.tr = document.createElement('tr');

        this.tbody = document.createElement('tbody');
        this.tbody.setAttribute('id', 'table-body');

        this.colNames.forEach(element => {
            let th = document.createElement('th');
            th.setAttribute('scope', 'col');
            th.innerHTML = element.name;
            this.tr.appendChild(th);
        });

        this.thead.appendChild(this.tr);
        this.table.appendChild(this.thead);
        this.table.appendChild(this.tbody);
    }

    changeTheme(){
        const theme = document.getElementById('table-theme').value;
        this.table.classList = '';
        this.table.classList.add('table', 'table-hover', 'text-center', 'tab', theme);
    }

    append(element) {
        const el = document.getElementById(element);
        el.appendChild(this.table);
    }
}