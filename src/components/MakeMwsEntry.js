import React from 'react';

function extractFormula(hit) {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(hit.xhtml, "text/html");
    const math_tags = htmlDoc.getElementsByTagName('m:math');
    const local_id = hit.math_ids[0].url;
    let i = 0;
    while(i < math_tags.length){
        if(math_tags[i].getAttribute('local_id') === local_id){
            break;
        }
        i++;
    }

    const url = math_tags[i].getAttribute('url');
    return ( <span key={local_id}>
                <div dangerouslySetInnerHTML={{__html: math_tags[i].outerHTML }}/>
                <a href={url} target="_blank" rel="noopener noreferrer"
                    onClick={(ev) => {ev.stopPropagation();
                    /*keeps it active even if clicked the link*/}}>
                    Go to nLab
                </a>
            </span>
    );
}
export function MakeEntries(hits, allEntries){

    // let newContent = { ...allEntries };
    for(let i = 0; i < hits.length; i++ ){
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(hits[i].xhtml, "text/html");
        const id_tags = htmlDoc.getElementsByTagName('id');
        if(!id_tags || !id_tags.length){
            // ignore all hits without an id tag
            console.log('hit without a id');
            continue;
        }
        const key = id_tags[0].innerHTML;
        if(!allEntries[key]){
            const metadata = htmlDoc.getElementsByTagName('metadata')[0];
            const title = metadata.getElementsByTagName('title')[0].innerHTML;
            allEntries[key] = {
                key: key,
                title: title,
                active: false,
                formulas: []
            };
        }
        // this prevents that the same formula appears two times in the list
        // at this point we don not use the xpath thing so there is no point in
        // showing the same formula twice
        const newMath = extractFormula(hits[i]);
        allEntries[key]['formulas'].every((e) => e.key !== newMath.key) 
            && allEntries[key]['formulas'].push(newMath);
    }
}
