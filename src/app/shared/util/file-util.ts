
export const exportCSV = (body?: any[], fileName?: string) => {
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF'
    + body.map(e => e.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', fileName);
    document.body.appendChild(link); // Required for FF
    link.click();
    link.remove();
};
