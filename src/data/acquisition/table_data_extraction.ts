import { winter, trad, sport, boulder } from './raw_tables.js';

type crag = {
  aspect: String;
  rockType: String;
  long: String;
  lat: String;
  name: String;
  numStaredClimbs: String;
};

const regexs = {
  aspect: /Faces:<\/strong> <small>(.*)<\/small><br>/g,
  rockType: /Rock:<\/strong><br><small>(.*)<\/small>/g,
  long: /data-osx="([-\.\d]+)"/g,
  lat: /data-osy="([-\.\d]+)"/g,
  name: /href=".*">(.*)<\/a><br><span class="text-muted small"><\/span>/g,
  numStaredClimbs:
    /Routes: <\/strong><span class="text-break">(\d+) \(\d+ total\)<\/span>/g,
};

const regexKeys = Object.keys(regexs);

const trArray1: string[] = boulder.html1.split('<tr ');
const trArray2: string[] = boulder.html2.split('<tr ');
const trArray3: string[] = boulder.html3.split('<tr ');

const trArray = [...trArray1, ...trArray2, ...trArray3];

const crags: crag[] = [];

trArray.forEach((tableRow) => {
  if (tableRow) {
    const crag: crag = {
      aspect: '',
      rockType: '',
      long: '',
      lat: '',
      name: '',
      numStaredClimbs: '',
    };
    regexKeys.forEach((regexKey) => {
      const matchArray = [...tableRow.matchAll(regexs[regexKey])][0];
      if (matchArray) {
        crag[regexKey] = matchArray[1];
      }
    });
    if (crag.name) {
      crags.push(crag);
    }
  }
});

const cragsFiltered = [...new Set(crags)];

import { writeFile } from 'fs/promises';
await writeFile('../boulder_crags.json', JSON.stringify(cragsFiltered));
