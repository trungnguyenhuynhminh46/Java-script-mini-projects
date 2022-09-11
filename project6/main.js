const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const carousel_images = $$('.carousel__image');
const carousel_nav_items = $$('.carousel-nav__item');
function toPrevImage(step){
    let images_num = Array.from(carousel_images).length;
    // Loại bỏ toàn bộ active
    const active_image = $('.carousel__image.active');
    const active_nav_item = $('.carousel-nav__item.active');
    const active_index = Number.parseInt(active_image.dataset.index);

    active_image.classList.remove('active');
    active_nav_item.classList.remove('active');
    
    // Active ảnh trước đó
    var prev_active_index = (active_index - step) >= 0 ? (active_index - step) : images_num - 1;
    Array.from(carousel_images).forEach(
        (image, index) => {
            if(index==prev_active_index){
                image.classList.add('active');
            }
        }
    );
    Array.from(carousel_nav_items).forEach(
        (item, index) => {
            if(index==prev_active_index){
                item.classList.add('active');
            }
        }
    );
}
function toNextImage(step){
    let images_num = Array.from(carousel_images).length;
    // Loại bỏ toàn bộ active
    const active_image = $('.carousel__image.active');
    const active_nav_item = $('.carousel-nav__item.active');
    const active_index = Number.parseInt(active_image.dataset.index);

    active_image.classList.remove('active');
    active_nav_item.classList.remove('active');
    
    // Active ảnh tiếp theo
    var next_active_index = (active_index + step) <= images_num - 1 ? (active_index + step) : 0;
    Array.from(carousel_images).forEach(
        (image, index) => {
            if(index==next_active_index){
                image.classList.add('active');
            }
        }
    );
    Array.from(carousel_nav_items).forEach(
        (item, index) => {
            if(index==next_active_index){
                item.classList.add('active');
            }
        }
    );
}
function activeImage(i){
    // Remove Active
    let images_num = Array.from(carousel_images).length;
    // Loại bỏ toàn bộ active
    const active_image = $('.carousel__image.active');
    const active_nav_item = $('.carousel-nav__item.active');
    const active_index = Number.parseInt(active_image.dataset.index);

    active_image.classList.remove('active');
    active_nav_item.classList.remove('active');
    // Active
    Array.from(carousel_images).forEach(
        (image, index) => {
            if(index==i){
                image.classList.add('active');
            }
        }
    );
    Array.from(carousel_nav_items).forEach(
        (item, index) => {
            if(index==i){
                item.classList.add('active');
            }
        }
    );
}