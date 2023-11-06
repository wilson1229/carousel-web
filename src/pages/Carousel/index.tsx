import {useState, useEffect} from 'react';
import Carousel from '../../components/Carousel';

import { getCarouselList } from '../../service';
import './index.scss';


function CarouselPage() {
  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    getCarouselList(window.defaultCarouselId).then((res) => {
      setDataList(res.data);
    });
  }, []);
	return (
		<div className='App'>
			<div className='layout'>
				<Carousel dataList={dataList} />
			</div>
		</div>
	);
}

export default CarouselPage;
