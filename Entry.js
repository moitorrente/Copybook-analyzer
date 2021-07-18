class Entry {
    constructor(depth, level, name, type, pic, start, end, length, usage, integer, decimal, sign, isPic, isOccurs, occurs, insideOccurs, value) {
        this.depth = depth;
        this.level = level;
        this.name = name;
        pic ? this.pic = pic : '';
        start ? this.start = start : '';
        end ? this.end = end : '';
        length ? this.length = length : '';
        type ? this.type = type : '';
        usage ? this.usage = usage : '';
        integer ? this.integer = integer : '';
        decimal ? this.decimal = decimal : '';
        sign ? this.sign = sign : '';
        isPic ? this.isPic = isPic : '';
        isOccurs ? this.isOccurs = isOccurs : '';
        occurs ? this.occurs = occurs : '';
        insideOccurs ? this.insideOccurs = insideOccurs : '';
        value ? this.value = value : '';
    }
}