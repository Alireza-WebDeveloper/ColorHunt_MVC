import icon from '../../../../node_modules/bootstrap-icons/bootstrap-icons.svg';
import SinglePalettePreView from "./SinglePalettePreView";
class CarouselPaletteView extends SinglePalettePreView{
    _parElement = document.querySelector('.carousel_Main');
    _generateMarkUp(){
      return `<section class="row custom_Carousel  p-3 rounded-3 gap-3 text-center">
      ${this._generateMarkUpCarousel()}
      </section>
      <section class="row">
        <section class="col custom_Carousel_Arrow d-flex justify-content-around">
          <a class="btn" id="custom_Carousel_Prev">
            <svg class="svg--btnCarouselArrow" data-tab="new">
              <use href="${icon}#arrow-left-circle"></use>
            </svg>
          </a>
          <a class="btn" id="custom_Carousel_Next">
            <svg class="svg--btnCarouselArrow" data-tab="new">
              <use href="${icon}#arrow-right-circle"></use>
            </svg>
          </a>
        </section>
      </section>`
    }
    _generateMarkUpCarousel(){
        return this._data.reverse().map((ObjectData)=>{
            return `<section class="col p-2 custom_Carousel__Item">
            <article class="palette">
            <a class="recipe-Link" href="/palettes/${ObjectData.id}" data-code="${ObjectData.id}">
              <div class="recipe-Place c-1" data-index="1" style='background-color:${ObjectData.color1}'>
              </div>
              <div class="recipe-Place c-2" data-index="2" style='background-color:${ObjectData.color2}'>
              </div>
              <div class="recipe-Place c-3" data-index="3" style='background-color:${ObjectData.color3}'>
              </div>
              <div class="recipe-Place c-4" data-index="4" style='background-color:${ObjectData.color4}'>
              </div>
              <div class="palette--Details">
                <svg class="svg--btnDetails" data-tab="new">
                  <use href="${icon}#skip-end-circle-fill"></use>
                </svg>
              </div>
              </a>
              </article>
          </section>`
        }).join('');
    }
    _slickCarousel(){
        $(this._parElement.querySelector('.custom_Carousel')).slick({
            arrows:true,
            autoplay: true,
            autoplaySpeed: 2000,
            slidesToShow:5,
            slidesToScroll:3,
            speed:800,
            cssEase: 'linear',
            pauseOnHover:true,
            prevArrow:$(this._parElement.querySelector('#custom_Carousel_Prev')),
            nextArrow:$(this._parElement.querySelector('#custom_Carousel_Next')),
            responsive: [
              {
                breakpoint: 1280,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                }
              },
              {
                breakpoint: 780,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2
                }
              },
              {
                breakpoint: 580,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
          });
    }
}

export default new CarouselPaletteView();