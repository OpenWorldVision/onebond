function getUrl(url: string, refAddress: string) {
    if (!refAddress) {
        return url;
    }
    return `${url}/?r=${refAddress}`;
}

export default getUrl;
