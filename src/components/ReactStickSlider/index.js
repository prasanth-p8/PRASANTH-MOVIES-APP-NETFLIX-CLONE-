import Slider from 'react-slick'
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
}

const ReactStickSlider = props => {
  const {stickData} = props

  return (
    <Slider {...settings}>
      {stickData.map(eachData => {
        const {id, posterPath, title} = eachData
        return (
          <div className="slick-item" key={id}>
            <img className="logo-image" src={posterPath} alt={title} />
          </div>
        )
      })}
    </Slider>
  )
}

export default ReactStickSlider
