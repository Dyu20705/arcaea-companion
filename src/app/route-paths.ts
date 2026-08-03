export const routes = {
    home: '/',
    explore: '/explore',
    musicPlay: '/musicPlay',
    storyMode: '/storyMode',
    worldMode: '/worldMode',
    courseMode: '/courseMode',
    achievements: '/achievements',
    networkSystem: '/networkSystem', //intro -> dev in the future
    elements: '/elements',
    about: '/about',
    status: '/status',
    
    //musicPlay
    categoryDetail: (entityId: string) =>
        `/categories/${encodeURIComponent(entityId)}`,

    packDetail: (entityId: string) =>
        `/packs/${encodeURIComponent(entityId)}`,

    songDetail: (entityId: string) =>
        `/songs/${encodeURIComponent(entityId)}`,

    //storyMode
    actDetail: (entityId: string) =>
        `/acts/${encodeURIComponent(entityId)}`,

    partDetail: (entityId: string) =>
        `/parts/${encodeURIComponent(entityId)}`,
    
    //worldMode
    chapterDetail: (entityId: string) =>
        `/chapters/${encodeURIComponent(entityId)}`,
    
    //elements
    partnerDetail: (entityId: string) =>
        `/partners/${encodeURIComponent(entityId)}`,

    //...other routes can be added here


} as const;