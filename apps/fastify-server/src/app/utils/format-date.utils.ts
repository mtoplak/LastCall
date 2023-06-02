export const formatDate = (date: Date): string => {
    const options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    } as Intl.DateTimeFormatOptions;
    return date.toLocaleDateString(undefined, options);
};