import {
	collection,
	doc,
	onSnapshot,
	addDoc,
	deleteDoc,
	updateDoc,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { MdAddCircleOutline } from 'react-icons/md'
import { db } from '../firebase'

export const Products2 = () => {
	const [head, setHead] = useState('')
	const [p, setP] = useState('')
	const [img, setImg] = useState('')
	const [id, setId] = useState('')
	const [valu, setValu] = useState([])
	const value2 = collection(db, 'Products2')
	const [show, setShow] = useState(false)
	const [cShow, setCshow] = useState(false)

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

	const Create = async () => {
		await addDoc(value2, { img: img, head: head, p: p })
		setImg('')
		setHead('')
		setP('')
	}

	const handleDelete = async id => {
		const deleteUser = doc(db, 'Products2', id)
		await deleteDoc(deleteUser)
	}

	const handleEdit = async (id, img, head, p) => {
		setImg(img)
		setHead(head)
		setP(p)
		setId(id)
	}

	const handleUpdate = async () => {
		const updateData = doc(db, 'Products2', id)
		await updateDoc(updateData, { img: img, head: head, p: p })
		setImg('')
		setHead('')
		setP('')
	}

	return (
		<div>
			<div className='products-txt'>
				{show && (
					<div className='fixed top-0 left-0 h-[100vh] w-[100vw] flex justify-around items-center '>
						<div className='h-[250px] w-[300px] bg-gray-400 text-center pt-[55px] '>
							<input
								type='text'
								placeholder='URL'
								className='border px-2 my-1'
								value={img}
								onChange={value => setImg(value.target.value)}
							/>
							<input
								type='text'
								placeholder='Title'
								className='border px-2 my-1'
								value={head}
								onChange={value => setHead(value.target.value)}
							/>
							<input
								type='text'
								placeholder='Paragraph'
								className='border px-2 my-1'
								value={p}
								onChange={value => setP(value.target.value)}
							/>{' '}
							<br />
							<button className='border px-6' onClick={handleUpdate}>
								Edit
							</button>
							<button className='border px-6' onClick={() => setShow(false)}>
								Close
							</button>
						</div>
					</div>
				)}
				{cShow && (
					<div className='fixed top-0 left-0 h-[100vh] w-[100vw] flex justify-around items-center '>
						<div className='h-[250px] w-[300px] bg-gray-400 text-center pt-[55px] '>
							<input
								type='text'
								placeholder='URL'
								className='border px-2 my-1'
								value={img}
								onChange={value => setImg(value.target.value)}
							/>{' '}
							<input
								type='text'
								placeholder='head'
								className='border px-2 my-1'
								value={head}
								onChange={value => setHead(value.target.value)}
							/>{' '}
							<input
								type='text'
								placeholder='Paragraph'
								className='border px-2 my-1'
								value={p}
								onChange={value => setP(value.target.value)}
							/>{' '}
							<br />
							<button onClick={Create} className='border px-2'>
								Create
							</button>
							<button className='border px-6' onClick={() => setCshow(false)}>
								Close
							</button>
						</div>
					</div>
				)}
				<div className='products-menu flex justify-around  text-[12px] py-6 text-center'>
					<div className='products-box flex justify-center flex-wrap lg:flex-nowrap'>
						{valu.map(value => {
							return (
								<div key={value.id}>
									<img src={value.img} className='m-auto' alt='' />
									<h1 className='text-[14px]'>{value.head}</h1>
									<p className='m-auto text-gray-500 py-[5px] max-w-[350px]'>
										{value.p}
									</p>
									<button
										className='border px-4 py-1 m-2'
										onDoubleClick={() => setShow(true)}
										onClick={() =>
											handleEdit(value.id, value.img, value.head, value.p)
										}
									>
										Edit
									</button>
									<button
										className='border px-4 py-1'
										onClick={() => handleDelete(value.id)}
									>
										Delete
									</button>
								</div>
							)
						})}
					</div>
				</div>
			</div>
			<div className='products-box flex justify-center'>
				<MdAddCircleOutline
					className='text-[50px] mx-[150px] my-[100px]'
					onClick={() => setCshow(true)}
				/>
			</div>
		</div>
	)
}
