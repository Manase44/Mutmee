import { Link } from 'react-router-dom';
import { ImNewspaper } from "react-icons/im";
import './News.css'
import { useState } from 'react';
import { MdOutlineClose } from "react-icons/md";
import image from '../../assets/post.jpg'
import ViewCoverImageModal from './ViewCoverImageModal';



const News = () => {
  const [reading, setReading] = useState(true);
  const [showCoverImage, setShowCoverImage] = useState(false);

  return (
    <div className='news-section-container'>
      <div className="news-headline-section">
        <h3>trending news & aricles</h3>
        <div className="news-headline-container">
          <div className="news-headline-each" onClick={() => setReading(true)}>
            <h4>see how theft has thrived in kiharu</h4>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel?</p>
            <div className="news-author-published-details">
              <Link className="news-author-profile">
                <div className="news-author-profile-image">
                  <img src={image} alt="suggested profile" />
                </div>
                <div className="news-author-details">
                  <p>fikopersempre</p>
                  <span>student</span>
                </div>
              </Link>
              <span>10m ago</span>
            </div>
          </div>
        </div>
      </div>
      <ViewCoverImageModal
        open={showCoverImage}
        close={() => setShowCoverImage(false)}
        image={image}
      />
      <div className="news-content-display-section">
        {!reading ? <ImNewspaper /> :
          <div className='news-reading-display'>
            <div className="news-reading-display-header"><span>reading mode</span><MdOutlineClose onClick={() => setReading(false)}/></div>
            <div className='news-reading-display-top-container'>
              <div className="news-reading-display-heading">
                <h1>see how theft has thrived in kiharu</h1>
                <p>By <Link>fikopesempre</Link></p>
              </div>
              <div className="news-reading-display-image" onClick={() => setShowCoverImage(true)}>
                <picture>
                  <img src={image} width={100} alt="news banner" />
                  <caption>hello</caption>
                </picture>
              </div>
            </div>
            <div className="news-reading-display-content">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis qui saepe a hic sapiente dolores corrupti dignissimos, voluptatum nisi rem maiores nihil, quasi, sed error! Explicabo temporibus harum sunt veritatis natus rerum cupiditate odit asperiores, repellendus, tempore, necessitatibus hic reprehenderit obcaecati dolore non quasi alias blanditiis laborum totam aliquam ipsa nobis soluta quos. Non, sed dolore. Enim possimus repellat neque assumenda ullam dicta maxime, et labore laboriosam dolor fugit incidunt porro! Hic suscipit illo veritatis nihil exercitationem? Esse aliquid repellendus inventore non. Nobis, quaerat debitis iste at voluptates et? Pariatur reiciendis placeat fuga nulla natus in maiores ipsam explicabo nobis est porro voluptatum, sit sequi saepe aperiam repellendus officia eum illo, animi incidunt quam magnam laborum aliquam? Temporibus facilis aliquid blanditiis iusto quam sapiente repudiandae perferendis distinctio pariatur accusamus ullam porro laborum, eaque unde dolorum esse. Placeat maxime tempore asperiores minima velit eaque aperiam, vero laborum voluptate dolorem dolor aut possimus. Rem, amet dolor. Totam, pariatur eum! Quas a vero exercitationem porro eum obcaecati necessitatibus, deleniti quam voluptas aut, suscipit, quibusdam culpa tenetur at magni modi natus fugiat accusamus nisi dolore. Culpa, doloremque veritatis numquam, quod voluptatum quas dolor harum enim tempore dolore non! Quo mollitia consectetur ipsam similique unde optio perferendis magnam aut tempora cupiditate? Possimus esse impedit nam ad expedita doloribus corrupti quo ab, sunt distinctio laboriosam amet mollitia, accusantium, quam soluta facilis? Consectetur aut est ipsam aliquam ad ex, dolorem, sequi nobis nesciunt eveniet sunt saepe quam accusamus labore, vel impedit repudiandae? Minus repudiandae similique consectetur doloremque!

              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, nihil assumenda quo repellat, labore mollitia dolores eveniet tempora saepe temporibus dicta quod laboriosam atque maxime ducimus sint, necessitatibus vitae a ab cum rem magni vel quidem? Impedit deserunt quas porro ipsum exercitationem ad beatae aspernatur? Libero reiciendis impedit vitae ut illum excepturi itaque iure incidunt velit sunt nemo consequatur repellat repellendus sequi eos, sint eum obcaecati exercitationem tempora aliquam? Commodi, mollitia libero inventore asperiores tenetur nihil illo unde blanditiis expedita dignissimos sequi ab, nostrum architecto voluptates dolores explicabo accusamus voluptas minus, fugit saepe numquam in. Cupiditate expedita numquam quo omnis?
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default News
