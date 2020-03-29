
export const dateFormatFixer = (date) => {
    const parts = date.split('/');
    return new Date(parts[1], parts[0]);
}

export const sortByAuthor = (a, b) => {
    const nameA = a.author.toUpperCase(); // ignore upper and lowercase
    const nameB = b.author.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
}

export const sortByNoOfPages = (a, b) => { 
    return a.pages - b.pages; 
}

export const sortByReleaseDate = (a, b) => {
    a = new Date(dateFormatFixer(a.releaseDate));
    b = new Date(dateFormatFixer(b.releaseDate));
    return a > b ? -1 : a < b ? 1 : 0;
}
