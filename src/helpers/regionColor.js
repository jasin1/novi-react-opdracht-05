function regionColor(region) {
    let className = '';

    switch (region) {
        case 'Africa':
            className = 'blue-text'
            break;
        case 'Americas':
            className = 'green-text'
            break;
        case 'Asia':
            className = 'red-text'
            break;
        case 'Europe':
            className = 'yellow-text'
            break;
        case 'Oceania':
            className = 'purple-text'
            break;

    }

    return className;

}

export default regionColor;

