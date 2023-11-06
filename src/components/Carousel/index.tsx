import React, { useRef, useEffect, useState } from 'react';
import { CarouselItem, CarouselItemData } from './CarouselItem';

import './index.scss';

interface CarouselProps {
	dataList: Array<CarouselItemData>;
	defaultIndex?: number;
}

const step = 1120;

const Carousel = ({ dataList, defaultIndex = 0 }: CarouselProps) => {
	const box: React.RefObject<HTMLInputElement> = useRef(null);

	// const [style, setStyle] = useState(-step);

	const [currentIndex, setCurrentIndex] = useState(defaultIndex);
	const maxLength = dataList.length;

	useEffect(() => {
		if (box.current) {
			if (currentIndex >= 0 && currentIndex <= maxLength - 1) {
				const offset = -currentIndex * step;
				box.current.style.transform = `translateX(${offset}px)`;
			} else if (currentIndex < 0) {
				setCurrentIndex(maxLength - 1);
			} else {
				setCurrentIndex(0);
			}
		}
	}, [currentIndex]);
	const handleLeft = () => {
		setCurrentIndex(currentIndex - 1);
	};
	const handleRight = () => {
		setCurrentIndex(currentIndex + 1);
	};
	const handleDotIndex = (index: number) => () => {
		setCurrentIndex(index);
	};
	return (
		<div className='carousel-wrapper'>
			<div className='carousel-inner-layout'>
				<div className='carousel-inner' ref={box}>
					{dataList.map((item) => {
						return <CarouselItem item={item} />;
					})}
				</div>
			</div>
			<div className='carousel-control'>
				<div className='left' onClick={handleLeft}>
					{'<'}
				</div>
				<div className='right' onClick={handleRight}>
					{'>'}
				</div>
			</div>
			<div className='carousel-dots-wrapper'>
				{dataList.map((item, index) => {
					let dotClass = 'dot';
					if (index === currentIndex) {
						dotClass = 'dot active';
					}
					return <div className={dotClass} onClick={handleDotIndex(index)}></div>;
				})}
			</div>
		</div>
	);
};

export default Carousel;
