import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { useEffect, useState } from 'react'

export const Extra = () => {
	const value2 = collection(db, 'Products2')
	const [valu, setValu] = useState([])

	useEffect(() => {
		onSnapshot(
			value2,
			snapShot => {
				let dat = []
				snapShot.docs.forEach(doc => {
					dat.push({ ...doc.data(), id: doc.id })
				})
				setValu(dat)
			},
			error => {
				console.log(error)
			}
		)
	}, [])
	return (
		<div className='products-menu flex flex-col lg:flex-row'>
			{valu.map(value => {
				return (
					<div
						key={value.id}
						className='products-box max-w-[400px] m-auto text-center'
					>
						<img src={value.img} alt='' className='m-auto' />
						<h2 className='text-[18px]'>{value.head}</h2>
						<p className='text-[12px] text-gray-500 py-[5px] m-auto max-w-[350px]'>
							{value.p}
						</p>
					</div>
				)
			})}
		</div>
	)
}
