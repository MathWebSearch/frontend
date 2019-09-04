import * as React from 'react';
import {extractTitle} from './extractFunctions';
import FormulaHit from '../components/FormulaHit';

export function MakeEntries(hits, allEntries, qvars, aggregate = 'segment') {
//   let newEntries = {...allEntries};
//   for (let i = 0; i < hits.length; i++) {
//     const local_id = hits[i].math_ids[0].url;
//     let formulas;
//     let formulaHitKey;
//     const key =
//       '' === aggregate
//         ? hits[i].source.segment + local_id
//         : hits[i].source.segment;
//     const title = extractTitle(hits[i].source.metadata) || key;
//     if (!newEntries[key]) {
//       newEntries[key] = {
//         key: key,
//         title: title,
//         active: false,
//         formulas: [],
//       };
//     }

//     formulas = newEntries[key].formulas;
//     formulaHitKey = formulas.length;
//     formulas.push(() => (
//       <FormulaHit
//         key={formulaHitKey}
//         hit={hits[i].math_ids[0]}
//         text={hits[i].source.text}
//         qvars={qvars}
//       />
//     ));
//   }
//   return newEntries;
}
