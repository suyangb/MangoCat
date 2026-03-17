// 导航栏折叠功能
export function initNavFold() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动且超过100px，收起导航栏
            header?.classList.add('nav-hidden');
        } else {
            // 向上滚动或在顶部，显示导航栏
            header?.classList.remove('nav-hidden');
        }
        
        lastScrollTop = scrollTop;
    }

    // 初始化
    window.addEventListener('scroll', handleScroll);

    // 清理函数
    function cleanup() {
        window.removeEventListener('scroll', handleScroll);
    }

    return { cleanup };
}