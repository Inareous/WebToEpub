"use strict";

parserFactory.register("inoveltranslation.com", () => new InoveltranslationParser());

class InoveltranslationParser extends Parser{
    constructor() {
        super();
    }

    async getChapterUrls(dom) {
        let chapters = []
        let chapterRegex = /\\"href\\":\\"(.+?)\\".*?\\"children\\":\\"(.+?)\\"/gm
        let text = [...dom.scripts].filter(x => x.text.includes("ChapterList"))[0].text

        let match;
        while ((match = chapterRegex.exec(text)) !== null) {
            chapters.push({
                sourceUrl: match[1],
                title: match[2],
            })
        }

        return chapters.reverse()
    }

    findContent(dom) {
        return dom.querySelector("section[data-sentry-component='RichText']");
    }

    findChapterTitle(dom) {
        return dom.querySelector("h1");
    }

    extractTitleImpl(dom) {
        return dom.querySelector("h1");
    }

    findCoverImageUrl(dom) {
        return util.getFirstImgSrc(dom, "article");
    }

    getInformationEpubItemChildNodes(dom) {
        return [...dom.querySelectorAll("section[class^='styles_details_container'] dl:last-child")];
    }
}
