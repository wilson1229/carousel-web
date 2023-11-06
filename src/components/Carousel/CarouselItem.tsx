import React from 'react';
import './CarouselItem.scss';

// const a:test = 1;

// const add = (t: test) => {
// 	return t;
// }


export interface CarouselItemData {
	id: string;
	title: string;
	description: string;
	buttonText: string;
	backgroundImage: {
		id: number,
		link: string
	};
}

export interface CarouselItemProps {
	item: CarouselItemData;
}

export const CarouselItem = ({ item }: CarouselItemProps) => {
	const { title, description, buttonText, id, backgroundImage } = item;

	return (
		<div
			className='carousel-item-wrapper'
			key={id}
			style={{ backgroundImage: `url(${backgroundImage.link})` }}
		>
			<div className='item-title'>{title}</div>
			<div className='item-desc'>{description}</div>
			<div className='item-button'>{buttonText}</div>
		</div>
	);
};

