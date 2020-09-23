"use strict";var __awaiter=this&&this.__awaiter||function(a,b,c,d){return new(c||(c=Promise))(function(e,f){function g(a){try{i(d.next(a))}catch(a){f(a)}}function h(a){try{i(d["throw"](a))}catch(a){f(a)}}function i(a){a.done?e(a.value):new c(function(b){b(a.value)}).then(g,h)}i((d=d.apply(a,b||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0});const serve_1=require("../serve"),DataLoader=require("dataloader");function runScrapers(){return __awaiter(this,void 0,void 0,function*(){const a=new DataLoader(()=>__awaiter(this,void 0,void 0,function*(){return[""]})),b=yield serve_1.db.manyOrNone(`
        SELECT calc.uuid, co.scraper_uuid, 
            calc.metadata->>'termsPageURL' AS url FROM calculators calc
        LEFT JOIN scraper_connections co ON co.calculator_uuid = calc.uuid
        WHERE
            (
                calc.last_scrape IS NULL OR
                (now() - calc.last_scrape) > interval '12 hours'
            ) AND
            calc.metadata->>'scrapeTerms' = 'true'
        ORDER BY last_scrape ASC
        LIMIT 64;
    `);for(const a of b);})}exports.runScrapers=runScrapers;function runSingleScraper(){return __awaiter(this,void 0,void 0,function*(){})}