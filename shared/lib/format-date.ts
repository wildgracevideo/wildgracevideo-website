export function formatDate(dateString: string): string {
    try {
        const gmtDate = new Date(dateString);
        const timezoneOffset = gmtDate.getTimezoneOffset();
        const localDate = new Date(gmtDate.getTime() - timezoneOffset * 60000);
        return new Intl.DateTimeFormat(undefined, {
            timeStyle: 'short',
            dateStyle: 'medium',
        }).format(localDate);
    } catch (e: unknown) {
        console.error('Failed to parse date.', e);
        return dateString;
    }
}
