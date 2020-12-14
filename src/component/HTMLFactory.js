export class HTMLUtil {
    static makeTag = ({ tag, id, classe, placeholder, innerHTML, type, value, border }) => {
        let element = document.createElement(tag);

        if (id) element.id = id;
        if (classe) element.setAttribute("class", classe);
        if (placeholder) element.placeholder = placeholder;
        if (innerHTML) element.innerHTML = innerHTML;
        if (type) element.type = type;
        if (value) element.value = value;
        if (border) element.border = border;

        return element;
    };
}
