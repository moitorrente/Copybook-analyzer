class Table {
    constructor(params) {
        const cols = Object.values(params).filter(x => x.show);
        this.colNames = cols;
        this.cols = [];
    }

    create() {
        this.table = document.createElement('table')
        this.table.classList.add('table', 'table-hover', 'text-center', 'tab');
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

    append(element) {
        const el = document.getElementById(element);
        el.appendChild(this.table);
    }
}