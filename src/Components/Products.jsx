import React, { useState } from 'react'
import { MdAddCircleOutline } from 'react-icons/md'

export const Products = ({
	val,
	desc,
	setDesc,
	handleCreate,
	handleEdit,
	handleDelete,
	setText,
	text,
	title,
	url,
	setUrl,
	setTitle,
	imageList,
	handleUpdate,
}) => {
	const [show, setShow] = useState(false)
	const [cShow, setCshow] = useState(false)

	return (
		<div className='products py-10'>
			{show && (
				<div className='fixed top-0 left-0 h-[100vh] w-[100vw] flex justify-around items-center '>
					<div className='h-[250px] w-[300px] bg-gray-400 text-center pt-[55px] '>
						<input
							type='text'
							placeholder='URL'
							value={url}
							className='border px-2 my-1'
							onChange={value => setUrl(value.target.value)}
						/>
						<input
							type='text'
							placeholder='Title'
							className='border px-2 my-1'
							value={title}
							onChange={value => setTitle(value.target.value)}
						/>
						<input
							type='text'
							value={text}
							placeholder='Paragraph'
							className='border px-2 my-1'
							onChange={value => setText(value.target.value)}
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
							value={url}
							onChange={value => setUrl(value.target.value)}
						/>{' '}
						<input
							type='text'
							placeholder='Tittle'
							className='border px-2 my-1'
							value={title}
							onChange={value => setTitle(value.target.value)}
						/>{' '}
						<input
							type='text'
							placeholder='Paragraph'
							className='border px-2 my-1'
							value={text}
							onChange={value => setText(value.target.value)}
						/>{' '}
						<br />
						<button onClick={handleCreate} className='border px-2'>
							Create
						</button>
						<button className='border px-6' onClick={() => setCshow(false)}>
							Close
						</button>
					</div>
				</div>
			)}
			<div className='max-w-[1100px] m-auto'>
				<div className='products-text text-center'>
					<h1 className='text-[25px] py-4'>Products</h1>
				</div>
				<div className='products-menu flex justify-around  text-[12px] py-6 text-center'>
					<div className='products-box flex justify-center flex-wrap lg:flex-nowrap'>
						{val.map(value => {
							return (
								<div key={value.id}>
									{/* {imageList.map(url => {
											return <img src={url} />
										})} */}
									<img src={value.url} alt='' />
									<h2>{value.title}</h2>
									<p>{value.text}</p>
									<button
										className='border px-4 py-1 m-2'
										onDoubleClick={() => setShow(true)}
										onClick={() =>
											handleEdit(value.id, value.url, value.title, value.text)
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
				<div className='products-box flex justify-center'>
					<MdAddCircleOutline
						className='text-[50px] mx-[150px] my-[100px]'
						onClick={() => setCshow(true)}
					/>
				</div>
			</div>
		</div>
	)
}
