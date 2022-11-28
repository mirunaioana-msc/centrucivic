

export const windowOpener = (url: string): void => {
  if (!/(http|https):/.test(url)) {
    url = 'https://' + url;
  }

  window.open(url, '_blank', 'noopener noreferrer');
}