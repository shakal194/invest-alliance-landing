const profitSwiper = new Swiper('.profit-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
        delay: 1500,
    },
    loop: true,
    pagination: {
        el: '.swiper-pagination-custom',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        }
    }
}); 