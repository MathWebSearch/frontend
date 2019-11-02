import buttontexts from '../config/bottontext.json';

export const getButtonText = (text: string) => {
  switch (text.replace(' ', '').toLowerCase()) {
    case 'search':
      return buttontexts.search;
    case 'goup':
      return buttontexts.goup;
    case 'godown':
      return buttontexts.godown;
    case 'openall':
      return buttontexts.openall;
    case 'closeall':
      return buttontexts.closeall;
    case 'examples':
      return buttontexts.examples;
    case 'symbols':
      return buttontexts.symbols;
    case 'showmore':
      return buttontexts.showmore;
    default:
      return text;
  }
};
