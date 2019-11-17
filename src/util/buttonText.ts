import buttontexts from '../config/bottontext.json';

/**
 * this function returns a string for specific buttons
 * that comes from the json file in the config folder
 * so the text of button can be changed by modifying the json file
 * */
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
    case 'size':
      return buttontexts.size;
    case 'aggr':
      return buttontexts.aggr;
    case 'tooltips':
      return buttontexts.tooltips;
    case 'home':
      return buttontexts.home;
    case 'about':
      return buttontexts.about;
    case 'statsentries':
      return buttontexts.statsentries;
    case 'statstime':
      return buttontexts.statstime;
    case 'linktosource':
      return buttontexts.linktosource;
    default:
      return text;
  }
};
