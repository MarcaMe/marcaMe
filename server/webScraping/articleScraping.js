const router = require('express').Router();
const request = require('request');
const cheerio = require('cheerio');
const { Article } = require('../db/models');
module.exports = router;

//url = "https://www.nytimes.com/2017/11/16/opinion/saudi-arabia-reform-islamists.html?action=click&pgtype=Homepage&clickSource=story-heading&module=opinion-c-col-left-region&region=opinion-c-col-left-region&WT.nav=opinion-c-col-left-region";
//url = "https://medium.com/personal-growth/declutter-your-life-declutter-your-mind-4c7f965d6839";
//url="https://hbr.org/2017/11/why-the-entire-c-suite-needs-to-use-the-same-metrics-for-cyber-risk";
//url = "https://www.youtube.com/watch?v=s0W76XQvrZw" 
//url="https://www.nytimes.com/2017/11/16/us/politics/republican-tax-plans-corporations.html?hp&action=click&pgtype=Homepage&clickSource=story-heading&module=b-lede-package-region&region=top-news&WT.nav=top-news";
//url = "https://www.nytimes.com/2017/11/16/opinion/sunday/confederate-statues-lee-family.html?action=click&pgtype=Homepage&clickSource=story-heading&module=opinion-c-col-right-region&region=opinion-c-col-right-region&WT.nav=opinion-c-col-right-region"
//url = "https://hbr.org/2017/11/how-to-excel-at-both-strategy-and-execution";
//url="http://www.businessinsider.com/how-tesla-designs-cars-to-look-so-good-2017-11";
//let url = "https://www.washingtonpost.com/news/worldviews/wp/2017/11/19/what-the-parasites-in-a-defectors-stomach-tell-us-about-north-korea/?utm_term=.8425ddda7d3a";
let url = "https://scotch.io/bar-talk/vuejs-and-reactjs-a-quick-comparison";

function urlCheck (url)  {
    if (url.slice(12, 19) === "nytimes"){
        const $ = cheerio.load(html);
        let data = $(this);
        let htmLtags = data.children().children();
        let contentSelector = ".story-body-supplemental"
    }

    if(url.slice(8, 11) === "hbr"){
        let htmLtags = data.children();
        let contentSelector = ".article-first-row"
    }

    if(url.slice(8, 14) === "medium"){
        let htmLtags = data.children().children();
        let contentSelector = ".section-content"
    }

    if(url.slice(12, 26) === "washingtonpost"){
        let htmLtags = data.children();
        let contentSelector = ".paywall";
    }


    if(url.slice(8, 17) === "scotch.io"){
        let htmLtags = data.children().children();
        let contentSelector = ".columns.is-desktop";
    }
    
    return [htmLtags, contentSelector]

}

router.get('/', function(req, res){

    request(url, function(error, response, html){
  


    if(!error){
        let $ = cheerio.load(html);

    let arcitle = { title : "", tags: "", image: "", description: "", url: "", content: []};

    $('title').filter(function(){
        let data = $(this);
        title = data.text()
        arcitle.title = title;
    })

    $('[property=og\\:image]').each( function() {
        let data = $(this);
        img = data.attr('content')
        arcitle.img.push(img);
    })
 // not covered all    
    $('meta[name=keywords]').filter( function() {
        let data = $(this);
        tags = data.attr('content')
        arcitle.tags = tags;
    })

    $('.columns.is-desktop').each(function () {
        let data = $(this);
        htmLtags = data.children().children();
        //console.log("!!!!!!!", htmLtags)
        for(key in htmLtags){
            if(htmLtags[key].name === "h1"){
                let obj = {}
                let tagName = "h1";
                let text = htmLtags[key].children[0].data;
                obj[tagName] = text;
                arcitle.content.push(obj);
            } 
            if(htmLtags[key].name === "h2"){
                let obj = {}
                let tagName = "h2";
                let text = htmLtags[key].children[0].data;
                 obj[tagName] = text;
                 arcitle.content.push(obj);
                
            } 

            if(htmLtags[key].name === "h3"){
                let obj = {}
                let tagName = "h3";
                let text = htmLtags[key].children[0].data;
                obj[tagName] = text;
                arcitle.content.push(obj);
            } 
            if(htmLtags[key].name === "h4"){
                let obj = {}
                let tagName = "h4";
                let text = htmLtags[key].children[0].data;
                obj[tagName] = text;
                arcitle.content.push(obj);
            }


            if(htmLtags[key].name === "p"){
                if(htmLtags[key].children[0].next && htmLtags[key].children[0].next.name === "a") {
                    let tagName = "a";
                    let link = htmLtags[key].children[0].next.attribs.href;
                    let text = htmLtags[key].children[0].next.children[0].data;
                    let obj = {};
                    obj[tagName] = text;
                    arcitle.content.push(obj);                    
                    //console.log("tagName: ", tagName, " Link: ", link, " text: ", text)
                } else{
                    let obj = {}
                    let tagName = "p";
                    let text = htmLtags[key].children[0].data;
                    obj[tagName] = text;
                    arcitle.content.push(obj);
                }
            } 
            if(htmLtags[key].name === "ul"){
                let pointer = htmLtags[key].children[0]
                 while ( pointer && pointer.name === "li"){
                    let obj = {};
                    let tagName = "li";
                    let text=  pointer.children[0].data;
                    obj[tagName] = text;
                    arcitle.content.push(obj);                    
                    pointer = pointer.next;
                 }
            }

            if(htmLtags[key].name === "blockquote"){
                let obj = {}
                let tagName = "blockquote";
                let text = htmLtags[key].children[0].data;
                obj[tagName] = text;
                arcitle.content.push(obj);
            }
     }
        
       
    })
    Article.create(article);

    res.send("ok, check database")


    } else {
        throw error;
    }

    }) ;
})




