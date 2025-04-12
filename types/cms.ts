export interface CmsCaseStudy {
    sitemap: Sitemap;
    seoTitle: string;
    seoDescription: string;
    path: string;
    webpagePreviewFile?: string;
    pageTitle: string;
    pageSubtitle: string;
    overviewVideo: VideoInfo;
    stats: CmsCaseStudyStatsItem[];
    videos: CmsCaseStudyVideosItem[];
    testimonials: CmsCaseStudyTestimonials;
    bts: CmsCaseStudyBts;
}

export interface CmsLinks {
    title: string;
    description: string;
    links: CmsLinksLinksItem[];
}

export interface CmsHome {
    sitemap: Sitemap;
    title: string;
    description: string;
    reelVideo: CmsHomeReelVideo;
    pageTitle: string;
    pageTagline: string;
    visitPortfolioFile: FileInfo;
    testimonialQuotes: CmsHomeTestimonialQuotesItem[];
    videoHighlight: CmsHomeVideoHighlight;
    aboutMe: CmsHomeAboutMe;
    freebie: CmsHomeFreebie;
    caseStudies: CmsHomeCaseStudies;
    trustedBrandTitle: string;
    trustedBrandLogos: CmsHomeTrustedBrandLogosItem[];
    howTo: CmsHomeHowTo;
    faq: CmsHomeFaq;
    adventureContentPartnership: CmsHomeAdventureContentPartnership;
}

export interface CmsServices {
    sitemap: Sitemap;
    title: string;
    description: string;
    headingFile: FileInfo;
    problemOverview: CmsServicesProblemOverview;
    solution: CmsServicesSolution;
    adventureContentPartnership: CmsServicesAdventureContentPartnership;
}

export interface CmsServiceLandingPage {
    sitemap: Sitemap;
    ogImage?: string;
    path: string;
    title: string;
    description: string;
    fileInfo: FileInfo;
    pageTitle: string;
    pageDescription: string;
    overview: CmsServiceLandingPageOverview;
    files: CmsServiceLandingPageFilesItem[];
    callsToAction: CmsServiceLandingPageCallsToActionItem[];
    socialMediaFiles: CmsServiceLandingPageSocialMediaFilesItem[];
    testimonials: CmsServiceLandingPageTestimonials;
}

export interface CmsAbout {
    sitemap: Sitemap;
    title: string;
    description: string;
    pageTitle: string;
    aboutMe: CmsAboutAboutMe;
    faq: CmsAboutFaq;
    assets: CmsAboutAssetsItem[];
    testimonials: CmsAboutTestimonials;
}

export interface CmsCustomPortfolio {
    path: string;
    title: string;
    description: string;
    heading: string;
    videos: CmsCustomPortfolioVideosItem[];
}

export interface CmsPortfolio {
    sitemap: Sitemap;
    title: string;
    description: string;
    heading: string;
    videos: CmsPortfolioVideosItem[];
}

export interface CmsProduct {
    sitemap: Sitemap;
    title: string;
    description: string;
    path: string;
    productImage: string;
    publishedDate: string;
    imageDescription: string;
    ogImage: string;
    topBackgroundImage: string;
    callToActionBackgroundImage: string;
    productName: string;
    productTagline: string;
    shortDescription: string;
    productDescription: string;
    priceDollars: number;
    originalPriceDollars: number;
    stripePriceId: string;
    sendGridTemplateId: string;
    omnisendTag: string;
    whatsInsideComponents: CmsProductWhatsInsideComponentsItem[];
    callToActionTitle: string;
    callToActionSubheading: string;
}

export interface CmsFreebie {
    productName: string;
    fileName: string;
    fileURL: string;
    publishedDate: string;
    fileInfo: FileInfo;
    shortDescription: string;
}

export interface FileInfo {
    file: string;
    thumbnailImage?: string;
    seoTitle: string;
    seoDescription: string;
    publicationDate: string;
}

export interface Sitemap {
    changefreq: string;
    include: boolean;
    lastmod: string;
}

export interface CmsProductWhatsInsideComponentsItem {
    text: string;
}

export interface VideoInfo {
    video: string;
    thumbnailImage: string;
    seoTitle: string;
    seoDescription: string;
    publicationDate: string;
}

export interface CmsPortfolioVideosItem {
    title: string;
    videoInfo?: VideoInfo;
    pagePath?: string;
}

export interface CmsCustomPortfolioVideosItem {
    title: string;
    videoInfo: VideoInfo;
}

export interface CmsAboutAboutMeFile {
    file: string;
    seoTitle: string;
    seoDescription: string;
    thumbnailImage?: string;
    publicationDate: string;
}

export interface CmsAboutAboutMe {
    title: string;
    description: string;
    file: CmsAboutAboutMeFile;
}

export interface CmsAboutFaqQuestionsItem {
    question: string;
    answer: string;
}

export interface CmsAboutFaq {
    title: string;
    questions: CmsAboutFaqQuestionsItem[];
}

export interface CmsAboutAssetsItem {
    file: string;
    thumbnailImage?: string;
    isWide: boolean;
    seoTitle: string;
    seoDescription: string;
    publicationDate: string;
}

export interface CmsAboutTestimonialsClientTestimonialsItem {
    author: string;
    text: string;
    fileInfo: FileInfo;
}

export interface CmsAboutTestimonials {
    title: string;
    clientTestimonials: CmsAboutTestimonialsClientTestimonialsItem[];
}

export interface CmsServiceLandingPageOverview {
    title: string;
    description: string;
    fileInfo: FileInfo;
}

export interface CmsServiceLandingPageFilesItem {
    file: string;
    thumbnailImage?: string;
    seoTitle: string;
    seoDescription: string;
    publicationDate: string;
}

export interface CmsServiceLandingPageCallsToActionItem {
    title: string;
    description: string;
    callToActionText: string;
    isVertical: boolean;
    fileInfo: FileInfo;
}

export interface CmsServiceLandingPageSocialMediaFilesItem {
    file: string;
    thumbnailImage?: string;
    seoTitle: string;
    seoDescription: string;
    publicationDate: string;
}

export interface CmsServiceLandingPageTestimonialsClientTestimonialsItem {
    author: string;
    text: string;
}

export interface CmsServiceLandingPageTestimonials {
    clientTestimonials: CmsServiceLandingPageTestimonialsClientTestimonialsItem[];
}

export interface CmsServicesProblemOverviewProblemItems1Item {
    description: string;
}

export interface CmsServicesProblemOverviewProblemItems2Item {
    description: string;
}

export interface CmsServicesProblemOverview {
    pageTagline: string;
    problemFile: FileInfo;
    problemOverview1: string;
    problemItems1: CmsServicesProblemOverviewProblemItems1Item[];
    problemOverview2: string;
    problemItems2: CmsServicesProblemOverviewProblemItems2Item[];
}

export interface CmsServicesSolutionNextStepsItem {
    title: string;
}

export interface CmsServicesSolution {
    title: string;
    solutionOverviewFile: FileInfo;
    description: string;
    action: string;
    actionOverview: string;
    actionCta: string;
    actionFile: FileInfo;
    nextStepsHeading: string;
    nextSteps: CmsServicesSolutionNextStepsItem[];
    nextStepsSubheading: string;
}

export interface CmsServicesAdventureContentPartnershipStepsItem {
    title: string;
    description: string;
}

export interface CmsServicesAdventureContentPartnership {
    overview: string;
    overviewFile: FileInfo;
    title: string;
    titleBackgroundImage: FileInfo;
    description: string;
    actionCta: string;
    stepsTitle: string;
    stepsBackgroundImage: FileInfo;
    stepsAccentImage: FileInfo;
    steps: CmsServicesAdventureContentPartnershipStepsItem[];
}

export interface CmsHomeReelVideo {
    video: string;
    thumbnailImage: string;
    seoTitle: string;
    seoDescription: string;
    publicationDate: string;
}

export interface CmsHomeTestimonialQuotesItem {
    quote: string;
    author: string;
}

export interface CmsHomeVideoHighlightVideosItem {
    linkPath: string;
    title: string;
    description: string;
    video: string;
    thumbnailImage: string;
    seoTitle: string;
    seoDescription: string;
    publicationDate: string;
}

export interface CmsHomeVideoHighlight {
    title: string;
    videos: CmsHomeVideoHighlightVideosItem[];
}

export interface CmsHomeAboutMeFile {
    file: string;
    seoTitle: string;
    seoDescription: string;
    thumbnailImage?: string;
    publicationDate: string;
}

export interface CmsHomeAboutMe {
    title: string;
    description: string;
    ctaText: string;
    file: CmsHomeAboutMeFile;
    stamp: FileInfo;
}

export interface CmsHomeFreebie {
    title: string;
    subheading: string;
    description: string;
    ctaText: string;
    name: string;
    fileName: string;
    fileURL: string;
    file: FileInfo;
}

export interface CmsHomeCaseStudies {
    title: string;
    description: string;
    file: FileInfo;
    pagePath?: string;
}

export interface CmsHomeTrustedBrandLogosItem {
    companyName: string;
    altText: string;
    image: string;
    width: number;
}

export interface CmsHomeHowToStepsItem {
    title: string;
    description: string;
    fileInfo: FileInfo;
}

export interface CmsHomeHowTo {
    title: string;
    seoTitle: string;
    steps: CmsHomeHowToStepsItem[];
}

export interface CmsHomeFaqQuestionsItem {
    question: string;
    answer: string;
}

export interface CmsHomeFaq {
    title: string;
    questions: CmsHomeFaqQuestionsItem[];
}

export interface CmsHomeAdventureContentPartnership {
    title: string;
    description: string;
    callToAction: string;
    fileInfo: FileInfo;
    accentFile: FileInfo;
}

export interface CmsLinksLinksItem {
    name: string;
    destination: string;
}

export interface CmsCaseStudyStatsItemAdditionalStatsItem {
    stat: string;
    statDescription: string;
}

export interface CmsCaseStudyStatsItem {
    statPeriod: string;
    stat: string;
    statClarifier: string;
    statDescription: string;
    additionalStats: CmsCaseStudyStatsItemAdditionalStatsItem[];
    videoInfo: VideoInfo;
}

export interface CmsCaseStudyVideosItem {
    videoInfo: VideoInfo;
    videoDescription: string;
}

export interface CmsCaseStudyTestimonialsClientTestimonialsItem {
    author: string;
    text: string;
}

export interface CmsCaseStudyTestimonials {
    clientTestimonials: CmsCaseStudyTestimonialsClientTestimonialsItem[];
}

export interface CmsCaseStudyBtsFilesItem {
    file: string;
    thumbnailImage?: string;
    seoTitle: string;
    seoDescription: string;
    publicationDate: string;
}

export interface CmsCaseStudyBts {
    files: CmsCaseStudyBtsFilesItem[];
}
