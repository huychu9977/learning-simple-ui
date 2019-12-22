if (document.URL.includes("/course/")) {
    var eleBanner = document.getElementsByClassName("course-banner")[0];
    var elePreview = document.getElementsByClassName("course-preview")[0];
    var eleFooter = document.getElementsByTagName('footer')[0];
    var eleIntroduction = document.getElementsByClassName('introduction-asset')[0];
    var eleShow = document.getElementsByClassName("is-show")[0];
    var eleRecommend = document.getElementsByClassName("course-recommend")[0];
    var eleHeader = document.getElementsByClassName("header-container")[0];

    window.onscroll = function() {
        var eleWindow = document.documentElement.scrollTop;
        let startP = eleBanner.offsetTop + eleBanner.offsetHeight - 40;
        if(eleWindow >= startP) {
            elePreview.classList.add('slideDown');
            eleShow.style.display = 'none';
            let stopP = eleFooter.offsetTop - elePreview.offsetHeight - eleIntroduction.offsetHeight - eleRecommend.offsetHeight - 40;

            if(stopP <= eleWindow) {
                elePreview.classList.remove('slideDown');
                elePreview.style.position = 'absolute';
                elePreview.style.top = stopP - 10 - eleBanner.offsetTop + 'px';
                elePreview.style.zIndex  = '0';
            } else if(eleWindow >= startP) {
                elePreview.classList.add('slideDown');
                elePreview.style.position = 'fixed';
                elePreview.style.top = this.eleHeader.offsetHeight - 10 + 'px';
                elePreview.style.zIndex  = '1';
            }
        } else {
            elePreview.classList.remove('slideDown');
            elePreview.style.position = 'absolute';
            elePreview.style.zIndex  = '0';
            eleShow.style.display = 'block';
        }
    }
}